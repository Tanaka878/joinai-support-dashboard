// components/UserList.tsx
import React from 'react';

const TicketList = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
