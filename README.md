# TaskMaster641 - Desktop Productivity Suite

A feature-rich desktop productivity application built with Electron, React, TypeScript, and Tailwind CSS. TaskMaster641 combines powerful task management with a beautiful notes app, all wrapped in a customizable, privacy-focused interface.

![TaskMaster641](https://img.shields.io/badge/version-2.1.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Key Features

### 🎯 Advanced Task Management
- **Smart Lists** - Create custom lists with right-click context menu
- **Natural Language Dates** - Type "tomorrow at 3 PM" or "next Monday"
- **Priority System** - High/Medium/Low with visual color coding
- **Calendar Integration** - Interactive calendar with priority dots
- **Inline Delete Confirmation** - No more annoying popups - tick/cross UI
- **Smart Sorting** - Sort by date, name, priority, or tags
- **Focus Mode** - Shows only today's top 3 priorities
- **Task Persistence** - Auto-saves to disk with Electron IPC

### 📝 Samsung Notes-like Style Editor
- **Rich Text Editing** - Full Quill.js editor with formatting
- **Grid View** - Beautiful card-based note organization
- **Quick Create** - One-click note creation
- **Auto-Save** - Never lose your work
- **Inline Delete** - Tick/cross confirmation for notes too

### 🪟 Window Management (Anti-Stream Features)
- **Always On Top** - Pin window above all others
- **Privacy Mode** - Hides window during screen sharing (Windows)
- **Custom Opacity** - Draggable slider (20-100%) with smooth circular handle
- **Frameless Design** - Custom title bar with modern controls
- **Position Memory** - Remembers size and position

### 🎨 Visual Customization
- **Theme Modes** - Light, Dark, and System auto-switching
- **Background Colors** - Full color picker for personalization
- **Accent Colors** - Customize highlights and active states
- **Smooth Animations** - Framer Motion powered transitions
- **Modern UI** - Glassmorphism and premium design

### ⌨️ Keyboard Shortcuts
- `Ctrl+N` - New task
- `Ctrl+F` - Focus search
- `Ctrl+,` - Settings
- `Space` - Toggle task completion
- `Escape` - Close modals

## 🚀 Quick Start

### Installation

**Option 1: Download Installer (Recommended)**
1. Download `TaskMaster641 Setup.exe` from releases
2. Run installer (creates desktop + start menu shortcuts)
3. Launch TaskMaster641

**Option 2: Build from Source**

```bash
# Clone repository
git clone https://github.com/Zygarde641/To-Do-List641.git
cd To-Do641

# Install dependencies
npm install

# Run in development
npm run electron:dev

# Build installer
npm run build:win
```

### Build Commands

```bash
# Development (Electron app)
npm run electron:dev

# Development (Browser only)
npm run dev

# Build Windows installer
npm run build:win

# The installer will be in: dist/TaskMaster641 Setup 2.1.0.exe
```

## 📁 Project Structure

```
To-Do641/
├── electron/
│   ├── main.ts           # Main process (window, IPC, persistence)
│   └── preload.ts        # Secure IPC bridge
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx   # Dynamic lists with inline delete
│   │   ├── TaskList.tsx  # Smart grouping & context menu
│   │   ├── TaskItem.tsx  # Individual task with tick/cross delete
│   │   ├── NotesView.tsx # Samsung Notes-style editor
│   │   ├── RightPanel.tsx # Calendar & sort controls
│   │   ├── TitleBar.tsx  # Custom window controls
│   │   └── SettingsPanel.tsx # Theme & opacity settings
│   ├── store/
│   │   ├── taskStore.ts  # Task state + persistence
│   │   ├── noteStore.ts  # Notes state + persistence
│   │   └── uiStore.ts    # Theme, opacity, view state
│   └── App.tsx           # Main layout
└── package.json          # Build config with desktop shortcut
```

## 🛠️ Tech Stack

- **Electron 28** - Desktop framework
- **React 18** - UI library with hooks
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Quill.js** - Rich text editor
- **Chrono-node** - Natural language dates
- **Lucide React** - Beautiful icon set

## 🎯 Usage Guide

### Creating Tasks
1. Click "Add Todo" or press `Ctrl+N`
2. Type title with natural language: "Finish report tomorrow at 3 PM"
3. Select priority and add description
4. Task auto-assigns to active list

### Managing Lists
- **Create**: Click "New List" in sidebar or use context menu
- **Filter**: Click list name to show only those tasks
- **Delete**: Hover over list → Click X → Confirm with tick

### Using the Calendar
- Click any date to filter tasks for that day
- Priority dots show: 🔴 High | 🟡 Medium | 🟢 Low
- Click again to clear filter

### Notes
1. Switch to "Notes" tab
2. Click "Create Note" card
3. Type title and content with rich formatting
4. Auto-saves on every change

### Customization
1. Click ⚙️ Settings icon
2. Choose theme (Light/Dark/System)
3. Pick background color
4. Drag opacity slider (20-100%)
5. Click "Done"

## � Privacy Features

- **Anti-Stream Mode** - Window hides during screen sharing
- **Always On Top** - Control when app is visible
- **Local Storage** - All data stays on your machine
- **No Telemetry** - Zero tracking or analytics

## 📦 Building the Installer

The installer is configured with:
- Desktop shortcut creation
- Start menu shortcut
- Custom install directory option
- Uninstaller

```json
"build": {
  "appId": "com.taskmaster.desktop",
  "productName": "TaskMaster641",
  "nsis": {
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true
  }
}
```

## � Troubleshooting

**Blank screen on startup?**
- App now auto-resets to home screen on launch
- Clear filters if stuck: Settings → Reset

**Dev server not starting?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run electron:dev
```

**Build failing?**
- Ensure Node.js 16+ is installed
- Check TypeScript compilation: `npx tsc`
- Clear Vite cache: `rm -rf dist dist-electron`

## �️ Roadmap

- [x] Task persistence
- [x] Notes app
- [x] Calendar integration
- [x] Inline delete confirmation
- [x] Draggable opacity slider
- [ ] Subtasks
- [ ] Recurring tasks
- [ ] Kanban board view
- [ ] Desktop notifications
- [ ] Data export/import
- [ ] Cloud sync (optional)

## 📄 License

MIT License - See LICENSE file

## 👤 Author

**Zygarde641**
- GitHub: [@Zygarde641](https://github.com/Zygarde641)
- Repository: [To-Do-List641](https://github.com/Zygarde641/To-Do-List641)

## 🙏 Acknowledgments

Built with ❤️ using open-source technologies. Special thanks to the Electron, React, and Tailwind communities.

---

**Version 2.1.0** - January 2026
