
// TicketFilter.tsx
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
  selectedFilter: FilterType;
}

const TicketFilter: React.FC<TicketFilterProps> = ({
  ticketStats,
  onFilterChange,
  selectedFilter,
}) => {
  const getButtonClass = (filter: FilterType) => {
    const hasTickets = ticketStats[filter] > 0;
    return `rounded-full border px-3 py-2 text-center cursor-pointer transition-colors ${
      selectedFilter === filter
        ? "bg-amber-700 text-white"
        : hasTickets 
          ? "border-amber-700 text-gray-800 hover:bg-amber-100" 
          : "border-gray-300 text-gray-500"
    }`;
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 p-3 bg-gray-100 rounded-lg shadow-md text-black mb-2.5 w-full max-w-3xl justify-center">
      <div
        role="button"
        aria-pressed={selectedFilter === "all"}
        className={getButtonClass("all")}
        onClick={() => onFilterChange("all")}
      >
        All Tickets ({ticketStats.all})
      </div>
      <div
        role="button"
        aria-pressed={selectedFilter === "new"}
        className={getButtonClass("new")}
        onClick={() => onFilterChange("new")}
      >
        New ({ticketStats.new})
      </div>
      <div
        role="button"
        aria-pressed={selectedFilter === "open"}
        className={getButtonClass("open")}
        onClick={() => onFilterChange("open")}
      >
        Open ({ticketStats.open})
      </div>
      <div
        role="button"
        aria-pressed={selectedFilter === "closed"}
        className={getButtonClass("closed")}
        onClick={() => onFilterChange("closed")}
      >
        Closed ({ticketStats.closed})
      </div>
    </div>
  );
};

export default TicketFilter;
