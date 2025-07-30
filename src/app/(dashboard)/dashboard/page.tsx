import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
  return (
   <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold ">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Posts */}
        <div className="bg-gray-900 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-100">Total Posts</h2>
          <p className="text-2xl mt-2 text-blue-600 font-bold">23</p>
        </div>

        {/* Card 2: Drafts */}
        <div className="bg-gray-900 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-100">Drafts</h2>
          <p className="text-2xl mt-2 text-yellow-500 font-bold">5</p>
        </div>

        {/* Card 3: Published */}
        <div className="bg-gray-900 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-100">Published</h2>
          <p className="text-2xl mt-2 text-green-600 font-bold">18</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="flex gap-4">
          <Link
            href="/dashboard/add-post"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add New Post
          </Link>
          <Link
            href="/dashboard/manage-posts"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            🛠 Manage Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage