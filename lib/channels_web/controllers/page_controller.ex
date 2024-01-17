defmodule ChannelsWeb.PageController do
  use ChannelsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
