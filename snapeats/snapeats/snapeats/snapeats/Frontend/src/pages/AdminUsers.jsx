import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);

  // 🔹 Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      {/* TABLE */}
      <table className="w-full border shadow bg-white">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Login Time</th>
            <th className="p-3">Logout Time</th>
            <th className="p-3">Duration</th>
          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-5">
                No users found
              </td>
            </tr>
          ) : (

            users.map((u) => (

              <tr key={u._id} className="text-center border-t">

                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>

                {/* LOGIN TIME */}
                <td className="p-3">
                  {u.loginTime
                    ? new Date(u.loginTime).toLocaleString()
                    : "—"}
                </td>

                {/* LOGOUT TIME */}
                <td className="p-3">
                  {u.logoutTime
                    ? new Date(u.logoutTime).toLocaleString()
                    : "—"}
                </td>

                {/* DURATION */}
                <td className="p-3">
                  {u.loginDuration || "Active"}
                </td>

              </tr>

            ))

          )}                                               

        </tbody>
                                                                          
      </table>

    </div>

  );
}