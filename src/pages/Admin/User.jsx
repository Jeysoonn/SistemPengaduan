import React, { useState } from "react";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("Security");

  const users = [
    { name: "John Doe", email: "johndoe@email.com", role: "Security", status: "Active" },
    { name: "Jane Smith", email: "janesmith@email.com", role: "BSTI", status: "Inactive" },
    { name: "Mike Johnson", email: "mikejohnson@email.com", role: "BAAK", status: "Active" },
    { name: "Chris Lee", email: "chrislee@email.com", role: "Security", status: "Active" },
    { name: "Anna Davis", email: "annadavis@email.com", role: "BSTI", status: "Active" },
    // More users can go here
  ];

  // Filter users by role
  const filteredUsers = (role) => users.filter(user => user.role === role);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Add New User
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <ul className="flex space-x-4">
            {["Security", "BSTI", "BAAK"].map((role) => (
              <li
                key={role}
                className={`cursor-pointer py-2 px-4 rounded-lg text-base font-medium transition-colors 
                  ${activeTab === role ? "bg-blue-500 text-white" : "text-blue-500 hover:bg-blue-100"}`}
                onClick={() => setActiveTab(role)}
              >
                {role}
              </li>
            ))}
          </ul>
        </div>

        {/* User Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers(activeTab).map((user, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-sm text-gray-800">{user.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                  <td className="py-3 px-4 text-sm text-green-600">{user.status}</td>
                  <td className="py-3 px-4 text-sm">
                    <button className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
