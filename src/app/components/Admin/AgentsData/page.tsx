'use client'
import BASE_URL from "@/app/config/api/api";
import React, { useEffect, useState } from "react";

interface AgentData {
  id: number | null;
  firstName: string;
  username: string;
  email: string;
  role: string;
  localDate: string;
  gender: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  enabled: boolean;
}

const AgentDataComponent: React.FC = () => {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("email");
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
      setError("Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (agent: AgentData) => {
    try {
      const token = localStorage.getItem("email");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${BASE_URL}/admin/editProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, agent }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit agent profile");
      }

      const updatedAgent: AgentData = await response.json();
      // Update the local state with the edited agent
      setAgents(agents.map(a => a.id === updatedAgent.id ? updatedAgent : a));
      console.log("Agent profile updated successfully:", updatedAgent);
    } catch (err) {
      console.error(err);
      setError("Failed to edit agent");
    }
  };

  const handleDelete = async (agent: AgentData) => {
    try {
      const token = localStorage.getItem("email");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${BASE_URL}/admin/deleteProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, agent }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }

      const result = await response.json();
      console.log("Profile deleted successfully:", result);

      // Update local state to remove the deleted agent
      setAgents(agents.filter((a) => a.id !== agent.id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete agent");
    }
  };

  useEffect(() => {
    console.log("Current agents state:", agents);
  }, [agents]);

  useEffect(() => {
    fetchAgents();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-bold mt-4 text-black">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold mt-4">Error: {error}</div>;
  }

  return (
    <div className="p-6 text-black bg-white">
      <div className="text-2xl font-bold mb-6 text-center">Agent Details</div>
      <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.length === 0 ? (
            <tr>
              <td colSpan={7} className="border border-gray-300 px-4 py-2 text-center">
                No agents found
              </td>
            </tr>
          ) : (
            agents.map((agent) => (
              <tr key={agent.email} className="text-center hover:bg-gray-50 text-black font-medium">
                <td className="border border-gray-300 px-4 py-2">{agent.firstName || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{agent.email || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{agent.role || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{agent.localDate || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{agent.phone || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{agent.address || "N/A"}</td>
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AgentDataComponent;