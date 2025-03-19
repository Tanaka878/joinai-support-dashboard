import BASE_URL from "@/app/config/api/api";
import React, { useEffect, useState } from "react";

interface AgentData {
  id: number;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const AgentDataComponent: React.FC = () => {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


 const fetchAgents = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Example of fetching a token from local storage
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${BASE_URL}/admin/getAgents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch agents");
    }

    const data: AgentData[] = await response.json();
    setAgents(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  
  const handleEdit = (id: number) => {
    console.log(`Edit Admin with ID: ${id}`);
    // Add edit functionality here
  };

  const handleDelete = async (id: number) => {
    console.log(`Delete Admin with ID: ${id}`);
    try {
      const response = await fetch(`${BASE_URL}/admins/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }
      setAgents(agents.filter((agent) => agent.id !== id));
    } catch (err) {
      console.log(err);
      setError("Failed to delete agent")
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-bold mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold mt-4">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-6 text-center">Agent Details</div>
      <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">State</th>
            <th className="border border-gray-300 px-4 py-2">Country</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id} className="text-center hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{agent.id}</td>
              <td className="border border-gray-300 px-4 py-2">{agent.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{agent.address}</td>
              <td className="border border-gray-300 px-4 py-2">{agent.city}</td>
              <td className="border border-gray-300 px-4 py-2">{agent.state}</td>
              <td className="border border-gray-300 px-4 py-2">{agent.country}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(agent.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(agent.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentDataComponent;
