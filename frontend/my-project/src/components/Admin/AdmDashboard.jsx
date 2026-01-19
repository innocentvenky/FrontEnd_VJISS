import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const initialUsers = [
  {
    id: "u1",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    role: "Student",
    status: "Active",
    applications: [
      { id: "i1", type: "internship", title: "Frontend Developer" },
      { id: "c1", type: "course", title: "React Basics" },
    ],
  },
  {
    id: "u2",
    name: "Anjali Verma",
    email: "anjali@gmail.com",
    phone: "9123456789",
    role: "Instructor",
    status: "Active",
    applications: [],
  },
];


const UsersDashboard = ({ api }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch users from API or use initialUsers as fallback
    const fetchUsers = async () => {
      try {
        const res = await api.get("/VJISS/view_users/");
        setUsers(Array.isArray(res.data) ? res.data : initialUsers);
      } catch {
        setUsers(initialUsers);
      } 
    };

    fetchUsers();
  }, [api]);


  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold">Users</h1>
          <input
            type="text"
            placeholder="Search users..."
            className="border rounded px-3 py-1 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applications</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">{user.name}</td>
                  <td
                    className="px-6 py-4 text-blue-600 cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    {user.email}
                  </td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    {user.applications?.length > 0 ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {user.applications.length} Applied
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={()=>setSelectedUser(null)}>
            <div className="bg-white rounded-lg p-6 w-96" onClick={(e)=>e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p className="mt-3 font-semibold">Applications:</p>
              {selectedUser.applications?.length ? (
                <ul className="list-disc ml-5 mt-2">
                  {selectedUser.applications.map((app) => (
                    <li key={app.id}>
                      <button
                        className="text-blue-600 underline"
                        onClick={() => {
                          if(app.type === "internship") navigate(`/admin/internship/${app.id}`);
                          else navigate(`/admin/course/${app.id}`);
                        }}
                      >
                        {app.type} - {app.title}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : <p>No applications</p>}
              <button
                className="mt-4 bg-blue-600 text-white px-3 py-1 rounded"
                onClick={()=>setSelectedUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UsersDashboard;
