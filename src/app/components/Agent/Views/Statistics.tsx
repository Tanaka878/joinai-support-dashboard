'use client';

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AgentSessionStatsCard from "./AgentSessionProps";// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const AgentsStats = () => {
 
  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-4">JOINAI Support</h1>

      {/* 👤 Agent Session Stats */}
      <AgentSessionStatsCard
        status="Available"
        ticketsAssigned={20}
        ticketsResolved={16}
        ticketsPending={4}
        avgResponseTime="12m 45s"
      />

      {/* 🧮 Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Created tickets", value: "3 072" },
          { label: "Unsolved tickets", value: "2 866" },
          { label: "Solved tickets", value: "5 511" },
          { label: "One-touch tickets", value: "3.0%" },
          { label: "Reopened tickets", value: "5%" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <div className="text-gray-600 mb-2">{stat.label}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      
       
    </div>
  );
};

export default AgentsStats;
