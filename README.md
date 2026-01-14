# TaskMaster - Desktop To-Do Application

A feature-rich desktop to-do list application built with Electron, React, TypeScript, and Tailwind CSS.

## ✨ Features

### Window Management
- ✅ Custom title bar with window controls (minimize, maximize, close)
- ✅ Always on top functionality
- ✅ Screen share privacy mode (Windows - hides window during screen sharing)
- ✅ Draggable and resizable window
- ✅ Window position and size persistence

### Visual Customization
- ✅ Color picker for background customization
- ✅ Transparency slider (10-100%)
- ✅ Dark/Light/System theme support
- ✅ Smooth animations and transitions
- ✅ Modern UI with Tailwind CSS

### Task Management
- ✅ Create, edit, and delete tasks
- ✅ Natural language date parsing (e.g., "tomorrow at 3 PM", "next Monday")
- ✅ Priority levels (High, Medium, Low) with color coding
- ✅ Task status (To Do, In Progress, Done)
- ✅ Due dates with overdue detection
- ✅ Task descriptions
- ✅ Progress tracking

### Organization
- ✅ Smart grouping (Overdue, Today, Upcoming, No Date)
- ✅ Real-time search
- ✅ Focus mode (shows top 3 priorities or today's tasks)
- ✅ Collapsible completed tasks section

### Keyboard Shortcuts
- `Ctrl+N` - Create new task
- `Ctrl+F` - Focus search
- `Ctrl+,` - Open settings
- `Space` - Toggle task completion
- `Escape` - Close modals

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Windows OS (for screen share privacy feature)

### Installation

1. Navigate to the project directory:
```bash
cd "d:\Projects\SDE\To-Do641"
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run in development mode:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build:win
```

## 📁 Project Structure

```
To-Do641/
├── electron/              # Electron main process
│   ├── main.ts           # Main process entry
│   └── preload.ts        # Preload script
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── TitleBar.tsx # Custom title bar
│   │   ├── Toolbar.tsx  # Main toolbar
│   │   ├── TaskList.tsx # Task list view
│   │   ├── TaskItem.tsx # Individual task
│   │   ├── TaskForm.tsx # Task creation/editing
│   │   └── SettingsPanel.tsx
│   ├── store/           # Zustand state management
│   │   ├── taskStore.ts # Task state
│   │   ├── uiStore.ts   # UI state
│   │   └── dataStore.ts # Tags/Projects
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── index.html
```

## 🛠️ Tech Stack

- **Electron** - Desktop app framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Chrono** - Natural language date parsing
- **date-fns** - Date utilities
- **Lucide React** - Beautiful icons
- **react-colorful** - Color picker

## 🎨 Key Components

### Custom Title Bar
- Frameless window with custom controls
- Always-on-top toggle
- Screen share privacy toggle
- Settings access

### Task Management
- Natural language date input
- Priority-based color coding
- Status tracking
- Smart grouping by due date

### Settings Panel
- Theme selection (Light/Dark/System)
- Background color customization
- Window opacity control
- Keyboard shortcuts reference

## 📝 Usage

### Creating a Task
1. Click "New Task" or press `Ctrl+N`
2. Enter task title (try "Finish report tomorrow at 3 PM")
3. Add description, priority, and other details
4. Click "Create Task"

### Natural Language Dates
The app understands phrases like:
- "tomorrow at 3 PM"
- "next Monday"
- "in 3 days"
- "every week"

### Focus Mode
Click "Focus Mode" to see only:
- Today's tasks
- Top 3 high-priority tasks

### Customization
1. Click the settings icon in the title bar
2. Choose your theme
3. Pick a background color
4. Adjust window opacity

## 🔧 Troubleshooting

### Vite Server Not Starting
If `npm run dev` doesn't start the server:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try `npm run dev`

### Electron Window Not Showing
- Check if port 5173 is available
- Look for errors in the terminal
- Try running `npx vite` separately to test the React app

## 🚧 Future Enhancements

- [ ] SQLite database integration
- [ ] Tags and projects
- [ ] Subtasks
- [ ] Recurring tasks
- [ ] Calendar view
- [ ] Kanban board view
- [ ] Desktop notifications
- [ ] Data export/import
- [ ] Pomodoro timer

## 📄 License

MIT

## 👤 Author

Your Name
