const { pool } = require('../config/database');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // Get all todos
    const [todos] = await connection.execute('SELECT * FROM todos ORDER BY createdAt DESC');
    
    // For each todo, get its subtodos
    for (let todo of todos) {
      const [subtodos] = await connection.execute(
        'SELECT id AS _id, todoId, title, description, completed, priority, createdAt, updatedAt FROM subtodos WHERE todoId = ?',
        [todo.id]
      );
      todo._id = todo.id;
      todo.subTodos = subtodos;
    }
    
    connection.release();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
};

// Get todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [todos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    
    if (todos.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    const todo = todos[0];
    const [subtodos] = await connection.execute(
      'SELECT id AS _id, todoId, title, description, completed, priority FROM subtodos WHERE todoId = ?',
      [todo.id]
    );
    
    todo._id = todo.id;
    todo.subTodos = subtodos;
    
    connection.release();
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

    const connection = await pool.getConnection();
    const insertData = [title, description || '', priority || 'medium', dueDate || null];
    
    const [result] = await connection.execute(
      'INSERT INTO todos (title, description, priority, dueDate) VALUES (?, ?, ?, ?)',
      insertData
    );

    // Get the created todo
    const [todos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    const todo = todos[0];
    todo._id = todo.id;
    todo.subTodos = [];
    
    connection.release();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;
    const connection = await pool.getConnection();

    // Check if todo exists
    const [todos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    if (todos.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Todo not found' });
    }

    const todo = todos[0];
    
    // Build update query
    const updates = [];
    const values = [];
    
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (completed !== undefined) { updates.push('completed = ?'); values.push(completed); }
    if (priority !== undefined) { updates.push('priority = ?'); values.push(priority); }
    if (dueDate !== undefined) { updates.push('dueDate = ?'); values.push(dueDate); }

    if (updates.length > 0) {
      values.push(req.params.id);
      const query = `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`;
      await connection.execute(query, values);
    }

    // Get updated todo
    const [updatedTodos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    const updatedTodo = updatedTodos[0];
    
    const [subtodos] = await connection.execute(
      'SELECT id AS _id, todoId, title, description, completed, priority FROM subtodos WHERE todoId = ?',
      [updatedTodo.id]
    );
    
    updatedTodo._id = updatedTodo.id;
    updatedTodo.subTodos = subtodos;

    connection.release();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [todos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    if (todos.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Todo not found' });
    }

    const deletedTodo = todos[0];
    await connection.execute('DELETE FROM todos WHERE id = ?', [req.params.id]);
    
    deletedTodo._id = deletedTodo.id;
    connection.release();
    res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
};

// Add sub-todo
exports.addSubTodo = async (req, res) => {
  let connection;
  try {
    const { title, description, priority } = req.body;
    connection = await pool.getConnection();

    // Check if parent todo exists
    const [todos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    if (todos.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (!title) {
      connection.release();
      return res.status(400).json({ message: 'Title is required' });
    }

    // Check if subtodo count is at maximum (10)
    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as subtodo_count FROM subtodos WHERE todoId = ?',
      [req.params.id]
    );
    const currentCount = countResult[0]?.subtodo_count || Object.values(countResult[0])[0] || 0;
    if (currentCount >= 10) {
      connection.release();
      return res.status(400).json({ message: 'Cannot add more than 10 sub-todos per todo' });
    }

    // Insert subtodo
    await connection.execute(
      'INSERT INTO subtodos (todoId, title, description, priority) VALUES (?, ?, ?, ?)',
      [req.params.id, title, description || '', priority || 'medium']
    );

    // Get updated todo with all subtodos
    const [updatedTodos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    const todo = updatedTodos[0];
    
    const [subtodos] = await connection.execute(
      'SELECT id AS _id, todoId, title, description, completed, priority FROM subtodos WHERE todoId = ?',
      [todo.id]
    );
    
    todo._id = todo.id;
    todo.subTodos = subtodos;

    connection.release();
    res.status(201).json(todo);
  } catch (error) {
    if (connection) connection.release();
    console.error('Error adding sub-todo:', error.message);
    res.status(500).json({ message: 'Error adding sub-todo', error: error.message });
  }
};

// Update sub-todo
exports.updateSubTodo = async (req, res) => {
  let connection;
  try {
    const { title, description, completed, priority } = req.body;
    const { id, subTodoId } = req.params;
    connection = await pool.getConnection();

    // Check if todo exists
    const [todos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [id]);
    if (todos.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if subtodo exists
    const [subtodos] = await connection.execute('SELECT * FROM subtodos WHERE id = ? AND todoId = ?', [subTodoId, id]);
    if (subtodos.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Sub-todo not found' });
    }

    // Build update query
    const updates = [];
    const values = [];
    
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (completed !== undefined) { updates.push('completed = ?'); values.push(completed); }
    if (priority !== undefined) { updates.push('priority = ?'); values.push(priority); }

    if (updates.length > 0) {
      values.push(subTodoId);
      const query = `UPDATE subtodos SET ${updates.join(', ')} WHERE id = ?`;
      await connection.execute(query, values);
    }

    // Auto-complete parent if all sub-todos are complete
    const [allSubtodos] = await connection.execute('SELECT * FROM subtodos WHERE todoId = ?', [id]);
    if (allSubtodos.length > 0) {
      const allCompleted = allSubtodos.every(st => st.completed);
      await connection.execute('UPDATE todos SET completed = ? WHERE id = ?', [allCompleted, id]);
    }

    // Get updated todo with all subtodos
    const [updatedTodos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [id]);
    const todo = updatedTodos[0];
    
    const [updatedSubtodos] = await connection.execute(
      'SELECT id AS _id, todoId, title, description, completed, priority FROM subtodos WHERE todoId = ?',
      [todo.id]
    );
    
    todo._id = todo.id;
    todo.subTodos = updatedSubtodos;

    connection.release();
    res.json(todo);
  } catch (error) {
    if (connection) connection.release();
    console.error('Error updating sub-todo:', error.message);
    res.status(500).json({ message: 'Error updating sub-todo', error: error.message });
  }
};

// Delete sub-todo
exports.deleteSubTodo = async (req, res) => {
  let connection;
  try {
    const { id, subTodoId } = req.params;
    connection = await pool.getConnection();

    // Check if todo exists
    const [todos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [id]);
    if (todos.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if subtodo exists
    const [subtodos] = await connection.execute('SELECT * FROM subtodos WHERE id = ? AND todoId = ?', [subTodoId, id]);
    if (subtodos.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Sub-todo not found' });
    }

    // Delete subtodo
    await connection.execute('DELETE FROM subtodos WHERE id = ?', [subTodoId]);

    // Get updated todo with remaining subtodos
    const [updatedTodos] = await connection.execute('SELECT * FROM todos WHERE id = ?', [id]);
    const todo = updatedTodos[0];
    
    const [updatedSubtodos] = await connection.execute(
      'SELECT id AS _id, todoId, title, description, completed, priority FROM subtodos WHERE todoId = ?',
      [todo.id]
    );
    
    todo._id = todo.id;
    todo.subTodos = updatedSubtodos;

    connection.release();
    res.json(todo);
  } catch (error) {
    if (connection) connection.release();
    console.error('Error deleting sub-todo:', error.message);
    res.status(500).json({ message: 'Error deleting sub-todo', error: error.message });
  }
};
