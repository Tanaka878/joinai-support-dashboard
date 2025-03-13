// Tickets.tsx
import React, { useEffect, useState } from "react";
import TicketFilter from "../TicketFilterDisplay/page";

type Ticket = {
  id: string;
  category: string;
  status: "NEW" | "OPEN" | "CLOSED";
  subject: string;
  content: string;
  priority: "Critical" | "High" | "Medium" | "Low";
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

  // Mock data - in a real app, this would come from an API
  const data: Ticket[] = [
    {
      id: "1",
      category: "Technical",
      status: "OPEN",
      subject: "musungaretanaka@gmail.com",
      content: "I'm facing the challenge of logging into my account",
      priority: "High",
      attachments: ["screenshot1.png", "error_log.txt"],
      createdAt: "2025-03-10T14:32:00Z",
      updatedAt: "2025-03-12T09:15:00Z",
      assignedTo: "John Doe",
    },
    {
      id: "2",
      category: "Billing",
      status: "CLOSED",
      subject: "finance@example.com",
      content: "My invoice is incorrect and needs adjustment",
      priority: "Medium",
      attachments: [],
      createdAt: "2025-03-08T10:45:00Z",
      updatedAt: "2025-03-11T16:20:00Z",
    },
    {
      id: "3",
      category: "Account",
      status: "NEW",
      subject: "user1234@example.com",
      content: "I need assistance updating my profile information",
      priority: "Low",
      attachments: ["profile_update_request.pdf"],
      createdAt: "2025-03-13T08:50:00Z",
      updatedAt: "2025-03-13T08:50:00Z",
    },
  ];

  useEffect(() => {
    // Simulate API load
    const loadData = async () => {
      setIsLoading(true);
      try {
        // In a real app, fetch data here
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        calculateTicketStats();
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const calculateTicketStats = () => {
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

  const filteredData = data.filter((ticket) => {
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

  const resolveTicket = (ticketId: string) => {
    // In a real app, this would be an API call
    // For this demo, we'll just log
    console.log(`Resolving ticket ${ticketId}`);
    
    // Close the modal if it's open
    if (isModalOpen) {
      closeModal();
    }
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
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">{ticket.category}</h2>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(ticket.status)}`}
                >
                  {ticket.status}
                </span>
              </div>

              <p>
                <span className="font-semibold">Priority:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-sm ${getPriorityColor(ticket.priority)}`}
                >
                  {ticket.priority}
                </span>
              </p>

              <p className="truncate">
                <span className="font-semibold">Subject:</span> {ticket.subject}
              </p>
              
              <p className="line-clamp-2">
                <span className="font-semibold">Content:</span> {ticket.content}
              </p>
              
              {ticket.assignedTo && (
                <p>
                  <span className="font-semibold">Assigned to:</span> {ticket.assignedTo}
                </p>
              )}
              
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Created:</span> {formatDate(ticket.createdAt)}
              </p>
              
              {ticket.attachments.length > 0 && (
                <div>
                  <span className="font-semibold">Attachments:</span> {ticket.attachments.length}
                </div>
              )}
              
              <div className="flex space-x-2 pt-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex-1 transition-colors"
                  onClick={() => openModal(ticket)}
                >
                  View Details
                </button>
                {ticket.status !== "CLOSED" && (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex-1 transition-colors"
                    onClick={() => resolveTicket(ticket.id)}
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedTicket.category}</h2>
              <span
                className={`px-2 py-1 rounded ${getStatusColor(selectedTicket.status)}`}
              >
                {selectedTicket.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Priority:</span>{" "}
                <span
                  className={`px-2 py-1 rounded ${getPriorityColor(selectedTicket.priority)}`}
                >
                  {selectedTicket.priority}
                </span>
              </p>
              
              <p>
                <span className="font-semibold">Subject:</span> {selectedTicket.subject}
              </p>
              
              <p>
                <span className="font-semibold">Content:</span> {selectedTicket.content}
              </p>
              
              {selectedTicket.assignedTo && (
                <p>
                  <span className="font-semibold">Assigned to:</span> {selectedTicket.assignedTo}
                </p>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Created:</span><br />
                  {formatDate(selectedTicket.createdAt)}
                </p>
                <p>
                  <span className="font-semibold">Last Updated:</span><br />
                  {formatDate(selectedTicket.updatedAt)}
                </p>
              </div>
              
              {selectedTicket.attachments.length > 0 && (
                <div>
                  <span className="font-semibold">Attachments:</span>
                  <ul className="list-disc pl-5 mt-2">
                    {selectedTicket.attachments.map((attachment, index) => (
                      <li key={index}>
                        <a 
                          href="#" 
                          className="text-blue-500 hover:underline"
                          onClick={(e) => e.preventDefault()}
                        >
                          {attachment}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h3 className="font-semibold mb-2">Add Reply</h3>
                <textarea 
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="Type your response here..."
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded">
                    Attach File
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              {selectedTicket.status !== "CLOSED" && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => resolveTicket(selectedTicket.id)}
                >
                  Resolve Ticket
                </button>
              )}
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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