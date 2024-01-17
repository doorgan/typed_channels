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
  export type LatLngTuple =
    number[];
  
  export type DatasetUserMetadata =
    {
      attributionText?: string,
      attributionUrl?: string,
      description?: string,
      license?: string,
      name: string,
      sourceAbbreviation?: string,
      sourceName?: string,
      sourceUrl?: string,
      userDataUpdatedIso8601?: string,
      userTimeUpdatedIso8601?: string
    };
  
  export type RouteElement =
    Definitions.PathShared
    & { routeMode: Definitions.NavigableRouteMode, showEndcaps?: boolean };
  
  export type Cursor =
    {
      color: string,
      coordinates: Definitions.LatLngTuple,
      sessionId: string,
      type: "Cursor"
    };
  
  export type ImageElement =
    Definitions.ElementShared
    & {
      coordinates: Definitions.Polygon[],
      description?: string,
      hasLongDescription?: boolean,
      mapImageId: string,
      opacity?: number,
      text?: string,
      type: "Image"
    };
  
  export type BackgroundTileSource =
    Definitions.BackgroundShared
    & {
      attribution: string,
      maxZoom?: number | null,
      minZoom: number | null,
      title: string,
      type: "tile",
      url: string
    };
  
  export type BackgroundSource =
    Definitions.BackgroundTileSource | Definitions.BackgroundColorSource;
  
  export type Polygon =
    Definitions.LinearRing[];
  
  export type NavigableRouteMode =
    "DRIVING" | "CYCLING" | "WALKING" | "FLYING";
  
  export type DatasetPipelineMetadata =
    {
      excerpt_url?: string,
      feature_url?: string,
      progress: number,
      stats_url?: string,
      status: Definitions.ProcessingStatus
    };
  
  export type ProcessingStatus =
    "processing" | "completed" | "failed";
  
  export type ToolColor =
    "RED"
    | "PINK"
    | "YELLOW"
    | "GREEN"
    | "BLUE"
    | "PURPLE"
    | "BLACK"
    | "BROWN"
    | "WHITE";
  
  export type CuratedLayerMetadata =
    {
      category: string,
      description: string,
      featured: boolean,
      keywords: string[],
      layer: Definitions.ServerLayer,
      layerId: string,
      name: string,
      region: string,
      sources: string[],
      thumbnailUrl: string,
      updatedAtIso8601: string
    };
  
  export type IndividualPermission =
    {
      email: string,
      icon?: string,
      id?: string,
      name?: string,
      permission: Definitions.Permission,
      updatedAt?: number
    };
  
  export type TextElement =
    Definitions.ElementShared
    & {
      coordinates: Definitions.Polygon[],
      needsBboxCalculation: boolean,
      position: Definitions.LatLngTuple,
      text: string,
      type: "Text"
    };
  
  export type MapImage =
    {
      id: string,
      large_url: string,
      medium_url: string,
      metadata: { height: number, orientation: number, width: number },
      small_url: string,
      srcset: string,
      status: "uploading" | "uploaded",
      tiny_url: string,
      url: string
    };
  
  export type IndividualPermissionsChangedPayload =
    {
      editableByCurrentSession: boolean,
      individualPermissions: Definitions.IndividualPermission[]
    };
  
  export type MapLink =
    {
      description?: string,
      faviconUrl?: string,
      id: string,
      imageUrl?: string,
      title?: string,
      url: string
    };
  
  export type OnboardingStep =
    "clip_tool_intro" | "training_karta";
  
  export type SnapshotColumns =
    {
      alias?: string,
      display_name?: string,
      label?: boolean,
      name: string,
      use: boolean
    };
  
  export type ErrorMessageServerResponsePayload =
    { errorMessage: string };
  
  export type Polyline =
    Definitions.Line[];
  
  export type UnitsPreference =
    "metric" | "us_standard";
  
  export type LinkElement =
    Definitions.ElementShared
    & {
      coordinates: Definitions.Polygon[],
      description?: string,
      everComputedBounds: boolean,
      mapLinkId: string,
      showLinkPreview?: boolean,
      text?: string,
      type: "Link"
    };
  
  export type NonOwnerPermission =
    "view_and_edit" | "view_only";
  
  export type ScreenshotFormat =
    "pdf" | "png";
  
  export type FeltElement =
    Definitions.MarkerElement
    | Definitions.PolygonElement
    | Definitions.MultipolygonElement
    | Definitions.HighlighterElement
    | Definitions.PlaceElement
    | Definitions.TextElement
    | Definitions.LinkElement
    | Definitions.NoteElement
    | Definitions.PathElement
    | Definitions.ImageElement;
  
  export type FeltElementAttribute =
    { id: string, key: string, value: string };
  
  export type PathElement =
    Definitions.LineElement | Definitions.RouteElement;
  
  export type Feature =
    { datasetId?: string, id?: string };
  
  export type ElementWithStroke =
    {
      strokeOpacity?: number,
      strokeStyle?: Definitions.StrokeStyle,
      strokeWidth?: number
    };
  
  export type UserLayerOrderedDataset =
    { dataset: Definitions.UserLayerDataset, z_order: number };
  
  export type ServerLegendItem =
    { id: string, visible: boolean };
  
  export type MapLayer =
    {
      created_at_unix_time_ms: number,
      description?: string,
      id: string,
      legend_items: Definitions.ServerLegendItem[],
      name?: string,
      user_layer_id: string,
      visible: boolean,
      z_order: number
    };
  
  export type StrokeStyle =
    "solid" | "dashed" | "dotted";
  
  export type LngLatTuple =
    number[];
  
  export type PlaceElement =
    Definitions.ElementShared
    & {
      coordinates: Definitions.LatLngTuple,
      description?: string,
      hasLongDescription?: boolean,
      icon?: string,
      isTextHidden?: boolean,
      mapImageId?: string,
      symbol?: Definitions.PlaceSymbol,
      text: string,
      type: "Place"
    };
  
  export type MultipolygonElement =
    Definitions.ElementShared
    & { coordinates: Definitions.Polygon[], type: "Multipolygon" };
  
  export type Point =
    { x: number, y: number };
  
  export type PlaceSymbol =
    "dot" | "square" | "diamond" | "triangle" | "x" | "plus" | "star" | "heart";
  
  export type BackgroundColorSource =
    Definitions.BackgroundShared & { color: string, type: "color" };
  
  export type PathShared =
    Definitions.ElementShared
    & {
      coordinates: Definitions.Polyline[],
      description?: string,
      hasLongDescription?: boolean,
      mapImageId?: string,
      showLength: boolean,
      text?: string,
      type: "Path"
    };
  
  export type LineElement =
    Definitions.ElementShared & Definitions.PathShared & { routeMode: "NONE" };
  
  export type Snapshot =
    {
      columns?: Definitions.SnapshotColumns[],
      geometry_type: string,
      id: number,
      layer_name?: string,
      uuid_name?: string
    };
  
  export type PointTuple =
    number[];
  
  export type MarkerElement =
    Definitions.ElementShared
    & {
      coordinates: Definitions.Polyline,
      description?: string,
      opacity?: number,
      size: number,
      text?: string,
      type: "Marker",
      zoom: number
    };
  
  export type PolygonElement =
    Definitions.ElementShared
    & Definitions.ElementWithStroke
    & {
      coordinates: Definitions.Polygon,
      description?: string,
      fillOpacity?: number,
      hasLongDescription?: boolean,
      mapImageId?: string,
      showArea: boolean,
      text?: string,
      type: "Polygon"
    };
  
  export type Line =
    Definitions.LatLngTuple[];
  
  export type PresignedPost =
    { fields: Record<string, string>, url: string };
  
  export type OrderingUpdate =
    { id: string, ordering: number };
  
  export type BackgroundShared =
    { colorScheme: Definitions.BackgroundColorScheme, id: string };
  
  export type LinearRing =
    Definitions.LatLngTuple[];
  
  export type Permission =
    Definitions.NonOwnerPermission | "owner";
  
  export type BackgroundColorScheme =
    "light" | "dark";
  
  export type HighlighterElement =
    Definitions.ElementShared
    & {
      coordinates: Definitions.Polygon[],
      description?: string,
      opacity?: number,
      text?: string,
      type: "Highlighter"
    };
  
  export type NoteElement =
    Definitions.ElementShared
    & {
      coordinates: Definitions.Polygon[],
      needsBboxCalculation: boolean,
      position: Definitions.LatLngTuple,
      text: string,
      type: "Note",
      widthScale: number
    };
  
  export type ElementShared =
    {
      attributes: Definitions.FeltElementAttribute[],
      author: string,
      clipSource?: Definitions.Feature,
      color: Definitions.ToolColor,
      createdAtUnixTimeMs: number,
      datasetId?: string,
      id: string,
      locked: boolean,
      ordering: number
    };
  
  export type ServerLayer =
    {
      bounding_box?: { geometry: { coordinates: [][] } },
      createdAtUnixTimeMs: number,
      datasets: Definitions.UserLayerOrderedDataset[],
      description: string,
      duplicatedFromId?: string,
      errorType?: string,
      id: string,
      index_json_url: string | null,
      legend_items: { id: string, visible: boolean }[],
      max_zoom?: number,
      name: string,
      progress_percent: number,
      style: { [key: string]: unknown },
      title_url?: string,
      user_id: string,
      visible: boolean,
      z_order: number
    };
  
  export type UserLayerDataset =
    Definitions.DatasetPipelineMetadata
    & Definitions.DatasetUserMetadata
    & {
      centroids_layer_name?: string,
      created_at: string,
      created_by?: string,
      current_snapshot?: Definitions.Snapshot,
      geometry_type: string,
      id: string,
      layer_name: string,
      max_zoom?: number,
      modified_at?: string,
      name: string,
      style?: string,
      tile_url?: string
    };
}

