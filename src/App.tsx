import { useEffect } from 'react';
import { TitleBar } from './components/TitleBar';
import { Toolbar } from './components/Toolbar';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { SettingsPanel } from './components/SettingsPanel';
import { useUIStore } from './store/uiStore';
import { useTaskStore } from './store/taskStore';

function App() {
    const { theme, setTheme } = useUIStore();
    const { setTasks } = useTaskStore();

    useEffect(() => {
        // Initialize theme
        const savedTheme = theme || 'system';
        setTheme(savedTheme);

        // Load tasks from localStorage (temporary until we integrate the database)
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (error) {
                console.error('Error loading tasks:', error);
            }
        }

        // Setup keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            const { openModal } = useUIStore.getState();

            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'n':
                        e.preventDefault();
                        openModal('new-task');
                        break;
                    case 'f':
                        e.preventDefault();
                        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
                        break;
                    case ',':
                        e.preventDefault();
                        openModal('settings');
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Auto-save tasks to localStorage
    // Auto-save tasks to localStorage
    useEffect(() => {
        const unsubscribe = useTaskStore.subscribe((state) => {
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        });

        return unsubscribe;
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            <TitleBar />
            <Toolbar />
            <main className="flex-1 overflow-hidden">
                <TaskList />
            </main>

            {/* Modals */}
            <TaskForm />
            <SettingsPanel />
        </div>
    );
}

export default App;
