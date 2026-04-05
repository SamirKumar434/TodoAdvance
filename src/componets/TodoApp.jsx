import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2, CheckCircle2, Sun, Moon } from 'lucide-react';
import CategoryTabs from './CategoryTab';
import TodoFilters from './TodoFilters';
import TodoForm from './TodoForm';
import TodoItem from './TodoItems';
import {
  selectFilter, selectFilteredTodos, selectTodosStats,
  selectIsAddingTodo, selectActiveTab, selectDarkMode
} from '../store/selectors';
import { setIsAddingTodo, clearCompleted, toggleAll, toggleDarkMode } from '../store/todoSlice';

function TodoApp() {
  const dispatch = useDispatch();
  const stats = useSelector(selectTodosStats);
  const filteredTodos = useSelector(selectFilteredTodos);
  const filter = useSelector(selectFilter);
  const isAddingTodo = useSelector(selectIsAddingTodo);
  const activeTab = useSelector(selectActiveTab);
  const darkMode = useSelector(selectDarkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 sm:py-8 px-4 transition-colors duration-300'>
        <div className='max-w-3xl mx-auto'>

          {/* Header */}
          <div className='text-center mb-6 sm:mb-8 relative'>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2'>
              TodoFlow
            </h1>
            <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400'>
              Organize Your tasks smartly
            </p>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className='absolute right-0 top-1 p-2 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm transition-all duration-200'
              title='Toggle dark mode'
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Category Tabs */}
          <div className="mb-6 overflow-x-auto pb-2 sm:pb-0">
            <CategoryTabs />
          </div>

          {/* Stats Card */}
          <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 border border-gray-300 dark:border-gray-700 shadow-lg'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-white'>
                {activeTab === 'work' && 'Work Progress'}
                {activeTab === 'personal' && 'Personal Progress'}
                {activeTab === 'all' && 'Overall Progress'}
              </h2>
            </div>
            <div className='text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
              {stats.completionPercentage}%
            </div>
            <div className='w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3 mb-4'>
              <div
                className={`h-3 rounded-full transition-all duration-500 ease-out bg-gradient-to-r ${
                  activeTab === 'work' ? 'from-blue-500 to-blue-600' :
                  activeTab === 'personal' ? 'from-purple-500 to-purple-600' :
                  'from-green-500 to-green-600'
                }`}
                style={{ width: `${stats.completionPercentage}%` }}
              />
            </div>
            <div className='grid grid-cols-3 gap-2 sm:gap-4 text-center'>
              {[['Total', stats.total], ['Active', stats.active], ['Done', stats.completed]].map(([label, val]) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-700 sm:bg-transparent p-2 rounded-lg">
                  <div className='text-lg sm:text-2xl font-bold text-gray-800 dark:text-white'>{val}</div>
                  <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Main todo container */}
          <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg overflow-hidden'>
            {/* Action bar */}
            <div className='p-4 sm:p-6 border-b border-gray-300 dark:border-gray-700'>
              <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6'>
                <button
                  onClick={() => dispatch(setIsAddingTodo(true))}
                  className='flex items-center justify-center gap-2 bg-gray-800 dark:bg-gray-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors w-full sm:w-auto'
                >
                  <Plus size={20} /> Add Todo
                </button>

                {stats.total > 0 && (
                  <div className='flex flex-wrap items-center justify-center sm:justify-end gap-2'>
                    <button
                      onClick={() => dispatch(clearCompleted())}
                      className='flex flex-1 sm:flex-none items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200 text-xs sm:text-sm border border-red-100 dark:border-red-800 sm:border-transparent'
                    >
                      <Trash2 size={16} /> Clear
                    </button>
                    {stats.active > 0 && (
                      <button
                        onClick={() => dispatch(toggleAll())}
                        className='flex flex-1 sm:flex-none items-center justify-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 px-3 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors duration-200 text-xs sm:text-sm border border-green-100 dark:border-green-800 sm:border-transparent'
                      >
                        <CheckCircle2 size={16} /> Mark All
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-2">
                <TodoFilters currentFilter={filter} stats={stats} />
              </div>
            </div>

            {/* Todo Form */}
            {isAddingTodo && (
              <div className='p-4 sm:p-6 border-b border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50'>
                <TodoForm />
              </div>
            )}

            {/* Todo List */}
            <div className='max-h-[60vh] sm:max-h-96 overflow-y-auto'>
              {filteredTodos.length === 0 ? (
                <div className='text-center py-10 sm:py-12 px-4 text-gray-500 dark:text-gray-400'>
                  <p className='text-base sm:text-lg font-medium'>No todos found</p>
                  <p className='text-xs sm:text-sm mt-2 opacity-75'>
                    {activeTab === 'work' && 'Click "Add Todo" to create your first work task!'}
                    {activeTab === 'personal' && 'Click "Add Todo" to create your first personal task!'}
                    {activeTab === 'all' && 'Click "Add Todo" to create your first task!'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className='text-center mt-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-8'>
            <p>Stay organized and productive!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;