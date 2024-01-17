defmodule ChannelsWeb.TsTypes.Generator do
  alias ChannelsWeb.TsTypes.Formatter
  alias Inspect.Algebra

  def generate(schema, output_path) do
    content = to_iodata(schema)

    File.mkdir_p(Path.dirname(output_path))
    File.write!(output_path, content)
  end

  def to_iodata(schema) do
    prelude = ~S"""
    /**
     * This file was automatically generated.
     * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
     * and recompile the project to regenerate this file.
     */

    import type * as Phoenix from "phoenix";
    import {Socket as PhoenixSocket} from "phoenix";

    export type UUID = string;
    """

    prelude = String.trim(prelude)

    definitions = generate_definitions(schema)

    connect = generate_connect(schema)

    channels = generate_channels(schema)

    function_types = """
    // Functions

    export type Push<Replies> = Omit<Phoenix.Push, "receive"> & {
      receive: <Reply extends Replies, Status extends keyof Reply>(
        status: Status,
        callback: (payload: Reply[Status]) => void
      ) => Push<Replies>;
    };

    export type Pusher<T extends Channels[keyof Channels]["messages"]> = <
      Message extends keyof T,
      Payload = T[Message]["payload" extends keyof T[Message] ? "payload" : never]
    >(
      event: Message,
      ...payload: undefined extends Payload ? [] : [Payload]
    ) => Push<T[Message]["replies" extends keyof T[Message] ? "replies" : never]>;

    export type Subscriber<T extends Channels[keyof Channels]["subscriptions"]> = <
      Subscription extends keyof T
    >(
      event: Subscription,
      handler: (payload: Pick<T, Subscription>[Subscription]) => void
    ) => () => void;

    export type UnSubscriber<T extends Channels[keyof Channels]["subscriptions"], Event = keyof T> = (
      event: Event,
      ref?: number
    ) => void;

    export type Channel<Topic extends keyof Channels> = Omit<
      Phoenix.Channel,
      "push" | "on" | "off" | "join"
    > & {
      push: Pusher<Channels[Topic]["messages"]>;
      on: Subscriber<Channels[Topic]["subscriptions"]>;
      off: UnSubscriber<Channels[Topic]["subscriptions"]>;
      join: (timeout?: number) => Push<Channels[Topic]["join"]["replies"]>;
    };

    type ChanParams<Topic extends keyof Channels> = undefined extends Channels[Topic]["join"]["payload"]
      ? []
      : [Channels[Topic]["join"]["payload"]];

    export type ChannelConnect = <Topic extends keyof Channels>(
      topic: Topic,
      ...connParams: ChanParams<Topic>
    ) => Channel<Topic>;

    type Expand<T> = {} & { [P in keyof T]: T[P] };

    type ConnectionParams = Expand<
      Omit<Partial<Phoenix.SocketConnectOption>, "params"> & Pick<Connect, "params">
    >;

    export class Socket extends PhoenixSocket {
      constructor(endPoint: string, opts: ConnectionParams) {
        super(endPoint, opts);
      }
      // @ts-ignore
      channel<Topic extends keyof Channels>(
        topic: Topic,
        ...connParams: ChanParams<Topic>
      ): Channel<Topic> {
        return super.channel(topic, ...(connParams as [])) as unknown as Channel<Topic>;
      }
    }
    """

    types = [prelude, definitions, connect, channels, function_types]

    Formatter.to_iodata(types, 80)
  end

  defp generate_definitions(schema) do
    definitions =
      for {name, definition} <- schema["definitions"] do
        def = format_type(definition, schema)

        def =
          Algebra.nest(
            Formatter.with_next_break_fits(
              next_break_fits?(definition),
              def,
              fn def ->
                Algebra.glue(
                  "export type #{name} =",
                  def
                )
                |> Algebra.concat(";")
              end
            ),
            2,
            :break
          )

        description = definition["description"]

        if description do
          Algebra.line(Formatter.comment(description), def)
        else
          def
        end
      end

    definitions =
      Algebra.glue(
        "declare namespace Definitions",
        Formatter.block(definitions)
      )

    Algebra.concat(["// Definitions", "\n\n", definitions])
  end

  def generate_connect(schema) do
    connect = schema["connect"] || %{"params" => %{}}

    connect =
      for {name, type} <- connect do
        {escape_identifier(name), format_type(type, schema)}
      end
      |> Formatter.object()

    connect = Algebra.flex_glue("export type Connect =", connect)

    Algebra.concat("// Connect\n\n", connect)
  end

  @spec generate_channels(nil | maybe_improper_list | map) ::
          {:doc_cons, :doc_line | :doc_nil | binary | tuple,
           :doc_line | :doc_nil | binary | tuple}
  def generate_channels(schema) do
    channels =
      for {topic, channel} <- schema["channels"] do
        topic_template = String.replace(topic, ~r/{(\w+)}/, "${string}")

        topic =
          if topic == topic_template,
            do: escape_identifier(topic),
            else: "[topic: `#{topic_template}`]"

        {topic, format_channel(channel, schema)}
      end

    channels_type = Algebra.flex_glue("export type Channels =", Formatter.object(channels))

    Algebra.concat("// Channels\n", channels_type)
  end

  defp format_channel(channel, schema) do
    messages = channel["messages"] || %{}
    subscriptions = channel["subscriptions"] || %{}
    join = channel["join"] || %{}

    messages =
      for {name, type} <- messages do
        {escape_identifier(name), format_message(type, schema)}
      end
      |> Formatter.object()

    subscriptions =
      for {name, type} <- subscriptions do
        {escape_identifier(name), format_type(type, schema)}
      end
      |> Formatter.object()

    join = format_message(join, schema)

    Formatter.object([{"messages", messages}, {"subscriptions", subscriptions}, {"join", join}])
  end

  defp format_message(message, schema) do
    payload = format_type(message["payload"] || :undefined, schema)
    replies = Map.put_new(message["replies"] || %{}, "timeout", :undefined)

    replies =
      for {status, reply} <- replies do
        {escape_identifier(status), format_type(reply, schema)}
      end
      |> Formatter.object()

    Formatter.object([{"payload", payload}, {"replies", replies}])
  end

  defp format_type(definition, schema)

  defp format_type(%{"$ref" => ref}, schema) do
    {name, _def} = resolve_reference(ref, schema)
    Algebra.concat("Definitions.", name)
  end

  defp format_type(%{"enum" => enums}, schema) do
    enums
    |> Enum.map(fn type ->
      if is_map(type) do
        format_type(type, schema)
      else
        format_literal(type)
      end
    end)
    |> Formatter.union()
  end

  defp format_type(%{"const" => type}, schema) do
    if is_map(type) do
      format_type(type, schema)
    else
      format_literal(type)
    end
  end

  defp format_type(%{"allOf" => _} = definition, schema) do
    {all_of, definition} = Map.pop(definition, "allOf")
    all_of = Enum.map(all_of, &format_type(&1, schema))

    items =
      if definition["type"] || definition["properties"] do
        all_of ++ [format_type(definition, schema)]
      else
        all_of
      end

    Formatter.intersection(items)
  end

  defp format_type(%{"anyOf" => _} = definition, schema) do
    {any_of, definition} = Map.pop(definition, "anyOf")
    any_of = Enum.map(any_of, &format_type(&1, schema))

    items =
      if definition["type"] || definition["properties"] do
        any_of ++ [format_type(definition, schema)]
      else
        any_of
      end

    Formatter.union(items)
  end

  defp format_type(%{"oneOf" => items}, schema) do
    items = Enum.map(items, &format_type(&1, schema))

    Formatter.union(items)
  end

  defp format_type(%{"properties" => properties} = definition, schema) do
    required = definition["required"] || []

    has_descriptions? = Enum.any?(properties, fn {_, def} -> not is_nil(def["description"]) end)

    properties =
      for {name, type} <- properties, not Map.get(type, "deprecated", false) do
        description = type["description"]

        name =
          if description do
            {name, description: description, required?: name in required}
          else
            {name, required?: name in required}
          end

        {name, format_type(type, schema)}
      end

    if properties == [] do
      if additional_properties = definition["additionalProperties"] do
        Algebra.concat(["Record<string, ", format_type(additional_properties, schema), ">"])
      else
        Formatter.object([{"[key: string]", "unknown"}])
      end
    else
      properties =
        if additional_properties = definition["additionalProperties"] do
          properties == [{"[key: string]", format_type(additional_properties, schema)}]
        else
          properties
        end

      Formatter.object(properties, force_breaks?: has_descriptions?)
    end
  end

  defp format_type(%{"type" => "object"} = definition, schema) do
    definition = Map.put_new(definition, "properties", %{})
    format_type(definition, schema)
  end

  defp format_type(%{"encode" => "binary"}, _schema) do
    "ArrayBuffer"
  end

  defp format_type(%{"format" => "uuid"}, _schema) do
    "UUID"
  end

  defp format_type(%{"type" => "array"} = definition, schema) do
    items = definition["items"] || []
    items = Enum.map(items, &format_type(&1, schema))

    Formatter.array(items)
  end

  defp format_type(%{"type" => primitive}, _schema)
       when primitive in ["null", "string", "number", "boolean"] do
    primitive
  end

  defp format_type("null", _schema), do: "null"
  defp format_type("string", _schema), do: "string"
  defp format_type("number", _schema), do: "number"
  defp format_type("boolean", _schema), do: "boolean"

  defp format_type(:undefined, _schema), do: "undefined"

  defp format_type(%{}, schema), do: format_type(%{"type" => "object"}, schema)

  defp format_type(type, _), do: raise("Unknown type: #{inspect(type)}")

  defp format_literal(nil), do: "null"
  defp format_literal(boolean) when is_boolean(boolean), do: inspect(boolean)
  defp format_literal(number) when is_number(number), do: inspect(number)
  defp format_literal(string) when is_binary(string), do: inspect(string)

  defp escape_identifier(identifier) do
    if String.match?(identifier, ~r/^[a-zA-z]\w*$/) do
      identifier
    else
      inspect(identifier)
    end
  end

  defp next_break_fits?(%{"type" => "object"}), do: true
  defp next_break_fits?(%{"properties" => _}), do: true
  defp next_break_fits?(%{"oneOf" => _}), do: false
  defp next_break_fits?(%{"allOf" => _}), do: false
  defp next_break_fits?(%{"anyOf" => _}), do: false
  defp next_break_fits?(%{"enum" => _}), do: true
  defp next_break_fits?(_), do: true

  def resolve_reference("#/" <> path, schema) do
    segments = Path.split(path)

    name =
      segments
      |> List.last()
      |> Macro.camelize()

    {name, get_in(schema, segments)}
  rescue
    _ ->
      reraise("Could not resolve path #/#{path}", __STACKTRACE__)
  end
end
