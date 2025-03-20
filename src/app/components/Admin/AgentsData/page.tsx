'use client'
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
      const token = localStorage.getItem("authToken");
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

  const handleEdit = async (admin: AgentData) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${BASE_URL}/admin/editProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, admin }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit admin profile");
      }

      const updatedAdmin: AgentData = await response.json();
      console.log("Admin profile updated successfully:", updatedAdmin);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (admin: AgentData) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await fetch(`${BASE_URL}/deleteProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          admin,
        }), // Pass token and admin in the body
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }
  
      // Assuming the backend returns the deleted admin or success message
      const result = await response.json();
      console.log("Profile deleted successfully:", result);
  
      // Update state to reflect the deleted admin
      setAgents(agents.filter((agent) => agent.id !== admin.id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete agent");
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
          <tr className="bg-gray-100 text-black">
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
                  onClick={() => handleEdit(agent)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(agent)}
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
