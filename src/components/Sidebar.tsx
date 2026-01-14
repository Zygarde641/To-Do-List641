import React from 'react';
import { Zap, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar: React.FC = () => {
    // Mock data for lists
    const lists = [
        { id: '1', name: 'Life', active: true },
        { id: '2', name: 'Work', active: false },
        { id: '3', name: 'Project A', active: false },
    ];

    return (
        <div className="h-full flex flex-col bg-background p-6 border-r border-white/5 no-drag">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10">
                <Zap className="w-6 h-6 text-primary" fill="currentColor" />
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Fastodo
                </span>
            </div>

            {/* My Lists */}
            <div className="flex-1">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                    My Lists
                </h2>

                <div className="space-y-2">
                    {lists.map((list) => (
                        <motion.div
                            key={list.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
                                ${list.active ? 'bg-primary text-background font-semibold shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                            `}
                        >
                            <span>{list.name}</span>
                            {list.active && (
                                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/10 rounded-full transition-all">
                                    <X size={14} />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.button
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
