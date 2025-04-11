'use client'
import BASE_URL from '@/app/config/api/api';
import React, { useEffect, useState } from 'react';
import { AlertCircle, Clock, Filter, RefreshCw, Tag } from 'lucide-react';

interface SupportTicket {
  id: number;
  subject: string | null;
  priority: string | null;
  content: string | null;
  status: string | null;
  category: string | null;
  launchTimestamp: string | null;
  updatedAt: string | null;
}

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    const email = localStorage.getItem('email');

    if (!email) {
      setError('Admin email not found in localStorage');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/admin/getAllTickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      const data: SupportTicket[] = await response.json();
      setTickets(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string | null): string => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string | null): string => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-purple-100 text-purple-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Invalid date'
      : new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(date);
  };

  const getTimeSince = (dateString: string | null): string => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Unknown';

    const diffMs = Date.now() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours < 24
      ? `${Math.floor(diffHours)}h ago`
      : `${Math.floor(diffHours / 24)}d ago`;
  };

  const filteredTickets = filter === 'all' 
    ? tickets 
    : tickets.filter((ticket) => ticket.status?.toLowerCase() === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <RefreshCw className="animate-spin h-8 w-8 text-blue-500 mb-4" />
          <p className="text-gray-600">Loading tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-red-800">Error Loading Tickets</h3>
          </div>
          <p className="text-red-700">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            onClick={fetchTickets}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Support Tickets</h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-white rounded-lg shadow px-3 py-2">
            <Filter className="h-4 w-4 text-gray-400 mr-2" />
            <select
              className="text-sm text-gray-600 bg-transparent focus:outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tickets</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <button
            onClick={fetchTickets}
            className="flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No tickets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {ticket.subject || 'Untitled Ticket'}
                  </h2>
                  <span className="text-xs text-gray-500">#{ticket.id}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority || 'No Priority'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status || 'Status Unknown'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {ticket.content || 'No description provided'}
                </p>
                <div className="flex flex-wrap items-center text-xs text-gray-500 mt-4">
                  <div className="flex items-center mr-4 mb-2">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>{ticket.category || 'Uncategorized'}</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2" title={formatDate(ticket.launchTimestamp)}>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Created {getTimeSince(ticket.launchTimestamp)}</span>
                  </div>
                  <div className="flex items-center mb-2" title={formatDate(ticket.updatedAt)}>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Updated {getTimeSince(ticket.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500 text-right">
        {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''} found
      </div>
    </div>
  );
};

export default TicketList;
