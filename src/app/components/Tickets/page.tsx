import React from "react";

const Tickets = () => {
  const data = [
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
    {
      id: "4",
      category: "Technical",
      status: "OPEN",
      subject: "supportteam@example.com",
      content: "The system crashes when I upload files larger than 10MB",
      priority: "Critical",
      attachments: ["crash_report.json", "upload_test_file.zip"],
    },
    {
      id: "5",
      category: "Sales",
      status: "NEW",
      subject: "salesqueries@example.com",
      content: "I would like more details about your product pricing",
      priority: "Low",
      attachments: [],
    },
    {
      id: "6",
      category: "Technical",
      status: "CLOSED",
      subject: "techsupport@example.com",
      content: "The issue with the server timeout has been resolved",
      priority: "Medium",
      attachments: ["resolution_steps.docx"],
    },
    {
      id: "7",
      category: "Account",
      status: "OPEN",
      subject: "user5678@example.com",
      content: "I'm unable to reset my password despite following the instructions",
      priority: "High",
      attachments: ["password_reset_error.png"],
    },
    {
      id: "8",
      category: "Billing",
      status: "CLOSED",
      subject: "billingteam@example.com",
      content: "I was charged twice for the same transaction",
      priority: "High",
      attachments: ["transaction_details.pdf"],
    },
    {
      id: "9",
      category: "Technical",
      status: "OPEN",
      subject: "developer@example.com",
      content: "The API documentation was missing endpoint details",
      priority: "Low",
      attachments: ["api_feedback.docx"],
    },
    {
      id: "10",
      category: "Sales",
      status: "NEW",
      subject: "clientrequests@example.com",
      content: "Can you provide a demo of your software?",
      priority: "Medium",
      attachments: ["demo_request_form.pdf"],
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 flex justify-center">Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((ticket) => (
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
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                View
              </button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                Close
              </button>
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Resolve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
