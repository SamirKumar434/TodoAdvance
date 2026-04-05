import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Check, X, Briefcase, User } from 'lucide-react';
import { addTodo, setIsAddingTodo } from '../store/todoSlice';

function TodoForm() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('work');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim(), category));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="space-y-4">
        {/* Category Selection */}
        <div className="flex gap-3 p-1 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
          {[
            { val: 'work', label: 'Work', Icon: Briefcase, active: 'bg-blue-600 text-white shadow-md shadow-blue-100' },
            { val: 'personal', label: 'Personal', Icon: User, active: 'bg-purple-600 text-white shadow-md shadow-purple-100' }
          ].map(({ val, label, Icon, active }) => (
            <button
              key={val}
              type="button"
              onClick={() => setCategory(val)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                category === val ? active : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Icon size={18} strokeWidth={category === val ? 2.5 : 2} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`flex-1 px-4 py-3.5 border-2 rounded-xl outline-none transition-all duration-200 
              bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              border-gray-100 dark:border-gray-600
              ${category === 'work' ? 'focus:border-blue-400' : 'focus:border-purple-400'}
              focus:ring-4 ${category === 'work' ? 'focus:ring-blue-50 dark:focus:ring-blue-900/30' : 'focus:ring-purple-50 dark:focus:ring-purple-900/30'}
            `}
            placeholder={`What needs to be done in ${category}?`}
            maxLength={500}
            autoFocus
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:text-gray-400 text-white rounded-xl shadow-lg shadow-green-100 transition-all active:scale-95 disabled:scale-100"
          >
            <Check size={22} strokeWidth={3} />
          </button>
          <button
            type="button"
            onClick={() => dispatch(setIsAddingTodo(false))}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 text-gray-400 hover:text-red-500 hover:border-red-100 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all active:scale-95"
          >
            <X size={22} />
          </button>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;