import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onUpdate, onAddSubTodo, onUpdateSubTodo, onDeleteSubTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedPriority, setEditedPriority] = useState(todo.priority);
  
  const [showSubTodos, setShowSubTodos] = useState(true);
  const [isAddingSubTodo, setIsAddingSubTodo] = useState(false);
  const [subTodoTitle, setSubTodoTitle] = useState('');

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdate(todo._id, {
        title: editedTitle,
        description: editedDescription,
        priority: editedPriority
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setEditedPriority(todo.priority);
    setIsEditing(false);
  };

  const handleAddSubTodo = () => {
    if (subTodoTitle.trim()) {
      console.log('Adding sub-todo with title:', subTodoTitle);
      onAddSubTodo(todo._id, {
        title: subTodoTitle,
        description: '',
        priority: 'medium'
      });
      setSubTodoTitle('');
      setIsAddingSubTodo(false);
    } else {
      console.log('Sub-todo title is empty');
    }
  };

  const handleToggleSubTodo = (subTodoId) => {
    const subTodo = (todo.subTodos || []).find(st => st._id === subTodoId);
    if (subTodo) {
      onUpdateSubTodo(todo._id, subTodoId, { completed: !subTodo.completed });
    }
  };

  const priorityEmoji = {
    low: '🟢',
    medium: '🟡',
    high: '🔴'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const completedSubTodos = (todo.subTodos || [])?.filter(st => st.completed)?.length || 0;
  const totalSubTodos = (todo.subTodos || [])?.length || 0;

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {!isEditing ? (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo._id)}
              className="todo-checkbox"
            />
            <div className="todo-text">
              <h3 className="todo-title">{todo.title}</h3>
              {todo.description && <p className="todo-description">{todo.description}</p>}
              <div className="todo-meta">
                <span className="priority-badge">{priorityEmoji[todo.priority]} {todo.priority}</span>
                {todo.dueDate && <span className="due-date">📅 {formatDate(todo.dueDate)}</span>}
                {totalSubTodos > 0 && (
                  <span className="priority-badge">
                    📋 {completedSubTodos}/{totalSubTodos} steps
                  </span>
                )}
              </div>

              {/* Always show the section to display the "+ Add Steps" button */}
              <div className="sub-todos-section">
                  {totalSubTodos > 0 && (
                    <div className="sub-todos-header">
                      <span>Steps</span>
                      <button 
                        className="btn-toggle-sub"
                        onClick={() => setShowSubTodos(!showSubTodos)}
                      >
                        {showSubTodos ? '▼ Hide' : '▶ Show'}
                      </button>
                    </div>
                  )}

                  {(showSubTodos || totalSubTodos === 0) && (
                    <div className="sub-todos-list">
                      {(todo.subTodos || []).map(subTodo => (
                        <div key={subTodo._id} className={`sub-todo-item ${subTodo.completed ? 'completed' : ''}`}>
                          <input
                            type="checkbox"
                            checked={subTodo.completed}
                            onChange={() => handleToggleSubTodo(subTodo._id)}
                            className="sub-todo-checkbox"
                          />
                          <div className="sub-todo-content">
                            <span className="sub-todo-title">{subTodo.title}</span>
                            {subTodo.description && (
                              <span className="sub-todo-description">{subTodo.description}</span>
                            )}
                          </div>
                          <span className="sub-todo-priority">
                            {priorityEmoji[subTodo.priority]}
                          </span>
                          <div className="sub-todo-actions">
                            <button
                              className="btn-sub-action"
                              onClick={() => onDeleteSubTodo(todo._id, subTodo._id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}

                      {isAddingSubTodo && (
                        <div className="sub-todo-form">
                          <input
                            type="text"
                            placeholder="Add a step..."
                            value={subTodoTitle}
                            onChange={(e) => setSubTodoTitle(e.target.value)}
                            className="sub-todo-input"
                            autoFocus
                          />
                          <button 
                            className="btn-add-sub"
                            onClick={handleAddSubTodo}
                          >
                            Add
                          </button>
                          <button 
                            className="btn-cancel-sub"
                            onClick={() => {
                              setIsAddingSubTodo(false);
                              setSubTodoTitle('');
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {!isAddingSubTodo && totalSubTodos > 0 && (
                        <button 
                          type="button"
                          className="btn-toggle-sub"
                          onClick={() => {
                            console.log('Add step button clicked');
                            setIsAddingSubTodo(true);
                          }}
                          style={{ width: '100%', marginTop: '8px' }}
                        >
                          + Add Step
                        </button>
                      )}

                      {!isAddingSubTodo && totalSubTodos === 0 && (
                        <button 
                          type="button"
                          className="btn-toggle-sub"
                          onClick={() => {
                            console.log('Add steps button clicked');
                            setIsAddingSubTodo(true);
                          }}
                          style={{ width: '100%', marginTop: '8px' }}
                        >
                          + Add Steps
                        </button>
                      )}
                    </div>
                  )}
                </div>
              {/* End of sub-todos-section */}
            </div>
          </div>

          <div className="todo-actions">
            <button 
              className="btn-action btn-edit"
              onClick={() => setIsEditing(true)}
              title="Edit"
            >
              ✏️
            </button>
            <button 
              className="btn-action btn-delete"
              onClick={() => onDelete(todo._id)}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </>
      ) : (
        <div className="edit-mode">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input edit-title"
            autoFocus
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="edit-input edit-description"
            rows="2"
          />
          <select 
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            className="edit-input edit-priority"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
          <div className="edit-buttons">
            <button 
              className="btn-save"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button 
              className="btn-cancel-edit"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
