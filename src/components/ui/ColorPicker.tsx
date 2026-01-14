import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion } from 'framer-motion';

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
    color,
    onChange,
    label,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                </label>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary-500 transition-colors"
            >
                <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: color }}
                />
                <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                    {color.toUpperCase()}
                </span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-2 z-20 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
                    >
                        <HexColorPicker color={color} onChange={onChange} />
                    </motion.div>
                </>
            )}
        </div>
    );
};
