import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    children: React.ReactNode;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, children }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleScroll = () => onClose();

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [onClose]);

    // Adjust position to prevent overflow
    const style: React.CSSProperties = {
        top: y,
        left: x,
    };

    return (
        <AnimatePresence>
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                style={style}
                className="fixed z-50 min-w-[180px] bg-surface border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-md p-1.5"
                onContextMenu={(e) => e.preventDefault()}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export const ContextMenuItem: React.FC<{ onClick: () => void; children: React.ReactNode; danger?: boolean }> = ({ onClick, children, danger }) => (
    <button
        onClick={onClick}
        className={`
            w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors
            ${danger ? 'text-red-400 hover:bg-red-500/10' : 'text-gray-300 hover:bg-white/10 hover:text-white'}
        `}
    >
        {children}
    </button>
);

export const ContextMenuSeparator: React.FC = () => (
    <div className="h-px bg-white/5 my-1" />
);
