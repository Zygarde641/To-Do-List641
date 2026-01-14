import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, LayoutGrid, List, Grid3x3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';
import { useUIStore } from '../store/uiStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { ViewMode } from '../types';

export const Toolbar: React.FC = () => {
    const { viewMode, setViewMode, searchQuery, setSearchQuery } = useTaskStore();
    const { openModal, isFocusMode, setFocusMode } = useUIStore();
    const [showFilters, setShowFilters] = useState(false);

    const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
        { mode: 'list', icon: <List size={18} />, label: 'List' },
        { mode: 'calendar', icon: <Calendar size={18} />, label: 'Calendar' },
        { mode: 'kanban', icon: <LayoutGrid size={18} />, label: 'Kanban' },
        { mode: 'matrix', icon: <Grid3x3 size={18} />, label: 'Matrix' },
    ];

    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3 flex-1">
                <Button
                    onClick={() => openModal('new-task')}
                    variant="primary"
                    size="md"
                    className="flex items-center gap-2"
                >
                    <Plus size={18} />
                    New Task
                </Button>

                <div className="relative flex-1 max-w-md">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="ghost"
                    size="md"
                    className="flex items-center gap-2"
                >
                    <Filter size={18} />
                    Filters
                </Button>

                <Button
                    onClick={() => setFocusMode(!isFocusMode)}
                    variant={isFocusMode ? 'primary' : 'ghost'}
                    size="md"
                >
                    Focus Mode
                </Button>
            </div>

            <div className="flex items-center gap-1 ml-4 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {viewModes.map(({ mode, icon, label }) => (
                    <motion.button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
              relative px-3 py-2 rounded-md transition-colors
              ${viewMode === mode
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }
            `}
                        title={label}
                    >
                        {viewMode === mode && (
                            <motion.div
                                layoutId="activeView"
                                className="absolute inset-0 bg-white dark:bg-gray-600 rounded-md"
                                transition={{ type: 'spring', duration: 0.5 }}
                            />
                        )}
                        <span className="relative z-10">{icon}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
