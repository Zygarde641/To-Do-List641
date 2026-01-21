import React from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';

export const RightPanel: React.FC = () => {
    // Current date logic
    // Current date logic
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const monthName = today.toLocaleString('default', { month: 'short' });

    // Calculate actual calendar days
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const activeDay = today.getDate();

    const tasks = useTaskStore((state) => state.tasks);
    const filters = useTaskStore((state) => state.filters);
    const setFilters = useTaskStore((state) => state.setFilters);

    return (
        <div className="h-full flex flex-col bg-background/50 p-6 no-drag">
            {/* Calendar Widget */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <span className="text-gray-400">◄</span>
                    </button>
                    <div className="text-center">
                        <div className="text-xl font-bold">{currentYear}</div>
                        <div className="text-primary font-medium">{monthName}</div>
                    </div>
                    <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <span className="text-gray-400">►</span>
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {days.map((d, i) => (
                        <div key={`${d}-${i}`} className="text-gray-500 font-medium py-2">{d}</div>
                    ))}
                    {/* Padding for first day of month */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`pad-${i}`} />
                    ))}
                    {calendarDays.map(d => {
                        // Find tasks for this day
                        const dayTasks = tasks.filter(t => {
                            if (!t.dueDate) return false;
                            const taskDate = new Date(t.dueDate);
                            return taskDate.getDate() === d &&
                                taskDate.getMonth() === today.getMonth() &&
                                taskDate.getFullYear() === today.getFullYear();
                        });

                        const hasHigh = dayTasks.some(t => t.priority === 'high');
                        const hasMedium = dayTasks.some(t => t.priority === 'medium');
                        const hasLow = dayTasks.some(t => t.priority === 'low');

                        const isSelected = filters.dateRange?.start ===
                            new Date(currentYear, today.getMonth(), d).toDateString();

                        return (
                            <div
                                key={d}
                                onClick={() => {
                                    const dateStr = new Date(currentYear, today.getMonth(), d).toDateString();
                                    setFilters({
                                        ...filters,
                                        dateRange: isSelected ? undefined : { start: dateStr, end: dateStr }
                                    });
                                }}
                                className={`
                                    relative py-2 rounded-full cursor-pointer hover:bg-white/5 transition-colors flex flex-col items-center justify-center
                                    ${d === activeDay ? 'bg-primary text-background font-bold shadow-soft' : 'text-gray-300'}
                                    ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                                `}
                            >
                                {d}
                                <div className="flex gap-0.5 mt-0.5">
                                    {hasHigh && <div className="w-1 h-1 rounded-full bg-red-500" />}
                                    {!hasHigh && hasMedium && <div className="w-1 h-1 rounded-full bg-yellow-500" />}
                                    {!hasHigh && !hasMedium && hasLow && <div className="w-1 h-1 rounded-full bg-green-500" />}
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>

            {/* Sort/Filter Widget */}
            <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-4">Sort Method</h3>
                <div className="grid grid-cols-2 gap-3">
                    {['None', 'Date', 'Name', 'Tag', 'Priority'].map((item) => (
                        <motion.button
                            key={item}
                            onClick={() => {
                                const sortBy = item.toLowerCase() as any;
                                setFilters({
                                    ...filters,
                                    sortBy: sortBy === 'none' ? undefined : sortBy
                                });
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                px-4 py-3 rounded-xl font-medium text-sm text-left transition-all
                                ${filters.sortBy === item.toLowerCase() || (item === 'None' && !filters.sortBy)
                                    ? 'bg-primary text-background shadow-lg shadow-primary/20'
                                    : 'bg-surface text-gray-400 hover:text-white'}
                            `}
                        >
                            {item}
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};
