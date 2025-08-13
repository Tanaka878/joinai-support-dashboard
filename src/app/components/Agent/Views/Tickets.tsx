'use client'
import React, { useEffect, useState } from "react";
import BASE_URL from "@/app/config/api/api";
import TicketFilter from "./TicketFilter";

type Ticket = {
  id: string;
  category: string;
  status: "NEW" | "OPEN" | "CLOSED";
  subject: string;
  content: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  attachments: string[];
  launchTimestamp: string;
  updatedAt: string;
  assignedTo?: string;
};

type TicketStats = {
  all: number;
  new: number;
  open: number;
  closed: number;
};

type FilterType = "all" | "new" | "open" | "closed";

const Tickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketStats, setTicketStats] = useState<TicketStats>({
    all: 0,
    new: 0,
    open: 0,
    closed: 0,
  });
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState("")
  const [comment, setComment] = useState("");




  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Ticket[] = await response.json();
      setTickets(data);
      calculateTicketStats(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [0]);

  // Calculate ticket stats
  const calculateTicketStats = (data: Ticket[]) => {
    const allTickets = data.length;
    const newTickets = data.filter((ticket) => ticket.status === "NEW").length;
    const openTickets = data.filter((ticket) => ticket.status === "OPEN").length;
    const closedTickets = data.filter((ticket) => ticket.status === "CLOSED").length;

    setTicketStats({
      all: allTickets,
      new: newTickets,
      open: openTickets,
      closed: closedTickets,
    });
  };

  const filteredData = tickets.filter((ticket) => {
    const matchesFilter = filter === "all" || ticket.status.toLowerCase() === filter;
    const matchesSearch =
      searchTerm === "" ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

 
    useEffect(() => {
      const token = localStorage.getItem("email") ?? "";
      setAuthToken(token)
    }, []); 
  
  


  const updateTicketStatus = async (ticketId: string, newStatus: "NEW" | "OPEN" | "CLOSED") => {
    const updateData ={
      status:newStatus,
      token:authToken,
      ticketId:ticketId,
      reply :comment
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/ticket/updateTicket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      fetchTickets();
      
      if (isModalOpen) {
        closeModal();
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resolveTicket = (ticketId: string) => {
    updateTicketStatus(ticketId, "CLOSED");
  };

  const reopenTicket = (ticketId: string) => {
    updateTicketStatus(ticketId, "OPEN");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500 text-white";
      case "High":
        return "bg-red-300 text-black";
      case "Medium":
        return "bg-yellow-300 text-black";
      case "Low":
        return "bg-green-300 text-black";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-red-200 text-red-800";
      case "CLOSED":
        return "bg-green-200 text-green-800";
      case "NEW":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Support Tickets</h1>

      <div className="mb-8 px-2 sm:px-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tickets by subject, content, or category..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-center overflow-x-auto">
          <TicketFilter
            ticketStats={ticketStats}
            onFilterChange={setFilter}
            selectedFilter={filter}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading tickets...</p>
          </div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="flex justify-center my-12">
          <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No tickets match the selected filter</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredData.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  {/* Main ticket info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                      {ticket.subject}
                    </h2>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Category:</span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {ticket.category}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Created:</span>
                        <span>{formatDate(ticket.launchTimestamp)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">ID:</span>
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {ticket.id}
                        </span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                      onClick={() => openModal(ticket)}
                    >
                      View Details
                    </button>
                    {(ticket.status === "NEW" || ticket.status === "OPEN") && (
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                        onClick={() => resolveTicket(ticket.id)}
                      >
                        Resolve
                      </button>
                    )}
                    {ticket.status === "CLOSED" && (
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                        onClick={() => reopenTicket(ticket.id)}
                      >
                        Reopen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-xl border-b border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 pr-4">
                    {selectedTicket.subject}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        selectedTicket.status
                      )}`}
                    >
                      {selectedTicket.status}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        selectedTicket.priority
                      )}`}
                    >
                      {selectedTicket.priority}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {/* Ticket Metadata */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Ticket ID</p>
                  <p className="font-mono text-sm bg-white px-2 py-1 rounded border">
                    {selectedTicket.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Category</p>
                  <p className="bg-white px-2 py-1 rounded border">
                    {selectedTicket.category}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Assigned To</p>
                  <p className="bg-white px-2 py-1 rounded border">
                    {selectedTicket.assignedTo || "Unassigned"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Created</p>
                  <p className="bg-white px-2 py-1 rounded border">
                    {formatDate(selectedTicket.launchTimestamp)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Last Updated</p>
                  <p className="bg-white px-2 py-1 rounded border">
                    {formatDate(selectedTicket.updatedAt)}
                  </p>
                </div>
              </div>
              
              {/* Ticket Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <div className="bg-gray-50 p-4 rounded-lg border min-h-[100px]">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedTicket.content}
                  </p>
                </div>
              </div>
              
              {/* Attachments Section */}
              {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Attachments</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-gray-500 text-sm">Attachments will be displayed here</p>
                  </div>
                </div>
              )}

              {/* Comment/Reply Section */}
                <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Comment</h3>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  rows={3}
                  placeholder="Add a comment or update..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                </div>
            </div>
            
            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 rounded-b-xl border-t border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {(selectedTicket.status === "NEW" || selectedTicket.status === "OPEN") && (
                    <button
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                      onClick={() => resolveTicket(selectedTicket.id)}
                    >
                      Resolve Ticket
                    </button>
                  )}
                  
                  {selectedTicket.status === "CLOSED" && (
                    <button
                      className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                      onClick={() => reopenTicket(selectedTicket.id)}
                    >
                      Reopen Ticket
                    </button>
                  )}
                </div>
                
                <button
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;