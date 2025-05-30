'use client'
import React, { useEffect, useState } from "react";
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
import BASE_URL from "@/app/config/api/api";

interface SystemAnalytics {
  openTickets: number;
  totalAgents: number;
  dailyTickets: number;
  weeklyTickets?: number; // New field you added
  monthlyTickets?: number; // New field you added
  performance: PerformanceDTO[];
  tickets: Ticket[];
}

interface Ticket {
  name: string;
  high: number;
  low: number;
  normal: number;
  urgent: number;
}

interface PerformanceDTO {
  agentName: string;
  photo: string; // Now available
  openTickets: number;
  oldTickets: number;
  frc: number;
  solvedPastWeek: number; // Now available
  solvedPastMonth: number; // Now available
  oldestTickets?: Ticket[]; // Optional
}

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
  const [analyticsData, setAnalyticsData] = useState<SystemAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'quarter'>('week');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/getAnalytics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timePeriod]);

  if (loading) return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 text-center text-red-500 min-h-screen flex items-center justify-center">
      <div>
        <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
  
  if (!analyticsData) return (
    <div className="p-6 text-center min-h-screen flex items-center justify-center">
      <div>
        <h2 className="text-2xl font-bold mb-2">No Data Available</h2>
        <p>No analytics data could be loaded</p>
      </div>
    </div>
  );

  // Calculate metrics
  const avgFcr = analyticsData.performance.length > 0 
    ? Math.round(analyticsData.performance.reduce((acc, agent) => acc + agent.frc, 0) / analyticsData.performance.length)
    : 0;

  const totalWeeklyTickets = analyticsData.weeklyTickets || 
    analyticsData.performance.reduce((acc, agent) => acc + agent.solvedPastWeek, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Agent Performance</h1>
          <p className="text-gray-500">Updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Agents</h3>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.totalAgents}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. FCR Rate</h3>
            <p className="text-3xl font-bold text-gray-900">{avgFcr}%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">{timePeriod === 'week' ? 'Weekly' : timePeriod === 'month' ? 'Monthly' : 'Quarterly'} Tickets</h3>
            <p className="text-3xl font-bold text-gray-900">
              {timePeriod === 'week' ? totalWeeklyTickets : 
               timePeriod === 'month' ? analyticsData.monthlyTickets : 
               'N/A'}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Open Tickets</h3>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.openTickets}</p>
          </div>
        </div>
        
        {/* Chart Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Ticket Priority Distribution</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimePeriod('week')}
                className={`px-3 py-1 text-sm rounded-md ${
                  timePeriod === 'week' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimePeriod('month')}
                className={`px-3 py-1 text-sm rounded-md ${
                  timePeriod === 'month' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setTimePeriod('quarter')}
                className={`px-3 py-1 text-sm rounded-md ${
                  timePeriod === 'quarter' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Quarter
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.tickets}>
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
                <Bar dataKey="high" name="High" fill={COLORS.High} radius={[4, 4, 0, 0]}>
                  {analyticsData.tickets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.High} />
                  ))}
                </Bar>
                <Bar dataKey="low" name="Low" fill={COLORS.Low} radius={[4, 4, 0, 0]}>
                  {analyticsData.tickets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.Low} />
                  ))}
                </Bar>
                <Bar dataKey="normal" name="Normal" fill={COLORS.Normal} radius={[4, 4, 0, 0]}>
                  {analyticsData.tickets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.Normal} />
                  ))}
                </Bar>
                <Bar dataKey="urgent" name="Urgent" fill={COLORS.Urgent} radius={[4, 4, 0, 0]}>
                  {analyticsData.tickets.map((entry, index) => (
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
                  <th className="pb-3 text-right text-sm font-medium text-gray-500">Open Tickets</th>
                  <th className="pb-3 text-right text-sm font-medium text-gray-500">Progress</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.performance.map((agent) => (
                  <tr key={agent.agentName} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="py-4 text-sm font-medium text-gray-900">{agent.agentName}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <Image
                          width={32}
                          height={32}
                          src={agent.photo}
                          alt={agent.agentName}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </td>
                    <td className="py-4 text-right text-sm font-mono font-medium text-gray-900">{agent.frc}%</td>
                    <td className="py-4 text-right text-sm font-mono font-medium text-gray-900">{agent.openTickets}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end">
                        <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{
                              width: `${agent.frc}%`,
                              backgroundColor: agent.frc > 75 ? COLORS.High : agent.frc > 50 ? COLORS.Normal : COLORS.Urgent
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {analyticsData.performance.map((agent) => (
            <div key={agent.agentName} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <Image
                  width={48}
                  height={48}
                  src={agent.photo}
                  alt={agent.agentName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{agent.agentName}</h3>
                  <p className="text-sm text-gray-500">{agent.openTickets} open tickets • {agent.oldTickets} old tickets</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Weekly Solved</p>
                  <p className="text-xl font-bold text-gray-900">
                    {agent.solvedPastWeek}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Monthly Solved</p>
                  <p className="text-xl font-bold text-gray-900">
                    {agent.solvedPastMonth}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">FCR Rate</p>
                  <p className="text-xl font-bold" style={{
                    color: agent.frc > 75 ? COLORS.High : agent.frc > 50 ? COLORS.Normal : COLORS.Urgent
                  }}>{agent.frc}%</p>
                </div>
              </div>
              
              {agent.oldestTickets && agent.oldestTickets.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Oldest Tickets</h4>
                  <ul className="space-y-1">
                    {agent.oldestTickets.slice(0, 3).map((ticket, index) => (
                      <li key={index} className="text-sm text-gray-700 flex justify-between">
                        <span>{ticket.name}</span>
                        <span className="font-medium" style={{
                          color: ticket.urgent > 0 ? COLORS.Urgent :
                                 ticket.high > 0 ? COLORS.High :
                                 ticket.normal > 0 ? COLORS.Normal : COLORS.Low
                        }}>
                          {ticket.urgent > 0 ? 'urgent' :
                           ticket.high > 0 ? 'high' :
                           ticket.normal > 0 ? 'normal' : 'low'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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