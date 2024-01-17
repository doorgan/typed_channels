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
  export type ErrorMessage = { helpUrl?: string, message: string };
  
  export type Media = { altText?: string, id?: UUID, url?: string };
  
  /**
   * A tweet
   */
  export type Tweet = { body: string, id: UUID, media?: Definitions.Media[] };
  
  /**
   * An object representing a user
   * 
   * THis is multiline
   */
  export type User = {
      /**
       * The user name
       */ 
      avatar: string,
      /**
       * The user name
       */ 
      bio: string,
      id: UUID,
      /**
       * The user name
       */ 
      name: string
    };
}

// Connect

export type Connect = { params: { user_id: string } }

// Channels
export type Channels = {
  [topic: `feed:${string}`]: {
    messages: {
      "tweet:create": {
        payload: { body: string, media_ids?: string[] },
        replies: {
          error: Definitions.ErrorMessage,
          ok: Definitions.Tweet,
          timeout: undefined
        }
      },
      "tweet:delete": {
        payload: { id: string },
        replies: {
          error: Definitions.ErrorMessage,
          ok: string,
          timeout: undefined
        }
      },
      "tweet:media_upload_finished": {
        payload: undefined,
        replies: {
          error: Definitions.ErrorMessage,
          ok: Definitions.Media,
          timeout: undefined
        }
      },
      "tweet:request_presigned_media_upload": {
        payload: undefined,
        replies: {
          error: Definitions.ErrorMessage,
          ok: {
            /**
             * This is the presigned url as returned by AWS
             * 
             * Check the AWS client docs for info on how to use it
             */ 
            presigned_url: string
          },
          timeout: undefined
        }
      }
    },
    subscriptions: { feed_update: { tweets: Definitions.Tweet[] } },
    join: {
      payload: undefined,
      replies: {
        error: Definitions.ErrorMessage,
        ok: { [key: string]: unknown },
        timeout: undefined
      }
    }
  },
  [topic: `user:${string}`]: {
    messages: {
      "user:follow": {
        payload: { user_id: string },
        replies: {
          error: Definitions.ErrorMessage,
          ok: string,
          timeout: undefined
        }
      },
      "user:unfollow": {
        payload: { user_id: string },
        replies: {
          error: Definitions.ErrorMessage,
          ok: string,
          timeout: undefined
        }
      }
    },
    subscriptions: {
      new_follower: { user: Definitions.User },
      "tweet:like": { tweet_id: string },
      "tweet:reply": { tweet_id: string }
    },
    join: {
      payload: undefined,
      replies: {
        error: Definitions.ErrorMessage,
        ok: { [key: string]: unknown },
        timeout: undefined
      }
    }
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
