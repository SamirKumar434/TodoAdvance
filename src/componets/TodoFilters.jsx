import { Check, List, Clock, CheckCircle } from "lucide-react";

function TodoFilters({ currentFilter, stats }) {
  const filters = [
    { key: "all", label: "All", icon: List, count: stats.total },
    { key: "active", label: "Active", icon: Clock, count: stats.active },
    { key: "completed", label: "Completed", icon: CheckCircle, count: stats.completed },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
        {filters.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              currentFilter === key
                ? 'bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
            <span>{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoFilters;