// app/admin/components/TableRow.tsx
export default function TableRow({
    orderId,
    customer,
    status,
    date,
    amount,
  }: {
    orderId: string;
    customer: string;
    status: string;
    date: string;
    amount: string;
  }) {
    const statusColor = {
      Completed: 'bg-green-100 text-green-800',
      Processing: 'bg-blue-100 text-blue-800',
      Shipped: 'bg-yellow-100 text-yellow-800',
      Pending: 'bg-gray-100 text-gray-800',
    }[status] || 'bg-gray-100 text-gray-800';
  
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{orderId}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
            {status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{date}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{amount}</td>
      </tr>
    );
  }