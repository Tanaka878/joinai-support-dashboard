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
};

type TicketStats = {
  all: number;
  new: number;
  open: number;
  closed: number;
};

const Tickets: React.FC = () => {
  const [ticketStats, setTicketStats] = useState<TicketStats>({
    all: 0,
    new: 0,
    open: 0,
    closed: 0,
  });

  const [filter, setFilter] = useState<"all" | "new" | "open" | "closed">("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const data: Ticket[] = [
    {
      id: "1",
      category: "Technical",
      status: "OPEN",
      subject: "musungaretanaka@gmail.com",
      content: "I'm facing the challenge of logging into my account",
      priority: "High",
      attachments: ["screenshot1.png", "error_log.txt"],
    },
    {
      id: "2",
      category: "Billing",
      status: "CLOSED",
      subject: "finance@example.com",
      content: "My invoice is incorrect and needs adjustment",
      priority: "Medium",
      attachments: [],
    },
    {
      id: "3",
      category: "Account",
      status: "NEW",
      subject: "user1234@example.com",
      content: "I need assistance updating my profile information",
      priority: "Low",
      attachments: ["profile_update_request.pdf"],
    },
  ];

  useEffect(() => {
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

    calculateTicketStats();
  }, []);

  const filteredData = data.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status.toLowerCase() === filter;
  });

  const openModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 flex justify-center">Tickets</h1>
      <div className="mt-4 px-6 flex justify-center">
        <TicketFilter
          ticketStats={ticketStats}
          onFilterChange={setFilter}
          selectedFilter={filter}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((ticket) => (
          <div
            key={ticket.id}
            className="border p-4 rounded-lg shadow-md bg-white space-y-2"
          >
            <h2 className="text-lg font-semibold">{ticket.category}</h2>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  ticket.status === "OPEN"
                    ? "bg-red-200 text-red-800"
                    : ticket.status === "CLOSED"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {ticket.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Priority:</span>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  ticket.priority === "Critical"
                    ? "bg-red-500 text-white"
                    : ticket.priority === "High"
                    ? "bg-red-300 text-black"
                    : ticket.priority === "Medium"
                    ? "bg-yellow-300 text-black"
                    : "bg-green-300 text-black"
                }`}
              >
                {ticket.priority}
              </span>
            </p>
            <p>
              <span className="font-semibold">Subject:</span> {ticket.subject}
            </p>
            <p>
              <span className="font-semibold">Content:</span> {ticket.content}
            </p>
            {ticket.attachments.length > 0 && (
              <div>
                <span className="font-semibold">Attachments:</span>
                <ul className="list-disc pl-5">
                  {ticket.attachments.map((attachment, index) => (
                    <li key={index}>{attachment}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => openModal(ticket)}
              >
                View
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => openModal(ticket)}
              >
                Resolve
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">{selectedTicket.category}</h2>
            <p>
              <span className="font-semibold">Status:</span> {selectedTicket.status}
            </p>
            <p>
              <span className="font-semibold">Priority:</span> {selectedTicket.priority}
            </p>
            <p>
              <span className="font-semibold">Subject:</span> {selectedTicket.subject}
            </p>
            <p>
              <span className="font-semibold">Content:</span> {selectedTicket.content}
            </p>
            {selectedTicket.attachments.length > 0 && (
              <div>
                <span className="font-semibold">Attachments:</span>
                <ul className="list-disc pl-5">
                  {selectedTicket.attachments.map((attachment, index) => (
                    <li key={index}>{attachment}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4 flex justify-end space-x-2">
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
