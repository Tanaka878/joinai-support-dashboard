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
  Cell
} from "recharts";

const fakeData = {
  tickets: [
    { name: "Alex", High: 45, Low: 35, Normal: 25, Urgent: 20 },
    { name: "Ben Newell", High: 40, Low: 30, Normal: 20, Urgent: 15 },
    { name: "Helena", High: 38, Low: 28, Normal: 18, Urgent: 12 },
    { name: "Lus", High: 42, Low: 32, Normal: 22, Urgent: 17 },
    { name: "Beewell", High: 40, Low: 30, Normal: 20, Urgent: 15 },
    { name: "Hlena", High: 38, Low: 28, Normal: 18, Urgent: 12 },
    { name: "Lu", High: 42, Low: 32, Normal: 22, Urgent: 17 },

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

const COLORS = {
  High: '#FF6B6B',
  Low: '#4ECDC4',
  Normal: '#FFD166',
  Urgent: '#FF9F1C',
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#2B2D42',
  accent: '#4361EE'
};

const AgentPerformanceDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Agent Performance</h1>
          <p className="text-gray-500">Updated: April 11, 2025</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Agents</h3>
            <p className="text-3xl font-bold text-gray-900">{fakeData.agents.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. FCR Rate</h3>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round(fakeData.agents.reduce((acc, agent) => acc + agent.fcr, 0) / fakeData.agents.length)}%
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Weekly Tickets</h3>
            <p className="text-3xl font-bold text-gray-900">
              {fakeData.agents.reduce((acc, agent) => acc + agent.solvedPastWeek, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Open Tickets</h3>
            <p className="text-3xl font-bold text-gray-900">
              {fakeData.agents.reduce((acc, agent) => acc + agent.openTickets, 0)}
            </p>
          </div>
        </div>
        
        {/* Chart Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Ticket Priority Distribution</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">Week</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-md">Month</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-md">Quarter</button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fakeData.tickets}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                <Bar dataKey="High" fill={COLORS.High} radius={[4, 4, 0, 0]}>
                  {fakeData.tickets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.High} />
                  ))}
                </Bar>
                <Bar dataKey="Low" fill={COLORS.Low} radius={[4, 4, 0, 0]}>
                  {fakeData.tickets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.Low} />
                  ))}
                </Bar>
                <Bar dataKey="Normal" fill={COLORS.Normal} radius={[4, 4, 0, 0]}>
                  {fakeData.tickets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.Normal} />
                  ))}
                </Bar>
                <Bar dataKey="Urgent" fill={COLORS.Urgent} radius={[4, 4, 0, 0]}>
                  {fakeData.tickets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.Urgent} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* FCR Rate Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">First Contact Resolution (FCR) Rates</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Agent</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Photo</th>
                  <th className="pb-3 text-right text-sm font-medium text-gray-500">FCR Rate</th>
                  <th className="pb-3 text-right text-sm font-medium text-gray-500">Progress</th>
                </tr>
              </thead>
              <tbody>
                {fakeData.agents.map((agent) => (
                  <tr key={agent.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <Image
                          width={32}
                          height={32}
                          src={agent.photo}
                          alt={agent.name}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </td>
                    <td className="py-4 text-right text-sm font-mono font-medium text-gray-900">{agent.fcr}%</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end">
                        <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{
                              width: `${agent.fcr}%`,
                              backgroundColor: agent.fcr > 75 ? COLORS.High : agent.fcr > 50 ? COLORS.Normal : COLORS.Urgent
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Agent Cards */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agent Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {fakeData.agents.map((agent) => (
            <div key={agent.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <Image
                  width={48}
                  height={48}
                  src={agent.photo}
                  alt={agent.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                  <p className="text-sm text-gray-500">{agent.openTickets} open tickets</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Weekly</p>
                  <p className="text-xl font-bold text-gray-900">{agent.solvedPastWeek}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Monthly</p>
                  <p className="text-xl font-bold text-gray-900">{agent.solvedPastMonth}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">FCR</p>
                  <p className="text-xl font-bold" style={{
                    color: agent.fcr > 75 ? COLORS.High : agent.fcr > 50 ? COLORS.Normal : COLORS.Urgent
                  }}>{agent.fcr}%</p>
                </div>
              </div>
              
              
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
          © {new Date().getFullYear()} Agent Performance Dashboard
        </div>
      </div>
    </div>
  );
};

export default AgentPerformanceDashboard;