# 📝 Todo Master - Full Stack Application

A complete Todo application with subtasks/steps, built with **Node.js + Express** backend, **React + Vite** frontend, and **TiDB Cloud** database. Features full CRUD operations with priority management, due dates, and subtask support.

**Live Demo**: Coming soon on Vercel! 🚀

---

## ✨ Features

✅ **Full CRUD Operations** - Create, Read, Update, Delete todos  
✅ **Subtasks/Steps** - Add multiple steps to each todo  
✅ **Priority Levels** - Low, Medium, High with visual indicators  
✅ **Due Dates** - Add and manage deadlines  
✅ **Mark Complete** - Check off todos and steps  
✅ **Auto-Complete Parent** - Parent todo completes when all steps done  
✅ **Filter Todos** - View All, Pending, or Completed  
✅ **Edit Todos** - Update title, description, priority, and date  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Modern UI** - Beautiful gradient design with smooth animations  

---

## 🏗️ Project Structure

```
TODO-PERSONAL/
├── backend/
│   ├── config/
│   │   └── database.js           # TiDB Cloud connection pool
│   ├── controllers/
│   │   └── todoController.js     # API business logic (SQL queries)
│   ├── routes/
│   │   └── todoRoutes.js         # API route definitions
│   ├── server.js                 # Express server entry point
│   ├── vercel.json               # Vercel serverless config
│   ├── CREATE_TABLES.sql         # SQL for creating tables
│   ├── package.json              # Backend dependencies
│   └── .env                      # TiDB Cloud credentials
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx      # Add new todo form
│   │   │   ├── TodoForm.css
│   │   │   ├── TodoList.jsx      # Todo list container
│   │   │   ├── TodoList.css
│   │   │   ├── TodoItem.jsx      # Individual todo + subtasks
│   │   │   └── TodoItem.css
│   │   ├── App.jsx               # Main App component
│   │   ├── App.css
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite configuration
│   ├── package.json              # Frontend dependencies
│   └── .env.production           # Production API URL
│
├── .gitignore                    # Git ignore file
├── README.md                     # This file
└── DOCUMENTATION_FILES/
    ├── DEPLOYMENT_SUMMARY.md            # Deployment overview
    ├── DEPLOYMENT_CHECKLIST.md         # Step-by-step checklist
    ├── VERCEL_BACKEND_DEPLOYMENT.md    # Backend deployment guide
    ├── VERCEL_FRONTEND_DEPLOYMENT.md   # Frontend deployment guide
    ├── TIDB_QUICK_START.md             # TiDB Cloud setup
    ├── TIDB_MANUAL_TABLE_SETUP.md      # Create tables in TiDB
    └── MIGRATION_SUMMARY.md            # MongoDB → TiDB migration
```

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: TiDB Cloud (MySQL-compatible distributed SQL)
- **Driver**: mysql2/promise
- **Authentication**: Environment variables (production)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 with gradients and animations
- **HTTP Client**: Fetch API

### Database
- **TiDB Cloud**: Serverless, MySQL-compatible SQL database
- **Tables**: `todos` and `subtodos` with foreign keys
- **Features**: Auto-increment IDs, timestamps, indexes

