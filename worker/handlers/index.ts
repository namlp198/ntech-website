import type { NotificationAdapter, NotificationEventType } from "@/modules/notifications";

export async function deliverNotification(
  adapter: NotificationAdapter,
  eventType: NotificationEventType,
  payload: unknown,
): Promise<void> {
  await adapter.deliver(eventType, payload);
}

