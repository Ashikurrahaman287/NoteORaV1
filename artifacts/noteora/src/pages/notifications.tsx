import { useListNotifications, getListNotificationsQueryKey, useMarkNotificationRead, useMarkAllNotificationsRead } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Info, AlertTriangle, CheckCircle, XCircle, CheckCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const typeConfig = {
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30" },
  success: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  error: { icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30" },
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function Notifications() {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useListNotifications({ query: { queryKey: getListNotificationsQueryKey() } });
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;

  const handleMarkRead = (id: number) => {
    markRead.mutate({ id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() }) });
  };

  const handleMarkAll = () => {
    markAllRead.mutate(undefined, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() }) });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAll} disabled={markAllRead.isPending} data-testid="button-mark-all-read">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20" />)
          : notifications?.length === 0
          ? (
            <div className="py-16 text-center border rounded-lg bg-secondary/20">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground mt-1">You're all caught up.</p>
            </div>
          )
          : notifications?.map((n) => {
            const cfg = typeConfig[n.type as keyof typeof typeConfig] ?? typeConfig.info;
            const Icon = cfg.icon;
            return (
              <Card
                key={n.id}
                data-testid={`card-notification-${n.id}`}
                className={cn("transition-colors", !n.isRead && "border-primary/30 bg-primary/5")}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div className={cn("rounded-full p-2 shrink-0", cfg.bg)}>
                    <Icon className={cn("h-4 w-4", cfg.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{n.title}</p>
                      <span className="text-xs text-muted-foreground shrink-0">{timeAgo(n.createdAt)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                  </div>
                  {!n.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 text-xs"
                      data-testid={`button-mark-read-${n.id}`}
                      onClick={() => handleMarkRead(n.id)}
                    >
                      Mark read
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
