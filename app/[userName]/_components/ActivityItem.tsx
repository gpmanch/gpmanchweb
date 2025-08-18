// app/admin/components/ActivityItem.tsx
export default function ActivityItem({
    user,
    action,
    time,
  }: {
    user: string;
    action: string;
    time: string;
  }) {
    return (
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-1 mr-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
        <div>
          <p className="text-sm">
            <span className="font-medium">{user}</span> {action}
          </p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    );
  }