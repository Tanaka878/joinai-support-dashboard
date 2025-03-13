import React from "react";

interface TicketStats {
  all: number;
  new: number;
  open: number;
  closed: number;
}

type FilterType = "all" | "new" | "open" | "closed";

interface TicketFilterProps {
  ticketStats: TicketStats;
  onFilterChange: (filter: FilterType) => void;
  selectedFilter: FilterType; // Updated to use the specific FilterType
}

const TicketFilter: React.FC<TicketFilterProps> = ({
  ticketStats,
  onFilterChange,
  selectedFilter,
}) => {
  const getButtonClass = (filter: FilterType) => {
    return `rounded-full border px-4 py-2 text-center cursor-pointer ${
      selectedFilter === filter
        ? "bg-amber-700 text-white"
        : "border-amber-700 text-black"
    }`;
  };

  return (
    <div className="flex gap-4 p-4 bg-gray-100 rounded-lg shadow-md text-black mb-2.5">
      <div
        className={getButtonClass("all")}
        onClick={() => onFilterChange("all")}
      >
        All Tickets: {ticketStats.all}
      </div>
      <div
        className={getButtonClass("new")}
        onClick={() => onFilterChange("new")}
      >
        New Tickets: {ticketStats.new}
      </div>
      <div
        className={getButtonClass("open")}
        onClick={() => onFilterChange("open")}
      >
        Open Tickets: {ticketStats.open}
      </div>
      <div
        className={getButtonClass("closed")}
        onClick={() => onFilterChange("closed")}
      >
        Closed Tickets: {ticketStats.closed}
      </div>
    </div>
  );
};

export default TicketFilter;
