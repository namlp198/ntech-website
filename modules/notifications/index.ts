export type NotificationEventType = "order.created" | "quote.created" | "order.status_changed";

export interface NotificationAdapter {
  readonly channel: "EMAIL" | "ZALO";
  deliver(eventType: NotificationEventType, payload: unknown): Promise<void>;
}

