import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Flag, Calendar as CalendarIcon, Trash2, Edit } from 'lucide-react';
import { Task } from '../types';
import { format, isPast } from 'date-fns';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onToggle,
    onEdit,
    onDelete,
}) => {
    const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'done';

    const priorityColors = {
        high: 'text-priority-high border-priority-high',
        medium: 'text-priority-medium border-priority-medium',
        low: 'text-priority-low border-priority-low',
    };

    const statusIcons = {
        todo: <Circle size={20} />,
        'in-progress': <Clock size={20} className="text-blue-500" />,
        done: <CheckCircle2 size={20} className="text-green-500" />,
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
        group p-4 rounded-xl border-2 transition-all cursor-pointer
        ${task.status === 'done' ? 'bg-gray-50 dark:bg-gray-800/50 opacity-75' : 'bg-white dark:bg-gray-800'}
        ${priorityColors[task.priority]}
        hover:shadow-md hover:scale-[1.01]
      `}
        >
            <div className="flex items-start gap-3">
                {/* Checkbox */}
                <button
                    onClick={() => onToggle(task.id)}
                    className="mt-0.5 flex-shrink-0 hover:scale-110 transition-transform"
                >
                    {statusIcons[task.status]}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3
                        className={`
              text-base font-medium mb-1
              ${task.status === 'done' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}
            `}
                    >
                        {task.title}
                    </h3>

                    {task.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                            {task.description}
                        </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        {task.dueDate && (
                            <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : ''}`}>
                                <CalendarIcon size={14} />
                                {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </div>
                        )}

                        <div className="flex items-center gap-1">
                            <Flag size={14} />
                            <span className="capitalize">{task.priority}</span>
                        </div>

                        {task.progress > 0 && task.progress < 100 && (
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary-600 transition-all"
                                        style={{ width: `${task.progress}%` }}
                                    />
                                </div>
                                <span>{task.progress}%</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Edit"
                    >
                        <Edit size={16} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