// Connect

export type Connect = { params: { [key: string]: unknown } }

// Channels
export type Channels = {
  [topic: `map:${string}`]: {
    messages: {
      "datasets:copy": {
        payload: { datasetIds: string[], targetLayerId: string },
        replies: { timeout: undefined }
      },
      "datasets:move_to_new_layer": {
        payload: { datasetIds: string[] },
        replies: {
          ok: { addedLayer: Definitions.ServerLayer },
          timeout: undefined
        }
      },
      update_background: {
        payload: { background: Definitions.BackgroundSource },
        replies: { timeout: undefined }
      },
      remove_elements: {
        payload: { elementIds: string[] },
        replies: { timeout: undefined }
      },
      completed_onboarding_step: {
        payload: { step: Definitions.OnboardingStep },
        replies: { timeout: undefined }
      },
      "update_karta_sharing:create_invite": {
        payload: { email: string, permission: Definitions.NonOwnerPermission },
        replies: {
          error: { errorMessage?: string, reason?: "already_added" | "owner" },
          ok: Definitions.IndividualPermissionsChangedPayload,
          timeout: undefined
        }
      },
      update_selected_background: {
        payload: { id: string | null },
        replies: { timeout: undefined }
      },
      add_elements: {
        payload: {
          elements: Definitions.FeltElement[],
          isBroadcaster?: boolean
        },
        replies: {
          ok: { orderings: Definitions.OrderingUpdate[] },
          timeout: undefined
        }
      },
      delete_karta: {
        payload: undefined,
        replies: {
          error: Definitions.ErrorMessageServerResponsePayload,
          ok: { redirectUrl: string },
          timeout: undefined
        }
      },
      update_karta_sharing: {
        payload: { isPubliblyEditable?: boolean, isPubliclyViewable: boolean },
        replies: { timeout: undefined }
      },
      "layer:duplicate": {
        payload: { fromLayerId: string, newLayerId: string, zOrder: number },
        replies: { timeout: undefined }
      },
      "layers:restore": {
        payload: { layerIds: string[] },
        replies: { timeout: undefined }
      },
      focus_layer_styles: {
        payload: { ids: string[] },
        replies: { timeout: undefined }
      },
      delete_background: {
        payload: { id: string },
        replies: { timeout: undefined }
      },
      viewport_link_copied: {
        payload: { lat?: number, lon?: number, zoom?: number },
        replies: { timeout: undefined }
      },
      select_elements: {
        payload: { ids: string[] },
        replies: { timeout: undefined }
      },
      "update_karta_sharing:update_invite": {
        payload: {
          email?: string,
          permission: Definitions.NonOwnerPermission,
          userId?: string
        },
        replies: { timeout: undefined }
      },
      filter_layers: {
        payload: { query: string, topLayerIds: string[] },
        replies: { timeout: undefined }
      },
      "user:update": {
        payload: { user: { unitsPreference: Definitions.UnitsPreference } },
        replies: { timeout: undefined }
      },
      restore_elements: {
        payload: {
          elements: Definitions.FeltElement[],
          isBroadcaster?: boolean
        },
        replies: { timeout: undefined }
      },
      "data_layers:dashboard": {
        payload: undefined,
        replies: { ok: { curatedLayers?: [] }, timeout: undefined }
      },
      "user_layers:upload_finished": {
        payload: { filename: string, layerId?: string, pipelineRunId: string },
        replies: { timeout: undefined }
      },
      duplicate_karta: {
        payload: undefined,
        replies: {
          error: Definitions.ErrorMessageServerResponsePayload,
          ok: { id: string, redirectUrl: string },
          timeout: undefined
        }
      },
      "datasets:remove": {
        payload: { datasetIds: string[] },
        replies: { timeout: undefined }
      },
      remove_individual_permission: {
        payload: { email?: string, userId?: string },
        replies: { timeout: undefined }
      },
      "datasets:copy_to_new_layer": {
        payload: { datasetIds: string[] },
        replies: {
          ok: { addedLayer: Definitions.ServerLayer },
          timeout: undefined
        }
      },
      create_background: {
        payload: { background: Definitions.BackgroundSource },
        replies: { timeout: undefined }
      },
      "dataset:metadata_update": {
        payload: {
          datasetId: string,
          metadata: Definitions.DatasetUserMetadata
        },
        replies: { timeout: undefined }
      },
      create_map_image: {
        payload: {
          clientProvidedHeight: number | null,
          clientProvidedWidth: number | null,
          id: string,
          mimeType: string
        },
        replies: {
          error: Definitions.ErrorMessageServerResponsePayload,
          ok: {
            id: string,
            mimeType: string,
            presignedPost: Definitions.PresignedPost,
            status: "uploading"
          },
          timeout: undefined
        }
      },
      "layers:remove": {
        payload: { layerIds: string[] },
        replies: { timeout: undefined }
      },
      "datasets:move": {
        payload: { datasetIds: string[], targetLayerId: string },
        replies: { timeout: undefined }
      },
      delete_palette_color: {
        payload: { color: string },
        replies: { timeout: undefined }
      },
      "map_layers:update": {
        payload: { map_layers: Record<string, Definitions.MapLayer> },
        replies: { timeout: undefined }
      },
      add_palette_color: {
        payload: { color: string },
        replies: { timeout: undefined }
      },
      "map_layer:update": {
        payload: { map_layer: Definitions.MapLayer },
        replies: { timeout: undefined }
      },
      update_satellite_mode: {
        payload: { satelliteMode: boolean },
        replies: { timeout: undefined }
      },
      heartbeat: {
        payload: undefined,
        replies: {
          error: { [key: string]: unknown },
          ok: { server_time_ms: number },
          timeout: undefined
        }
      },
      create_map_link: {
        payload: { id: string, url: string },
        replies: { timeout: undefined }
      },
      "user_layers:create": {
        payload: undefined,
        replies: {
          ok: {
            layer?: Definitions.ServerLayer,
            name: string,
            pipelineRunId: string,
            presignedPost: Definitions.PresignedPost
          },
          timeout: undefined
        }
      },
      update_title: {
        payload: { title: string },
        replies: { timeout: undefined }
      },
      felt_style_editor_save_layer_style_override: {
        payload: { style: string, user_layer_id: string | null },
        replies: {
          error: { [key: string]: unknown },
          ok: { [key: string]: unknown },
          timeout: undefined
        }
      },
      map_image_upload_finished: {
        payload: { id: string },
        replies: { timeout: undefined }
      },
      transform_selected_elements: {
        payload: {
          isTransient: boolean,
          offset: Definitions.PointTuple,
          sessionId: string,
          type: "translate"
        },
        replies: { timeout: undefined }
      },
      remove_cursor: { payload: undefined, replies: { timeout: undefined } },
      request_export: {
        payload: {
          format: Definitions.ScreenshotFormat,
          height: number,
          lat: number,
          legend: boolean,
          lon: number,
          units: Definitions.UnitsPreference,
          width: number,
          zoom: number
        },
        replies: { timeout: undefined }
      },
      update_elements: {
        payload: {
          clearTransientSessionId?: string,
          elements: Definitions.FeltElement[],
          isBroadcaster?: boolean
        },
        replies: { timeout: undefined }
      },
      export_downloaded: {
        payload: { id: string },
        replies: { timeout: undefined }
      },
      move_cursor: {
        payload: { coordinates: Definitions.LatLngTuple },
        replies: { timeout: undefined }
      },
      "background:toggle_labels": {
        payload: { background: "default" | "satellite", showLabels: boolean },
        replies: { timeout: undefined }
      }
    },
    subscriptions: {
      add_elements: {
        elements: Definitions.FeltElement[],
        isBroadcaster?: boolean
      },
      "background:toggle_labels": {
        background: "default" | "satellite",
        showLabels: boolean
      },
      background_deleted: { id: string },
      background_updated: { background: Definitions.BackgroundSource },
      color_palette_updated: { added: string[], deleted: string[] },
      cursor_moved: {
        color: string,
        coordinates: Definitions.LatLngTuple,
        session_id: string
      },
      cursor_removed: { session_id: string },
      "dataset:metadata_updated": {
        datasetId: string,
        layerId: string,
        metadata: Definitions.DatasetUserMetadata
      },
      export_ready: {
        format: Definitions.ScreenshotFormat,
        id: string,
        url: string
      },
      felt_style_editor_save_layer_style_saved: {
        id?: string,
        karta_id?: string,
        style: string,
        user_id?: string,
        user_layer_id: string
      },
      individual_permissions_changed: Definitions.IndividualPermissionsChangedPayload,
      karta_sharing_updated: {
        editableByCurrentSession: boolean,
        isPubliblyEditable?: boolean,
        isPubliclyViewable: boolean
      },
      kicked: { message: string, redirectUrl?: string },
      layers_added: { layer: Definitions.ServerLayer },
      layers_modified: {
        layerIdsDeleted: string[],
        layersAdded: Definitions.ServerLayer[],
        layersUpdated: Definitions.ServerLayer[]
      },
      layers_removed: { layerIds: string[] },
      "map_layer:updated": {
        layer?: Definitions.ServerLayer,
        mapLayer?: Definitions.MapLayer
      },
      pipeline_elements_processing_completed: {
        elements?: Definitions.FeltElement[],
        errorMessage?: string,
        helpUrl?: string,
        pipelineRunId: string
      },
      pipeline_elements_processing_updated: {
        errorMessage?: string,
        helpUrl?: string,
        pipelineRunId: string,
        progress: number
      },
      remove_elements: { elementIds: string[] },
      restore_elements: {
        elements: Definitions.FeltElement[],
        isBroadcaster?: boolean
      },
      satellite_mode_updated: { satelliteMode: boolean },
      selected_background_updated: { id: string | null },
      title_updated: { path: string, title: string, url: string },
      transform_selected_elements: {
        isTransient: boolean,
        offset: Definitions.PointTuple,
        sessionId: string,
        type: "translate"
      },
      update_elements: {
        clearTransientSessionId?: string,
        elements: Definitions.FeltElement[],
        isBroadcaster?: boolean
      },
      update_map_image: { mapImage: Definitions.MapImage },
      update_map_link: { mapLink: Definitions.MapLink },
      "user:update": { user: { unitsPreference: Definitions.UnitsPreference } },
      "user_layer:completed": { layer: Definitions.ServerLayer },
      "user_layer:updated": { layer: Definitions.ServerLayer }
    },
    join: {
      payload: { token?: string },
      replies: {
        error: { reason: string },
        ok: {
          client_id: string,
          felt_version: string,
          session_id: string,
          user_id: string
        },
        timeout: undefined
      }
    }
  },
  [topic: `user:${string}`]: {
    messages: {
      avatar_upload_finished: {
        payload: { id?: string | null },
        replies: {
          error: string | { errors: { [key: string]: unknown } },
          ok: {
            id: string,
            metadata: { height: number, orientation: number, width: number },
            mimeType: string,
            srcset: string,
            status: string,
            url: string
          },
          timeout: undefined
        }
      },
      create_avatar: {
        payload: {
          clientProvidedHeight?: number,
          clientProvidedWidth?: number,
          mimeType: string
        },
        replies: {
          error: string | { errors: { [key: string]: unknown } },
          ok: {
            id: string,
            mimeType: string,
            presignedPost: Definitions.PresignedPost,
            status: string
          },
          timeout: undefined
        }
      }
    },
    subscriptions: {
      screenshot_update: { cloudfront_url: string, karta_id: string }
    },
    join: {
      payload: undefined,
      replies: {
        error: { reason: string },
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
