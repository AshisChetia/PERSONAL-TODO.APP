import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title,
        description,
        priority,
        dueDate
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setShowForm(false);
    }
  };

  return (
    <div className="todo-form">
      {!showForm ? (
        <button 
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add New Todo
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <input
              type="text"
              placeholder="What do you want to do?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input title-input"
              autoFocus
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Add description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input description-input"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority:</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date:</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-submit">Add Todo</button>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default TodoForm;
