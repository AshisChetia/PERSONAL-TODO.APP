const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  addSubTodo,
  updateSubTodo,
  deleteSubTodo
} = require('../controllers/todoController');

// Main Todo CRUD operations
router.get('/', getAllTodos);           // GET all todos
router.get('/:id', getTodoById);        // GET todo by ID
router.post('/', createTodo);           // CREATE todo
router.put('/:id', updateTodo);         // UPDATE todo
router.delete('/:id', deleteTodo);      // DELETE todo

// Sub-Todo operations
router.post('/:id/subtodos', addSubTodo);           // CREATE sub-todo
router.put('/:id/subtodos/:subTodoId', updateSubTodo);  // UPDATE sub-todo
router.delete('/:id/subtodos/:subTodoId', deleteSubTodo);  // DELETE sub-todo

module.exports = router;
