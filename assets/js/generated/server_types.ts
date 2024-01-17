/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and recompile the project to regenerate this file.
 */

import type * as Phoenix from "phoenix";
import {Socket as PhoenixSocket} from "phoenix";

export type UUID = string;

// Definitions

declare namespace Definitions {
/**
 * The payload used to create a dataset.
 * 
 * TODO: require a layer id
 */
export type DatasetCreatePayload = { id: string };
}

// Connect

export type Connect = { params: { [key: string]: unknown } }

// Channels
export type Channels = {
  [topic: `map:${string}`]: {
    messages: {
      "dataset:create": {
        payload: Definitions.DatasetCreatePayload,
        replies: { ok: string, timeout: undefined }
      }
    },
    subscriptions: {},
    join: { payload: undefined, replies: { timeout: undefined } }
  }
}

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
