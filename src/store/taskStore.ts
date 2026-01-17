import { create } from 'zustand';
import { Task, FilterOptions, ViewMode } from '../types';

interface TaskStore {
    tasks: Task[];
    selectedTask: Task | null;
    viewMode: ViewMode;
    filters: FilterOptions;
    searchQuery: string;

    // Actions
    loadTasks: () => Promise<void>;
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    setSelectedTask: (task: Task | null) => void;
    setViewMode: (mode: ViewMode) => void;
    setFilters: (filters: FilterOptions) => void;
    setSearchQuery: (query: string) => void;
    clearFilters: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    selectedTask: null,
    viewMode: 'list',
    filters: {},
    searchQuery: '',

    loadTasks: async () => {
        try {
            if (window.electronAPI) {
                const tasks = await window.electronAPI.getTasks();
                set({ tasks: tasks || [] });
            } else {
                const saved = localStorage.getItem('tasks');
                if (saved) set({ tasks: JSON.parse(saved) });
            }
        } catch (error) {
            console.error('Failed to load tasks', error);
        }
    },

    setTasks: (tasks) => {
        set({ tasks });
        if (window.electronAPI) window.electronAPI.saveTasks(tasks);
        else localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    addTask: (task) => {
        set((state) => {
            const updated = [...state.tasks, task];
            if (window.electronAPI) window.electronAPI.saveTasks(updated);
            else localStorage.setItem('tasks', JSON.stringify(updated));
            return { tasks: updated };
        });
    },

    updateTask: (id, updates) => {
        set((state) => {
            const updated = state.tasks.map(task =>
                task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
            );
            if (window.electronAPI) window.electronAPI.saveTasks(updated);
            else localStorage.setItem('tasks', JSON.stringify(updated));
            return { tasks: updated };
        });
    },

    deleteTask: (id) => {
        set((state) => {
            const updated = state.tasks.filter(task => task.id !== id);
            const selectedTask = state.selectedTask?.id === id ? null : state.selectedTask;
            if (window.electronAPI) window.electronAPI.saveTasks(updated);
            else localStorage.setItem('tasks', JSON.stringify(updated));
            return { tasks: updated, selectedTask };
        });
    },

    setSelectedTask: (task) => set({ selectedTask: task }),

    setViewMode: (mode) => set({ viewMode: mode }),

    setFilters: (filters) => set({ filters }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    clearFilters: () => set({ filters: {}, searchQuery: '' }),
}));
