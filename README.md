# Todo App - Full Stack MERN Application

A complete Todo application built with Node.js, Express, MongoDB for the backend, and React with CSS for the frontend. Features full CRUD operations with filtering, priority management, and due dates.

## 📋 Features

✅ **Full CRUD Operations** - Create, Read, Update, Delete todos
✅ **Priority Levels** - Low, Medium, High (with visual indicators)
✅ **Due Dates** - Add and manage due dates for todos
✅ **Filter Todos** - View All, Pending, or Completed todos
✅ **Mark Complete** - Check off completed tasks
✅ **Edit Todos** - Update title, description, and priority
✅ **Responsive Design** - Works on desktop and mobile devices
✅ **Modern UI** - Clean and intuitive user interface

## 🏗️ Project Structure

```
TODO-PERSONAL/
├── backend/
│   ├── models/
│   │   └── Todo.js          # MongoDB Todo schema
│   ├── controllers/
│   │   └── todoController.js # Business logic for todos
│   ├── routes/
│   │   └── todoRoutes.js    # API route definitions
│   ├── server.js            # Express server entry point
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TodoForm.jsx       # Form to add new todos
    │   │   ├── TodoForm.css
    │   │   ├── TodoList.jsx       # List container for todos
    │   │   ├── TodoList.css
    │   │   ├── TodoItem.jsx       # Individual todo item
    │   │   └── TodoItem.css
    │   ├── App.jsx          # Main App component
    │   ├── App.css
    │   ├── main.jsx         # React entry point
    │   └── index.css        # Global styles
    ├── index.html           # HTML template
    ├── vite.config.js       # Vite configuration
    ├── package.json         # Frontend dependencies
    └── .env                 # Environment variables (if needed)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance like MongoDB Atlas)

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure MongoDB connection:**
   - Open `.env` file and update the MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/todos
   PORT=5000
   ```
   
   OR for MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todos
   PORT=5000
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder (in a new terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api/todos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all todos |
| GET | `/:id` | Get a specific todo by ID |
| POST | `/` | Create a new todo |
| PUT | `/:id` | Update a todo |
| DELETE | `/:id` | Delete a todo |

### Example Requests

**Create a Todo:**
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "dueDate": "2024-12-25"
}
```

**Update a Todo:**
```bash
PUT /api/todos/:id
Content-Type: application/json

{
  "completed": true,
  "priority": "medium"
}
```

**Delete a Todo:**
```bash
DELETE /api/todos/:id
```

## 💾 Database Schema

### Todo Model

```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String enum ['low', 'medium', 'high'] (default: 'medium'),
  dueDate: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🎨 Features Details

### Adding a Todo
- Click the "+ Add New Todo" button
- Enter title, description, priority, and due date
- Click "Add Todo" or "Cancel" to close the form

### Editing a Todo
- Click the ✏️ (edit) icon on any todo
- Modify the title, description, or priority
- Click "Save" or "Cancel" to finish

### Completing Todos
- Check the checkbox on the left side of any todo
- It will be marked as complete/incomplete

### Filtering
- Use the filter buttons at the top to view:
  - **All** - All todos
  - **Pending** - Uncompleted todos
  - **Completed** - Completed todos

### Deleting
- Click the 🗑️ (delete) icon to remove a todo

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running on your system
- Check the MONGODB_URI in `.env` file
- For MongoDB Atlas, verify username/password and network access

### CORS Error
- Make sure backend is running on port 5000
- Check that frontend proxy in `vite.config.js` is correctly configured

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Modify proxy URL in `vite.config.js`

## 📦 Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- CORS middleware

**Frontend:**
- React 18
- Vite (build tool)
- CSS3 (modern styling)
- Fetch API

## 📝 Notes

- All todos are persisted in MongoDB
- The frontend communicates with the backend via REST API
- Vite development server includes hot module replacement (HMR)
- The app is fully responsive and mobile-friendly

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 📄 License

This project is open source and available for personal use.

---

Happy organizing! 📝✨
