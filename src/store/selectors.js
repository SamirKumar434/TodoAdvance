// Basic selectors
export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
export const selectIsAddingTodo = (state) => state.todos.isAddingTodo;
export const selectActiveTab = (state) => state.todos.activeTab;
export const selectCategoryFilter = (state) => state.todos.categoryFilter;
export const selectDarkMode = (state) => state.todos.darkMode; // NEW

export const selectTodosByCategory = (state) => {
  const todos = selectTodos(state);
  const categoryFilter = selectCategoryFilter(state);
  if (categoryFilter === 'all') return todos;
  return todos.filter(todo => todo.category === categoryFilter);
};

export const selectFilteredTodos = (state) => {
  const todos = selectTodosByCategory(state);
  const filter = selectFilter(state);
  switch (filter) {
    case "active": return todos.filter((todo) => !todo.completed);
    case "completed": return todos.filter((todo) => todo.completed);
    default: return todos;
  }
};

export const selectTodosStats = (state) => {
  const todos = selectTodos(state);
  const activeTab = selectActiveTab(state);
  const categoryTodos = activeTab === 'all' ? todos : todos.filter(todo => todo.category === activeTab);
  const total = categoryTodos.length;
  const completed = categoryTodos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const workTodos = todos.filter(todo => todo.category === 'work');
  const personalTodos = todos.filter(todo => todo.category === 'personal');
  const workCompleted = workTodos.filter(todo => todo.completed).length;
  const personalCompleted = personalTodos.filter(todo => todo.completed).length;
  return {
    total, completed, active, completionPercentage,
    work: { total: workTodos.length, completed: workCompleted, percentage: workTodos.length > 0 ? Math.round((workCompleted / workTodos.length) * 100) : 0 },
    personal: { total: personalTodos.length, completed: personalCompleted, percentage: personalTodos.length > 0 ? Math.round((personalCompleted / personalTodos.length) * 100) : 0 }
  };
};