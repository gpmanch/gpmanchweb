// app/admin/components/QuickStatItem.tsx
export default function QuickStatItem({
    label,
    value,
    change,
  }: {
    label: string;
    value: string;
    change: string;
  }) {
    const isPositive = change.startsWith('+');

    return (
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-lg font-semibold">{value}</p>
          <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change} {isPositive ? '↑' : '↓'}
          </p>
        </div>
      </div>
    );
  }