### Deployment
- **Backend**: Vercel (serverless Node.js)
- **Frontend**: Vercel (static hosting)
- **Database**: TiDB Cloud (serverless cluster)
- **Repository**: GitHub (with auto-deploy on push)

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** v14+ installed
- **TiDB Cloud** account (free tier available at https://tidbcloud.com)
- **Git** installed

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/todo-master.git
cd todo-master
```

### 2. Setup TiDB Cloud

Follow [TIDB_QUICK_START.md](TIDB_QUICK_START.md) to:
- Create TiDB Cloud account
- Create a cluster
- Create database user
- Get connection string
- Create tables using SQL from `backend/CREATE_TABLES.sql`

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with your TiDB credentials
# Copy from .env.example and fill in your values:
# TIDB_HOST=...
# TIDB_PORT=4000
# TIDB_USER=...
# TIDB_PASSWORD=...
# TIDB_DATABASE=test
# PORT=5000

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

Test it:
```bash
curl http://localhost:5000/
```

Should return:
```json
{
  "message": "Todo Master Backend is running! ✅",
  "status": "Server OK",
  "database": "TiDB Cloud Connected"
}
```

### 4. Frontend Setup (new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000` or `http://localhost:3001`

---

## 📚 API Endpoints

### Get All Todos
```
GET /api/todos
```
Returns array of all todos with subtodos

### Get Single Todo
```
GET /api/todos/:id
```

### Create Todo
```
POST /api/todos
Body: { title, description, priority, dueDate }
```

### Update Todo
```
PUT /api/todos/:id
Body: { title, description, completed, priority, dueDate }
```

### Delete Todo
```
DELETE /api/todos/:id
```

### Add Subtodo (Step)
```
POST /api/todos/:id/subtodos
Body: { title, description, priority }
```

### Update Subtodo
```
PUT /api/todos/:id/subtodos/:subTodoId
Body: { title, description, completed, priority }
```

### Delete Subtodo
```
DELETE /api/todos/:id/subtodos/:subTodoId
```

---

## 🌐 Deployment to Vercel

### Prerequisites
- Vercel account (free at https://vercel.com)
- Code pushed to GitHub
- TiDB Cloud cluster running with tables created

### Backend Deployment

Follow [VERCEL_BACKEND_DEPLOYMENT.md](VERCEL_BACKEND_DEPLOYMENT.md):

1. Create new project on Vercel dashboard
2. Select `todo-master` repository
3. Set root directory to `backend`
4. Add environment variables from your `.env`:
   ```
   TIDB_HOST
   TIDB_PORT
   TIDB_USER
   TIDB_PASSWORD
   TIDB_DATABASE
   NODE_ENV=production
   ```
5. Click Deploy
6. Copy your backend URL

### Frontend Deployment

Follow [VERCEL_FRONTEND_DEPLOYMENT.md](VERCEL_FRONTEND_DEPLOYMENT.md):

1. Update `frontend/.env.production`:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api/todos
   ```
2. Push changes to GitHub
3. Create new frontend project on Vercel
4. Set root directory to `frontend`
5. Set build command to `npm run build`
6. Set output to `dist`
7. Add environment variable: `VITE_API_URL`
8. Click Deploy

### Verification
- Visit frontend URL → See "📝 Todo Master"
- Create a todo → Should save to TiDB Cloud
- Refresh page → Todo should still be there ✅
- Add steps → Should work
- Check backend logs in Vercel

---

## 🔄 Database Schema

### `todos` Table
```sql
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  priority VARCHAR(20) DEFAULT 'medium',
  dueDate DATETIME,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### `subtodos` Table
```sql
CREATE TABLE subtodos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  todoId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  priority VARCHAR(20) DEFAULT 'medium',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (todoId) REFERENCES todos(id) ON DELETE CASCADE
);
```

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) | Overview of deployment process |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Step-by-step checklist for both deployments |
| [VERCEL_BACKEND_DEPLOYMENT.md](VERCEL_BACKEND_DEPLOYMENT.md) | Detailed backend deployment guide |
| [VERCEL_FRONTEND_DEPLOYMENT.md](VERCEL_FRONTEND_DEPLOYMENT.md) | Detailed frontend deployment guide |
| [TIDB_QUICK_START.md](TIDB_QUICK_START.md) | Quick TiDB Cloud setup (5 minutes) |
| [TIDB_MANUAL_TABLE_SETUP.md](TIDB_MANUAL_TABLE_SETUP.md) | How to create tables in TiDB console |
| [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) | MongoDB to TiDB migration details |

---

## 🔧 Environment Variables

### Backend (.env)
```
TIDB_HOST=your_tidb_hosst
TIDB_PORT=4000
TIDB_USER=your_username
TIDB_PASSWORD=your_password
TIDB_DATABASE=db_name
PORT=5000
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.vercel.app/api/todos
```

---

## 🚨 Troubleshooting

### Backend
| Error | Solution |
|-------|----------|
| Cannot connect to TiDB | Check TIDB credentials and cluster is running |
| Port 5000 already in use | Change PORT in .env or kill process on that port |
| Cannot find module | Run `npm install` in backend folder |
| SSL connection error | SSL is enabled in config/database.js ✅ |

### Frontend
| Error | Solution |
|-------|----------|
| Cannot connect to backend | Check VITE_API_URL in .env.production |
| Todos not saving | Verify backend is running and API endpoint works |
| Styling issues | Clear cache (Ctrl+Shift+Delete) and refresh |
| Build fails | Check package.json scripts and run `npm install` |

### Database
| Issue | Solution |
|-------|----------|
| Tables don't exist | Run SQL from CREATE_TABLES.sql in TiDB console |
| Connection timeout | Verify TIDB_HOST, TIDB_USER, TIDB_PASSWORD are correct |
| Database not found | Create `test` database or update TIDB_DATABASE in .env |

---

## 📝 Git Workflow

```bash
# Make changes locally
git status

# Stage changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Vercel will auto-deploy!
```

---

## 🎯 Next Features (Roadmap)

- [ ] Edit subtodos
- [ ] Drag & drop to reorder todos
- [ ] Categories/tags for todos
- [ ] Recurring todos
- [ ] Notes/attachments
- [ ] Team collaboration
- [ ] Dark mode toggle
- [ ] Export todos to PDF

---

## 📄 License

MIT License - Feel free to use this project for learning and personal use!

---

## 🙏 Credits

Built with ❤️ using:
- Node.js & Express
- React & Vite
- TiDB Cloud
- Vercel

---

## 💬 Questions?

1. Check the [documentation files](./DOCUMENTATION_FILES/)
2. Review [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
3. Check [TIDB_QUICK_START.md](TIDB_QUICK_START.md) for database setup

---

**Happy todos! 🚀**

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



## 📄 License

This project is open source and available for personal use.

---

Happy organizing! 📝✨
