defmodule Schemas do
  defmacro __using__(schema_path) do
    quote location: :keep, bind_quoted: [schema_path: schema_path] do
      @external_resource schema_path
      @after_compile Schemas

      @schema schema_path
              |> File.read!()
              |> YamlElixir.read_from_string!()

      xema =
        @schema
        |> Map.take(["definitions"])
        |> Schemas.new_xema()

      @xema xema

      @channels (for {topic, topic_def} <- @schema["channels"], into: %{} do
                   messages = topic_def["messages"]

                   messages =
                     for {event, message} <- messages, into: %{} do
                       payload =
                         Schemas.new_xema(message["payload"], remotes: false)
                         |> Schemas.resolve_refs(xema.schema)

                       replies =
                         for {status, reply} <- message["replies"], into: %{} do
                           reply =
                             Schemas.new_xema(reply, remotes: false)
                             |> Schemas.resolve_refs(xema.schema)

                           {status, reply}
                         end

                       {event, %{"payload" => payload, "replies" => replies}}
                     end

                   notifications =
                     for {event, notification} <- topic_def["nofitications"] || %{}, into: %{} do
                       notification =
                         Schemas.new_xema(notification, remotes: false)
                         |> Schemas.resolve_refs(xema.schema)

                       {event, notification}
                     end

                   {topic, %{"messages" => messages, "notifications" => notifications}}
                 end)

      def schema(), do: @xema

      def channels(), do: @channels
    end
  end

  def new_xema(json, opts \\ []) do
    opts = Keyword.merge([draft: "draft7"], opts)
    Xema.from_json_schema(json, opts)
  end

  def resolve_refs(schema, master) do
    do_resolve_refs(schema.schema, master)
  end

  defp do_resolve_refs(%{ref: %Xema.Ref{} = ref}, master) do
    Xema.Schema.fetch!(master, ref.pointer)
  end

  defp do_resolve_refs(%Xema.Schema{} = schema, master) do
    struct(
      Xema.Schema,
      schema
      |> Map.from_struct()
      |> Enum.map(fn {key, value} ->
        {key, do_resolve_refs(value, master)}
      end)
    )
  end

  defp do_resolve_refs(list, master) when is_list(list) do
    Enum.map(list, &do_resolve_refs(&1, master))
  end

  defp do_resolve_refs(value, _master), do: value

  defmacro __after_compile__(env, _bytecode) do
    for {name, schema} <- env.module.schema().schema.definitions do
      schema = Macro.escape(schema)

      body =
        quote location: :keep, generated: true, bind_quoted: [schema: schema] do
          @schema schema

          def schema(), do: @schema

          @spec cast(any) :: {:ok, any} | {:error, Xema.CastError.t()}
          def cast(attrs) do
            Xema.cast(@schema, attrs)
          end
        end

      Module.create(
        Module.concat([env.module, to_segment(name)]),
        body,
        __ENV__
      )
    end

    :ok
  end

  defp to_segment(segment) do
    segment |> to_string() |> Macro.camelize()
  end
end
