import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';


export const Sidebar: React.FC = () => {
    const tasks = useTaskStore((state) => state.tasks);
    const activeProjects = useTaskStore((state) => state.filters.projects || []);
    const [deletingProject, setDeletingProject] = useState<string | null>(null);
    const [creatingNewList, setCreatingNewList] = useState(false);
    const [newListName, setNewListName] = useState('');

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
                                deletingProject === project ? (
                                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => {
                                                const tasks = useTaskStore.getState().tasks;
                                                tasks.filter(t => t.projectId === project).forEach(t => {
                                                    useTaskStore.getState().updateTask(t.id, { projectId: undefined });
                                                });
                                                setDeletingProject(null);
                                            }}
                                            className="p-1 text-green-400 hover:bg-green-500/20 rounded-lg transition-all"
                                            title="Confirm Delete"
                                        >
                                            <Check size={14} />
                                        </button>
                                        <button
                                            onClick={() => setDeletingProject(null)}
                                            className="p-1 text-gray-400 hover:bg-white/10 rounded-lg transition-all"
                                            title="Cancel"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeletingProject(project);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all"
                                    >
                                        <Plus size={14} className="rotate-45" />
                                    </button>
                                )
                            )}
                        </motion.button>
                    ))}
                </div>

                {creatingNewList ? (
                    <div className="mt-6 px-4 py-2">
                        <input
                            autoFocus
                            type="text"
                            placeholder="List name..."
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && newListName.trim()) {
                                    const listName = newListName.trim();
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
                                    setNewListName('');
                                    setCreatingNewList(false);
                                } else if (e.key === 'Escape') {
                                    setNewListName('');
                                    setCreatingNewList(false);
                                }
                            }}
                            className="w-full bg-white/5 border border-primary/50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => {
                                    if (newListName.trim()) {
                                        const listName = newListName.trim();
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
                                        setNewListName('');
                                        setCreatingNewList(false);
                                    }
                                }}
                                className="flex-1 py-1.5 bg-primary text-background rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => {
                                    setNewListName('');
                                    setCreatingNewList(false);
                                }}
                                className="flex-1 py-1.5 bg-white/5 text-gray-400 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <motion.button
                        onClick={() => setCreatingNewList(true)}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary mt-6 px-4 py-2 w-full font-medium transition-colors"
                    >
                        <Plus size={18} />
                        <span>New List</span>
                    </motion.button>
                )}
            </div>
        </div>
    );
};
