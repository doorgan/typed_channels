defmodule ChannelsWeb.TestChannel.DatasetHandler do
  use ChannelHandler.Handler

  alias ChannelsWeb.Channels.Plugs

  plug Plugs.CastInput
  plug &ensure_karta_loaded/4

  def create(%{"id" => id}, bindings, socket) do
    {:reply, {:ok, "Dataset #{id} created for karta #{bindings.karta.id}"}, socket}
  end

  def create(_, _, socket) do
    {:noreply, socket}
  end

  def ensure_karta_loaded(socket, params, bindings, _opts) do
    dbg(bindings)
    {:cont, socket, params, Map.put_new(bindings, :karta, %{id: "12345", elements: []})}
  end
end
