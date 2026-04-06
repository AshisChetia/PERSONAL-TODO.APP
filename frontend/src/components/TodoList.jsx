import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onToggle, onDelete, onUpdate, onAddSubTodo, onUpdateSubTodo, onDeleteSubTodo }) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onAddSubTodo={onAddSubTodo}
          onUpdateSubTodo={onUpdateSubTodo}
          onDeleteSubTodo={onDeleteSubTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
