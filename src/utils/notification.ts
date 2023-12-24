import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

type NotificationType = "success" | "info" | "warning" | "error";

export function openNotificationWithIcon({
  type,
  message,
  description,
  api,
}: {
  type: NotificationType;
  message: string;
  api: NotificationInstance;
  description?: string;
}) {
  api[type]({
    message,
    description,
  });
}
