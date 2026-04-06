const Todo = require('../models/Todo');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
};

// Get todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error: error.message });
  }
};

// Create todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = new Todo({
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      subTodos: []
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate ? new Date(dueDate) : null;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully', todo });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
};

// Add sub-todo
exports.addSubTodo = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const subTodo = {
      title,
      description: description || '',
      priority: priority || 'medium',
      completed: false
    };

    todo.subTodos.push(subTodo);
    const updatedTodo = await todo.save();
    res.status(201).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error adding sub-todo', error: error.message });
  }
};

// Update sub-todo
exports.updateSubTodo = async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;
    const { id, subTodoId } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const subTodo = todo.subTodos.id(subTodoId);
    if (!subTodo) {
      return res.status(404).json({ message: 'Sub-todo not found' });
    }

    if (title !== undefined) subTodo.title = title;
    if (description !== undefined) subTodo.description = description;
    if (completed !== undefined) subTodo.completed = completed;
    if (priority !== undefined) subTodo.priority = priority;

    // Auto-complete parent if all sub-todos are complete
    const allCompleted = todo.subTodos.every(st => st.completed);
    if (allCompleted && todo.subTodos.length > 0) {
      todo.completed = true;
    } else if (!allCompleted) {
      todo.completed = false;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating sub-todo', error: error.message });
  }
};

// Delete sub-todo
exports.deleteSubTodo = async (req, res) => {
  try {
    const { id, subTodoId } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const subTodo = todo.subTodos.id(subTodoId);
    if (!subTodo) {
      return res.status(404).json({ message: 'Sub-todo not found' });
    }

    subTodo.deleteOne();

    // Auto-complete parent if all sub-todos are complete
    const allCompleted = todo.subTodos.every(st => st.completed);
    if (allCompleted && todo.subTodos.length > 1) {
      todo.completed = true;
    } else if (todo.subTodos.length === 1) {
      todo.completed = false;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sub-todo', error: error.message });
  }
};

