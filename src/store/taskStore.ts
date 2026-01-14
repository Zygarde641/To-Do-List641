import { create } from 'zustand';
import { Task, FilterOptions, ViewMode } from '../types';

interface TaskStore {
    tasks: Task[];
    selectedTask: Task | null;
    viewMode: ViewMode;
    filters: FilterOptions;
    searchQuery: string;

    // Actions
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

    setTasks: (tasks) => set({ tasks }),

    addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task]
    })),

    updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
        )
    })),

    deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id),
        selectedTask: state.selectedTask?.id === id ? null : state.selectedTask
    })),

    setSelectedTask: (task) => set({ selectedTask: task }),

    setViewMode: (mode) => set({ viewMode: mode }),

    setFilters: (filters) => set({ filters }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    clearFilters: () => set({ filters: {}, searchQuery: '' }),
}));
