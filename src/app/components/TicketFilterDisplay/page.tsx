import React from 'react';

const TicketFilter = ({ ticketStats }) => {
  return (
    <div className="flex gap-4 p-4 bg-gray-100 rounded-lg shadow-md text-black mb-2.5">
      <div className="rounded-full border border-amber-700 px-4 py-2 text-center">
        All Tickets: {ticketStats.all}
      </div>
      <div className="rounded-full border border-amber-700 px-4 py-2 text-center">
        New Tickets: {ticketStats.new}
      </div>
      <div className="rounded-full border border-amber-700 px-4 py-2 text-center">
        Open Tickets: {ticketStats.open}
      </div>

      <div className="rounded-full border border-amber-700 px-4 py-2 text-center">
        Closed Tickets: {ticketStats.open}
      </div>
    </div>
  );
};

export default TicketFilter;
