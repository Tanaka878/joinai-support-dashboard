'use client'
import React from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const fakeData = {
  tickets: [
    { name: "Alex", High: 45, Low: 35, Normal: 25, Urgent: 20 },
    { name: "Ben Newell", High: 40, Low: 30, Normal: 20, Urgent: 15 },
    { name: "Helena", High: 38, Low: 28, Normal: 18, Urgent: 12 },
    { name: "Luis", High: 42, Low: 32, Normal: 22, Urgent: 17 },
  ],
  agents: [
    {
      name: "Alex",
      photo: "/Images/pro pic.jpg",
      solvedPastWeek: 193,
      solvedPastMonth: 797,
      openTickets: 18,
      fcr: 82,
      oldestTickets: [
        { id: 385658, createdAt: "a day ago" },
        { id: 385659, createdAt: "a day ago" },
      ],
    },
    {
      name: "Ben",
      photo: "/Images/pro pic.jpg",
      solvedPastWeek: 175,
      solvedPastMonth: 824,
      openTickets: 5,
      fcr: 65,
      oldestTickets: [],
    },
    {
      name: "Helen",
      photo: "/Images/pro pic.jpg",
      solvedPastWeek: 172,
      solvedPastMonth: 803,
      openTickets: 12,
      fcr: 78,
      oldestTickets: [],
    },
    {
      name: "Luis",
      photo: "/Images/pro pic.jpg",
      solvedPastWeek: 182,
      solvedPastMonth: 783,
      openTickets: 2,
      fcr: 80,
      oldestTickets: [],
    },
  ],
};

const AgentPerformanceDashboard = () => {
  return (
    <div className="p-6 bg-white text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-3xl font-serif text-center">Agent Performance Dashboard</h1>
        </div>
        
        {/* Top Section with Chart */}
        <div className="mb-8 border border-gray-300 rounded p-4 bg-gray-50">
          <h2 className="text-xl font-serif mb-4 text-center border-b border-gray-300 pb-2">Ticket Updates - Past Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fakeData.tickets}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="High" fill="#4682B4" />
              <Bar dataKey="Low" fill="#6B8E23" />
              <Bar dataKey="Normal" fill="#B8860B" />
              <Bar dataKey="Urgent" fill="#8B0000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* FCR Rate Section */}
        <div className="mb-8 border border-gray-300 rounded p-4 bg-gray-50">
          <h2 className="text-xl font-serif mb-4 text-center border-b border-gray-300 pb-2">One-touch Ticket Resolution Rate (FCR)</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left">Agent</th>
                <th className="border border-gray-300 p-2 text-center">Photo</th>
                <th className="border border-gray-300 p-2 text-right">FCR Rate</th>
              </tr>
            </thead>
            <tbody>
              {fakeData.agents.map((agent) => (
                <tr key={agent.name} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{agent.name}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex justify-center">
                      <Image
                        width={32}
                        height={32}
                        src={agent.photo}
                        alt={agent.name}
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2 text-right font-mono">{agent.fcr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Agent Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fakeData.agents.map((agent) => (
            <div key={agent.name} className="border border-gray-300 rounded p-4 bg-gray-50">
              <div className="flex items-center border-b border-gray-300 pb-2 mb-4">
                <Image
                  width={48}
                  height={48}
                  src={agent.photo}
                  alt={agent.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <h2 className="text-xl font-serif">{agent.name}</h2>
              </div>
              
              <table className="w-full mb-4">
                <tbody>
                  <tr>
                    <td className="py-1 font-medium">Solved (7 days):</td>
                    <td className="py-1 text-right font-mono">{agent.solvedPastWeek}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Solved (30 days):</td>
                    <td className="py-1 text-right font-mono">{agent.solvedPastMonth}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Open tickets:</td>
                    <td className="py-1 text-right font-mono">{agent.openTickets}</td>
                  </tr>
                </tbody>
              </table>
              
              {agent.oldestTickets.length > 0 && (
                <div className="mt-2 border-t border-gray-300 pt-2">
                  <h3 className="font-medium mb-2">Oldest Assigned Tickets:</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-1 text-left">ID</th>
                        <th className="border border-gray-300 p-1 text-right">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agent.oldestTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-100">
                          <td className="border border-gray-300 p-1 font-mono">{ticket.id}</td>
                          <td className="border border-gray-300 p-1 text-right">{ticket.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-300 pt-4">
          Agent Performance Dashboard • Updated: April 11, 2025
        </div>
      </div>
    </div>
  );
};

export default AgentPerformanceDashboard;