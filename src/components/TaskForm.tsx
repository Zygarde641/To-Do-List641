import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useTaskStore } from '../store/taskStore';
import { useUIStore } from '../store/uiStore';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';
import * as chrono from 'chrono-node';

export const TaskForm: React.FC = () => {
    const { addTask, updateTask, selectedTask, setSelectedTask } = useTaskStore();
    const { activeModal, closeModal } = useUIStore();

    const isEditMode = activeModal === 'edit-task' && selectedTask;
    const isOpen = activeModal === 'new-task' || activeModal === 'edit-task';

    const [formData, setFormData] = useState<Partial<Task>>(
        selectedTask || {
            title: '',
            description: '',
            priority: 'medium',
            status: 'todo',
            progress: 0,
            projectId: (() => {
                const filters = useTaskStore.getState().filters;
                // If filtering by exactly one project, assign new tasks to it
                if (filters.projects && filters.projects.length === 1) {
                    return filters.projects[0];
                }
                return undefined;
            })(),
        }
    );

    const [titleInput, setTitleInput] = useState(selectedTask?.title || '');

    const handleTitleChange = (value: string) => {
        setTitleInput(value);

        // Try to parse natural language dates
        const parsed = chrono.parse(value);
        if (parsed.length > 0) {
            const date = parsed[0].start.date();
            setFormData((prev) => ({
                ...prev,
                title: value,
                dueDate: date.toISOString(),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                title: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title?.trim()) {
            alert('Please enter a task title');
            return;
        }

        if (isEditMode && selectedTask) {
            updateTask(selectedTask.id, formData);
        } else {
            const newTask: Task = {
                id: uuidv4(),
                title: formData.title,
                description: formData.description,
                dueDate: formData.dueDate,
                priority: formData.priority || 'medium',
                status: formData.status || 'todo',
                isRecurring: false,
                progress: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                projectId: formData.projectId, // Ensure project persistence
            };
            addTask(newTask);
        }

        handleClose();
    };

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            priority: 'medium',
            status: 'todo',
            progress: 0,
        });
        setTitleInput('');
        setSelectedTask(null);
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEditMode ? 'Edit Task' : 'New Task'}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Task Title"
                    placeholder="e.g., 'Finish report tomorrow at 3 PM'"
                    value={titleInput}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    autoFocus
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                    </label>
                    <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Add more details..."
                        rows={4}
                        className="
              w-full px-3 py-2 rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-colors
            "
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Priority
                        </label>
                        <select
                            value={formData.priority}
                            onChange={(e) =>
                                setFormData({ ...formData, priority: e.target.value as Task['priority'] })
                            }
                            className="
                w-full px-3 py-2 rounded-lg border
                bg-white dark:bg-gray-800
                border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              "
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value as Task['status'] })
                            }
                            className="
                w-full px-3 py-2 rounded-lg border
                bg-white dark:bg-gray-800
                border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              "
                        >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </div>

                <Input
                    label="Due Date"
                    type="datetime-local"
                    value={formData.dueDate ? formData.dueDate.slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />

                {formData.dueDate && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        💡 Tip: You can also type natural language dates in the title, like "tomorrow at 3 PM"
                    </p>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button type="button" variant="ghost" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        {isEditMode ? 'Save Changes' : 'Create Task'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
