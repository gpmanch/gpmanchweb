// app/admin/components/StatCard.tsx
import { Users, PieChart, ShoppingCart } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          <p className={`mt-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change} {isPositive ? '↑' : '↓'}
          </p>
        </div>
        <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      </div>
    </div>
  );
}

// Example icons for reference
export const statCardIcons = {
  users: <Users className="w-6 h-6 text-blue-500" />,
  revenue: <PieChart className="w-6 h-6 text-green-500" />,
  products: <ShoppingCart className="w-6 h-6 text-purple-500" />,
};