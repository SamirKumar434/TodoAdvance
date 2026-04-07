import { Provider } from 'react-redux';
import { store } from './store/store';
import TodoApp from './componets/TodoApp'; // Double-check this folder name (componets vs components)
import './App.css';

function App() {
  return (
    <Provider store={store}>
      {/* Standard light background. 
          The 'dark' class logic has been removed from the component and the document.
      */}
      <div className="min-h-screen bg-gray-50">
        <TodoApp />
      </div>
    </Provider>
  );
}

export default App;