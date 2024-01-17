import { Socket } from "./generated/felt";

const socket = new Socket("/socket", {params: {token: "123"}})

const feed = socket.channel("map:123")

feed
  .join()
  .receive("ok", () => console.log("Connected to map"))