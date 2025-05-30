"use client";
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
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ChartOptionsType = ChartOptions<"bar">;

const AgentsStats = () => {
  // Data for hourly chart
  const hourlyChartData = {
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: [
      {
        label: "Tickets (%)",
        data: [3, 4, 4, 3.5, 3.5, 7, 14, 11, 5.5, 5, 4.5, 4.5, 4.5, 4, 3, 2.5, 2, 2, 2, 1.5, 1.5, 1.5, 2.5, 1],
        backgroundColor: "#dbce0f",
        borderWidth: 1,
      },
    ],
  };

  const hourlyChartOptions: ChartOptionsType = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 16,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        title: {
          display: true,
          text: "Hour of the Day",
        },
      },
    },
  };

  // Data for weekly chart
  const weeklyChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Tickets",
        data: [950, 3000, 4000, 3000, 2800, 2200, 800],
        backgroundColor: "#0000FF",
        borderWidth: 1,
      },
    ],
  };

  const weeklyChartOptions: ChartOptionsType = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} Tickets`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            const numericValue = Number(value); // Ensure the value is treated as a number
            return numericValue >= 1000 ? `${numericValue / 1000}K` : numericValue;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Day of the Week",
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-4 justify-around">JOINAI Support </h1>

      {/* Stat cards */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hourly Tickets Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Tickets Created by Hour</h2>
          <Bar data={hourlyChartData} options={hourlyChartOptions} />
        </div>

        {/* Weekly Tickets Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Average Tickets Created by Day of Week</h2>
          <Bar data={weeklyChartData} options={weeklyChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AgentsStats;
