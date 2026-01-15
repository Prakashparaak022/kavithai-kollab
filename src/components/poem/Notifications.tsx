"use client";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { Notification } from "@/types/notification";

type Props = {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
};
const timeAgo = (date: string) => {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const Notifications = ({ notifications, setNotifications }: Props) => {
  const router = useRouter();

  if (!notifications.length) return null;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      {notifications.map((n, idx) => (
        <div
          key={idx}
          className={`rounded-xl p-4 shadow-lg cursor-pointer
          transition-all duration-300
          animate-[slideIn_0.5s_ease-out]
          hover:shadow-md hover:-translate-y-[1px]
          ${
            n.read
              ? "bg-primary opacity-80"
              : "bg-[#fcfaf3] border border-[#f5c16c] animate-[pulseGlow_2s_infinite]"
          }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-600">Notifications</h3>

            <div className="relative">
              <Bell fill="currentColor" className="w-5 h-5 text-green" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div key={n.id}>
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm text-gray-700 leading-snug">
                  {n.message}
                </p>

                <span className="text-[10px] text-gray-500 whitespace-nowrap">
                  {timeAgo(n.createdAt)}
                </span>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    markAsRead(n.id);
                    router.push(`/poem/${n.poemSlug}`);
                  }}
                  className="flex-1 text-xs bg-secondary text-white h-7 rounded-full hover:opacity-90">
                  View Poem
                </button>

                <button
                  onClick={() => dismiss(n.id)}
                  className="flex-1 text-xs text-gray-600 border h-7 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors border border-[#d4c4b3] whitespace-nowrap">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notifications;
