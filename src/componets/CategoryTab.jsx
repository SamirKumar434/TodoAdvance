import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, User, LayoutDashboard } from 'lucide-react';
import { setActiveTab } from '../store/todoSlice';
import { selectActiveTab } from '../store/selectors';

function CategoryTabs() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  const tabs = [
    { id: 'work', label: 'Work', icon: Briefcase, color: 'blue' },
    { id: 'personal', label: 'Personal', icon: User, color: 'purple' },
    { id: 'all', label: 'All Tasks', icon: LayoutDashboard, color: 'slate' }
  ];

  return (
    <div className="flex gap-3 mb-8 p-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
      {tabs.map(({ id, label, icon: Icon, color }) => {
        const isActive = activeTab === id;
        const theme = {
          blue: {
            active: 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900 border-blue-600',
            inactive: 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-transparent'
          },
          purple: {
            active: 'bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900 border-purple-600',
            inactive: 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 border-transparent'
          },
          slate: {
            active: 'bg-slate-800 dark:bg-slate-600 text-white shadow-lg shadow-slate-200 dark:shadow-slate-900 border-slate-800',
            inactive: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border-transparent'
          }
        };

        return (
          <button
            key={id}
            onClick={() => dispatch(setActiveTab(id))}
            className={`
              flex-1 flex items-center justify-center gap-2.5 px-4 py-3.5
              rounded-xl font-semibold transition-all duration-300 ease-out border-2
              ${isActive ? theme[color].active : theme[color].inactive}
              ${!isActive && 'hover:-translate-y-0.5'}
            `}
          >
            <Icon size={19} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-pulse' : ''} />
            <span className="text-sm tracking-wide">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;