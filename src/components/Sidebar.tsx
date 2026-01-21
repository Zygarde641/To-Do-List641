import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';

export const Sidebar: React.FC = () => {
    const tasks = useTaskStore((state) => state.tasks);
    const activeProjects = useTaskStore((state) => state.filters.projects || []);

    return (
        <div className="h-full flex flex-col bg-background p-6 border-r border-white/5 no-drag">
            {/* Branding */}
            <div className="flex items-center gap-2 mb-10">
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    TM<span className="text-primary">641</span>
                </span>
            </div>

            {/* My Lists */}
            <div className="flex-1">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                    My Lists
                </h2>

                <div className="space-y-2">
                    {/* Dynamic Projects from Tasks */}
                    {Array.from(new Set(tasks.map(t => t.projectId).filter((id): id is string => !!id))).concat(['Life', 'Work']).filter((v, i, a) => a.indexOf(v) === i).map((project) => (
                        <motion.button
                            key={project}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                w-full group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
                                ${activeProjects.includes(project)
                                    ? 'bg-primary text-background font-semibold shadow-lg shadow-primary/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                            `}
                        >
                            <span onClick={() => {
                                // Filter by this project
                                const state = useTaskStore.getState();
                                const isActive = state.filters.projects?.includes(project!);
                                state.setFilters({
                                    ...state.filters,
                                    projects: isActive ? [] : [project!]
                                });
                            }} className="flex-1 text-left">{project}</span>

                            {/* Delete List Button */}
                            {['Life', 'Work'].includes(project!) ? null : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm(`Delete list "${project}" and remove it from all tasks?`)) {
                                            const tasks = useTaskStore.getState().tasks;
                                            tasks.filter(t => t.projectId === project).forEach(t => {
                                                useTaskStore.getState().updateTask(t.id, { projectId: undefined });
                                            });
                                        }
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all"
                                >
                                    <Plus size={14} className="rotate-45" />
                                </button>
                            )}
                        </motion.button>
                    ))}
                </div>

                <motion.button
                    onClick={() => {
                        const name = prompt("Enter list name:");
                        if (name && name.trim()) {
                            // Create a dummy task to establish the list
                            const listName = name.trim();
                            useTaskStore.getState().addTask({
                                id: crypto.randomUUID(),
                                title: `Start of ${listName}`,
                                status: 'todo',
                                priority: 'medium',
                                projectId: listName,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                                isRecurring: false,
                                progress: 0
                            });
                        }
                    }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary mt-6 px-4 py-2 w-full font-medium transition-colors"
                >
                    <Plus size={18} />
                    <span>New List</span>
                </motion.button>
            </div>
        </div>
    );
};
