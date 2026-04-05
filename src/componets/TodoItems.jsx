import { useState } from "react";
import { useDispatch } from "react-redux";
import { Check, Calendar, Edit3, Trash2, X, Save, Briefcase, User } from "lucide-react";
import { toggleTodo, deleteTodo, updateTodo } from "../store/todoSlice";

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const dispatch = useDispatch();

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const handleUpdate = () => {
    if (editText.trim() && editText !== todo.text) dispatch(updateTodo({ id: todo.id, text: editText.trim() }));
    setIsEditing(false);
  };

  const handleCancel = () => { setEditText(todo.text); setIsEditing(false); };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleUpdate();
    else if (e.key === 'Escape') handleCancel();
  };

  const categoryStyle = todo.category === 'work'
    ? { badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300', icon: <Briefcase size={12} />, border: 'hover:border-blue-300' }
    : { badge: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300', icon: <User size={12} />, border: 'hover:border-purple-300' };

  return (
    // ✅ Removed 'dark:bg-gray-800' from the non-completed branch
    <div className={`group p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 border-b border-gray-200 dark:border-gray-700 ${
      todo.completed ? 'bg-gray-50 dark:bg-gray-800/50' : ''
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => dispatch(toggleTodo(todo.id))}
          className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
            todo.completed ? 'bg-green-500 border-green-500' : `border-gray-400 dark:border-gray-500 ${categoryStyle.border}`
          }`}
        >
          {todo.completed && <Check size={14} className="text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                autoFocus
                maxLength={500}
              />
              <button onClick={handleUpdate} className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"><Save size={18} /></button>
              <button onClick={handleCancel} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"><X size={18} /></button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <div className={`text-gray-800 dark:text-gray-100 leading-relaxed ${todo.completed ? 'line-through text-gray-500 dark:text-gray-500' : ''}`}>
                  {todo.text}
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryStyle.badge}`}>
                  {categoryStyle.icon}
                  <span className="capitalize">{todo.category}</span>
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1"><Calendar size={12} /><span>Created {formatDate(todo.createdAt)}</span></div>
                {todo.updatedAt !== todo.createdAt && <span>Updated {formatDate(todo.updatedAt)}</span>}
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button onClick={() => setIsEditing(true)} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all"><Edit3 size={16} /></button>
            <button onClick={() => dispatch(deleteTodo(todo.id))} className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"><Trash2 size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoItem;