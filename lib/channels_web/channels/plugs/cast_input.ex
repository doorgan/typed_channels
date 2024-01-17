defmodule ChannelsWeb.Channels.Plugs.CastInput do
  alias ChannelsWeb.JsonSchemas

  require Logger

  def call(socket, payload, bindings, _opts) do
    channel = socket.assigns.__channel__
    event = bindings.event

    schema = JsonSchemas.channels()[channel]["messages"][event]["payload"]

    if schema do
      case Xema.cast(schema, payload) do
        {:ok, casted} ->
          {:cont, socket, casted, bindings}

        {:error, error} ->
          {:reply, {:error, Exception.message(error)}, socket}
      end
    else
      Logger.debug("No schema found for event #{event} in channel #{channel}")
      {:cont, socket, payload, bindings}
    end
  end
end
