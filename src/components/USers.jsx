import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const USers = () => {
  const loadedUSers = useLoaderData();
  const [users, setUsers] = useState(loadedUSers);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const remaining = users.filter((user) => user._id !== id);
        setUsers(remaining);
      });
  };
  return (
    <div>
      <h2 className="text-2xl">Users:{users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Last Login</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {users.map((user, idx) => (
              <tr key={user._id} className="hover">
                <th>{idx + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.createdAt}</td>
                <td>{user?.lastLoginTime}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-xs bg-red-500 text-white"
                  >
                    Delete
                  </button>
                  <button className="btn btn-xs bg-green-500 text-white">
                    Edit
                  </button>
                  <button className="btn btn-xs bg-cyan-500 text-white">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default USers;
