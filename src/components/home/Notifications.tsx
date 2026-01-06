import { Bell } from "lucide-react";

type NotificationProps = {
  showNotification: boolean;
};

const Notifications = ({ showNotification = true }: NotificationProps) => {
  return (
    <div>
      {showNotification && (
        <div className="bg-[#f8f5e4] rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-600">Notifications (1)</h3>
            <Bell
              fill="currentColor"
              className="w-5 h-5 text-[var(--bg-secondary)]"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-start gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-gray-600 text-sm">
                You've invited to collaborate on "Eternal Echoes by @Bharnohi.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-sm text-[#3a4a48] px-4 h-8 rounded-full hover:opacity-90 transition-colors border border-[#d4c4b3] whitespace-nowrap">
                View Poem
              </button>
              <button className="flex-1 text-sm bg-secondary text-white px-4 h-8 rounded-full hover:opacity-90 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
