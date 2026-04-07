import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  // Fetch all todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    }
    setLoading(false);
  };

  // Handle add todo
  const handleAddTodo = async (todoData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add todo');
        return;
      }
      
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  // Handle update todo
  const handleUpdateTodo = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update todo');
        return;
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  // Handle delete todo
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete todo');
        return;
      }
      
      setTodos(todos.filter(todo => todo._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  // Handle toggle completion
  const handleToggleComplete = (id) => {
    const todo = todos.find(t => t._id === id);
    handleUpdateTodo(id, { completed: !todo.completed });
  };

  // Handle add sub-todo
  const handleAddSubTodo = async (todoId, subTodoData) => {
    try {
      const response = await fetch(`${API_URL}/${todoId}/subtodos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subTodoData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add sub-todo');
        return;
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === todoId ? updatedTodo : todo));
      setError(null);
    } catch (err) {
      setError('Failed to add sub-todo');
      console.error(err);
    }
  };

  // Handle update sub-todo
  const handleUpdateSubTodo = async (todoId, subTodoId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${todoId}/subtodos/${subTodoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update sub-todo');
        return;
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === todoId ? updatedTodo : todo));
      setError(null);
    } catch (err) {
      setError('Failed to update sub-todo');
      console.error(err);
    }
  };

  // Handle delete sub-todo
  const handleDeleteSubTodo = async (todoId, subTodoId) => {
    try {
      const response = await fetch(`${API_URL}/${todoId}/subtodos/${subTodoId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete sub-todo');
        return;
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === todoId ? updatedTodo : todo));
      setError(null);
    } catch (err) {
      setError('Failed to delete sub-todo');
      console.error(err);
    }
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📝 Todo Master</h1>
          <p>Organize your tasks step by step</p>
        </header>

        {error && <div className="error-message">{error}</div>}

        <TodoForm onAdd={handleAddTodo} />

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({todos.filter(t => !t.completed).length})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({todos.filter(t => t.completed).length})
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>📭 No todos yet. Create one to get started!</p>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
            onAddSubTodo={handleAddSubTodo}
            onUpdateSubTodo={handleUpdateSubTodo}
            onDeleteSubTodo={handleDeleteSubTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
