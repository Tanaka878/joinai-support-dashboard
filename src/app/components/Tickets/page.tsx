import React, { useEffect, useState } from "react";
import TicketFilter from "../TicketFilterDisplay/page";
import BASE_URL from "@/app/config/api/api";

type Ticket = {
  id: string;
  category: string;
  status: "NEW" | "OPEN" | "CLOSED";
  subject: string;
  content: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  attachments: string[];
  createdAt: string;
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

  // Fetch tickets from backend
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
  }, []);

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

  // Filter and search tickets
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

  const updateTicketStatus = async (ticketId: string, newStatus: "NEW" | "OPEN" | "CLOSED") => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/admin/updateStatus/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Refresh the tickets list after update
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
      <h1 className="text-2xl font-bold mb-6 flex justify-center">Support Tickets</h1>

      <div className="mb-6 px-2 sm:px-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search tickets by subject, content, or category..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
        <div className="flex justify-center my-8">
          <p>Loading tickets...</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="flex justify-center my-8 p-4 bg-gray-100 rounded-lg">
          <p>No tickets match the selected filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((ticket) => (
            <div
              key={ticket.id}
              className="border p-4 rounded-lg shadow-md bg-white space-y-3 hover:shadow-lg transition-shadow"
            >
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </span>
              </div>
              <h2 className="font-bold text-lg">{ticket.subject}</h2>
              <p className="text-gray-600 line-clamp-2">{ticket.content}</p>
              <div className="flex justify-between items-center">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority}
                </div>
                <div className="text-gray-500 text-sm">
                  {formatDate(ticket.createdAt)}
                </div>
              </div>
              
              {/* Action buttons based on status */}
              <div className="flex space-x-2 mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => openModal(ticket)}
                >
                  View Details
                </button>
                
                {(ticket.status === "NEW" || ticket.status === "OPEN") && (
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => resolveTicket(ticket.id)}
                  >
                    Resolve
                  </button>
                )}
                
                {ticket.status === "CLOSED" && (
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    onClick={() => reopenTicket(ticket.id)}
                  >
                    Reopen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Modal with detailed ticket information */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Header with subject and status */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <h2 className="text-xl font-bold">{selectedTicket.subject}</h2>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  selectedTicket.status
                )}`}
              >
                {selectedTicket.status}
              </span>
            </div>
            
            {/* Ticket details */}
            <div className="space-y-4">
              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="font-mono text-sm">{selectedTicket.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p>{selectedTicket.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                      selectedTicket.priority
                    )}`}
                  >
                    {selectedTicket.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p>{selectedTicket.assignedTo || "Unassigned"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p>{formatDate(selectedTicket.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Updated</p>
                  <p>{formatDate(selectedTicket.updatedAt)}</p>
                </div>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedTicket.content}
                </div>
              </div>
              
              {/* Attachments */}
              {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Attachments</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    
                  </div>
                </div>
              )}

            <div>
              <input
                type="text"
                className="w-full h-10 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm"
                placeholder="Enter text here"
              />
            </div>

            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-2 mt-6">
              {(selectedTicket.status === "NEW" || selectedTicket.status === "OPEN") && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => resolveTicket(selectedTicket.id)}
                >
                  Resolve Ticket
                </button>
              )}
              
              {selectedTicket.status === "CLOSED" && (
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  onClick={() => reopenTicket(selectedTicket.id)}
                >
                  Reopen Ticket
                </button>
              )}
              
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;