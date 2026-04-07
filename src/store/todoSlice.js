import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "all",
  categoryFilter: "all",
  isAddingTodo: false,
  activeTab: "work",
  darkMode: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setIsAddingTodo: (state, action) => { state.isAddingTodo = action.payload; },
    setFilter: (state, action) => { state.filter = action.payload; },
    setCategoryFilter: (state, action) => { state.categoryFilter = action.payload; },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.categoryFilter = action.payload;
    },
    toggleDarkMode: (state) => { state.darkMode = !state.darkMode; },

    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
        state.isAddingTodo = false;
      },
      prepare: (text, category) => ({
        payload: {
          id: nanoid(),
          text,
          category,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      })
    },

    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) { todo.completed = !todo.completed; todo.updatedAt = new Date().toISOString(); }
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find(todo => todo.id === id);
      if (todo) { todo.text = text; todo.updatedAt = new Date().toISOString(); }
    },
    clearCompleted: (state) => { state.items = state.items.filter(todo => !todo.completed); },
    toggleAll: (state) => {
      const allCompleted = state.items.every(todo => todo.completed);
      state.items.forEach(todo => { todo.completed = !allCompleted; todo.updatedAt = new Date().toISOString(); });
    }
  },
});

export const {
  setIsAddingTodo, setFilter, setCategoryFilter, setActiveTab,
  toggleDarkMode, addTodo, deleteTodo, toggleTodo, updateTodo,
  clearCompleted, toggleAll
} = todoSlice.actions;

export default todoSlice.reducer;