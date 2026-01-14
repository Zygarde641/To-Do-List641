import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskItem } from './TaskItem';
import { useTaskStore } from '../store/taskStore';
import { useUIStore } from '../store/uiStore';
import { Task } from '../types';
import { isToday, isPast } from 'date-fns';

export const TaskList: React.FC = () => {
    const { tasks, searchQuery, filters, setSelectedTask, updateTask, deleteTask } = useTaskStore();
    const { openModal, isFocusMode } = useUIStore();

    const filteredTasks = useMemo(() => {
        let filtered = tasks;

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (task) =>
                    task.title.toLowerCase().includes(query) ||
                    task.description?.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (filters.status && filters.status.length > 0) {
            filtered = filtered.filter((task) => filters.status!.includes(task.status));
        }

        // Priority filter
        if (filters.priority && filters.priority.length > 0) {
            filtered = filtered.filter((task) => filters.priority!.includes(task.priority));
        }

        // Focus mode - show only today's tasks or top 3 priorities
        if (isFocusMode) {
            filtered = filtered.filter(
                (task) =>
                    task.status !== 'done' &&
                    (task.dueDate ? isToday(new Date(task.dueDate)) : task.priority === 'high')
            );
            filtered = filtered.slice(0, 3);
        }

        return filtered;
    }, [tasks, searchQuery, filters, isFocusMode]);

    const groupedTasks = useMemo(() => {
        const groups: { [key: string]: Task[] } = {
            overdue: [],
            today: [],
            upcoming: [],
            'no-date': [],
        };

        filteredTasks.forEach((task) => {
            if (task.status === 'done') return;

            if (!task.dueDate) {
                groups['no-date'].push(task);
            } else {
                const dueDate = new Date(task.dueDate);
                if (isPast(dueDate) && !isToday(dueDate)) {
                    groups.overdue.push(task);
                } else if (isToday(dueDate)) {
                    groups.today.push(task);
                } else {
                    groups.upcoming.push(task);
                }
            }
        });

        return groups;
    }, [filteredTasks]);

    const handleToggle = (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            const newStatus = task.status === 'done' ? 'todo' : 'done';
            updateTask(id, {
                status: newStatus,
                completedAt: newStatus === 'done' ? new Date().toISOString() : undefined,
            });
        }
    };

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        openModal('edit-task');
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this task?')) {
            deleteTask(id);
        }
    };

    const renderGroup = (title: string, tasks: Task[], color: string) => {
        if (tasks.length === 0) return null;

        return (
            <div key={title} className="mb-6">
                <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${color}`}>
                    {title} ({tasks.length})
                </h3>
                <div className="space-y-2">
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={handleToggle}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        );
    };

    if (filteredTasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md"
                >
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No tasks found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {searchQuery
                            ? 'Try adjusting your search or filters'
                            : 'Create your first task to get started!'}
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="p-6 overflow-y-auto">
            {renderGroup('Overdue', groupedTasks.overdue, 'text-red-600 dark:text-red-400')}
            {renderGroup('Today', groupedTasks.today, 'text-blue-600 dark:text-blue-400')}
            {renderGroup('Upcoming', groupedTasks.upcoming, 'text-green-600 dark:text-green-400')}
            {renderGroup('No Due Date', groupedTasks['no-date'], 'text-gray-600 dark:text-gray-400')}

            {/* Completed tasks */}
            {tasks.filter((t) => t.status === 'done').length > 0 && (
                <details className="mt-6">
                    <summary className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 cursor-pointer mb-3">
                        Completed ({tasks.filter((t) => t.status === 'done').length})
                    </summary>
                    <div className="space-y-2">
                        <AnimatePresence>
                            {tasks
                                .filter((t) => t.status === 'done')
                                .map((task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onToggle={handleToggle}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                        </AnimatePresence>
                    </div>
                </details>
            )}
        </div>
    );
};
