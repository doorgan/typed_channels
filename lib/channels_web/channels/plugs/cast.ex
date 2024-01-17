defmodule ChannelsWeb.Channels.Plugs.Cast do
  def call(socket, payload, bindings, schema: schema) do
    case schema.cast(payload) do
      {:ok, casted} ->
        {:cont, socket, casted, bindings}

      {:error, error} ->
        {:reply, {:error, Exception.message(error)}, socket}
    end
  end
end
