defmodule ChannelsWeb.TestChannel do
  use ChannelsWeb, :channel
  use ChannelHandler.Router

  alias ChannelsWeb.Channels.Plugs

  channel "map:{map_id}"

  join fn _topic, _payload, socket ->
    {:ok, socket}
  end

  scope "dataset:delete" do
    plug &noop/4

    handle "", fn _payload, bindings, socket ->
      dbg(bindings)
      dbg(socket.assigns)
      {:reply, {:ok, {:binary, "handled before!"}}, socket}
    end
  end

  scope "dataset:" do
    plug &Plugs.logged_in/4

    event "create", ChannelsWeb.TestChannel.DatasetHandler, :create
  end

  scope "comments:" do
    plug &noop/4

    handle "", fn _payload, bindings, socket ->
      IO.inspect(bindings, label: "bindings")
      {:noreply, socket}
    end
  end

  def noop(socket, payload, bindings, _opts) do
    dbg("NOOP")
    {:cont, socket, payload, bindings}
  end
end
