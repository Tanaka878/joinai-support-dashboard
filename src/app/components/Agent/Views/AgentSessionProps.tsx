'use client';

import React from 'react';

type AgentSessionStatsProps = {
  status: 'Available' | 'Busy' | 'Away' | 'Offline';
  ticketsAssigned: number;
  ticketsResolved: number;
  ticketsPending: number;
  avgResponseTime: string;
};

const statusColors: Record<string, string> = {
  Available: 'bg-green-500',
  Busy: 'bg-yellow-500',
  Away: 'bg-orange-500',
  Offline: 'bg-gray-400',
};

export default function AgentSessionStatsCard({
  status,
  ticketsAssigned,
  ticketsResolved,
  ticketsPending,
  avgResponseTime,
}: AgentSessionStatsProps) {
  const efficiency =
    ticketsAssigned > 0 ? ((ticketsResolved / ticketsAssigned) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 max-w-full w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Agent Session Stats</h2>
        <span className={`text-white text-sm px-3 py-1 rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700 text-sm">
        <div>
          <p className="text-gray-500">Tickets Assigned</p>
          <p className="text-lg font-medium">{ticketsAssigned}</p>
        </div>
        <div>
          <p className="text-gray-500">Tickets Resolved</p>
          <p className="text-lg font-medium">{ticketsResolved}</p>
        </div>
        <div>
          <p className="text-gray-500">Tickets Pending</p>
          <p className="text-lg font-medium">{ticketsPending}</p>
        </div>
        <div>
          <p className="text-gray-500">Avg. Response Time</p>
          <p className="text-lg font-medium">{avgResponseTime}</p>
        </div>
        <div className="col-span-2 sm:col-span-3">
          <p className="text-gray-500 mb-1">Resolution Efficiency</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${efficiency}%` }}
            />
          </div>
          <p className="text-sm mt-1 text-gray-600">{efficiency}%</p>
        </div>
      </div>
    </div>
  );
}
