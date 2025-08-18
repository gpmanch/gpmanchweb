import React from 'react'
import StatCard, { statCardIcons } from './_components/StatCard'
import { Users } from 'lucide-react'
import ActivityItem from './_components/ActivityItem'
import QuickStatItem from './_components/QuickStatItem'
import TableRow from './_components/TableRow'

export default function page() {
  return (
    <div className="flex h-screen bg-gray-100 mt-[70px]">

      <div className="flex-1 flex flex-col overflow-hidden">

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Users"
              value="2,456"
              change="+12.5%"
              icon={statCardIcons.users}
            />
            <StatCard
              title="Revenue"
              value="$12,345"
              change="+8.2%"
              icon={statCardIcons.revenue}
            />
            <StatCard
              title="Products"
              value="143"
              change="-3.1%"
              icon={statCardIcons.products}
            />
            <StatCard
              title="Active Sessions"
              value="56"
              change="+4.3%"
              icon={<Users className="w-6 h-6 text-orange-500" />}
            />
          </div>

          {/* Charts and Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <ActivityItem
                  user="John Smith"
                  action="created a new product"
                  time="2 hours ago"
                />
                <ActivityItem
                  user="Sarah Johnson"
                  action="updated user settings"
                  time="4 hours ago"
                />
                <ActivityItem
                  user="Michael Brown"
                  action="completed an order"
                  time="6 hours ago"
                />
                <ActivityItem
                  user="Emily Davis"
                  action="registered as new user"
                  time="1 day ago"
                />
              </div>
              <button className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                View all activity
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <QuickStatItem
                  label="New Users (7d)"
                  value="124"
                  change="+8%"
                />
                <QuickStatItem
                  label="Orders (7d)"
                  value="89"
                  change="+15%"
                />
                <QuickStatItem
                  label="Conversion Rate"
                  value="3.2%"
                  change="-0.5%"
                />
                <QuickStatItem
                  label="Avg. Session"
                  value="4m 23s"
                  change="+12s"
                />
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <TableRow
                    orderId="#12345"
                    customer="John Smith"
                    status="Completed"
                    date="2023-05-15"
                    amount="$125.00"
                  />
                  <TableRow
                    orderId="#12346"
                    customer="Sarah Johnson"
                    status="Processing"
                    date="2023-05-14"
                    amount="$89.50"
                  />
                  <TableRow
                    orderId="#12347"
                    customer="Michael Brown"
                    status="Shipped"
                    date="2023-05-13"
                    amount="$234.00"
                  />
                  <TableRow
                    orderId="#12348"
                    customer="Emily Davis"
                    status="Pending"
                    date="2023-05-12"
                    amount="$56.75"
                  />
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t flex justify-between items-center">
              <div className="text-sm text-gray-600">Showing 1 to 4 of 24 entries</div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md text-sm">Previous</button>
                <button className="px-3 py-1 border rounded-md bg-blue-500 text-white text-sm">1</button>
                <button className="px-3 py-1 border rounded-md text-sm">2</button>
                <button className="px-3 py-1 border rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
