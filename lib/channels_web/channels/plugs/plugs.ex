defmodule ChannelsWeb.Channels.Plugs do
  def noop(socket, payload, bindings, _opts) do
    {:cont, socket, payload, bindings}
  end

  def logged_in(socket, payload, bindings, _opts) do
    if socket.assigns.user_id == "dorgan" do
      {:cont, socket, payload, bindings}
    else
      {:reply, {:error, "Unauthorized"}, socket}
    end
  end
end
