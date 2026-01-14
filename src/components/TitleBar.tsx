import React, { useState, useEffect } from 'react';
import { Minus, Square, X, Pin, EyeOff, Settings } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export const TitleBar: React.FC = () => {
    const [isMaximized, setIsMaximized] = useState(false);
    const { isAlwaysOnTop, isScreenSharePrivate, setAlwaysOnTop, setScreenSharePrivacy, openModal } = useUIStore();

    useEffect(() => {
        const checkMaximized = async () => {
            if (window.electronAPI) {
                const maximized = await window.electronAPI.isMaximized();
                setIsMaximized(maximized);
            }
        };
        checkMaximized();
    }, []);

    const handleMinimize = () => {
        window.electronAPI?.minimizeWindow();
    };

    const handleMaximize = async () => {
        await window.electronAPI?.maximizeWindow();
        const maximized = await window.electronAPI?.isMaximized();
        setIsMaximized(maximized || false);
    };

    const handleClose = () => {
        window.electronAPI?.closeWindow();
    };

    const toggleAlwaysOnTop = () => {
        setAlwaysOnTop(!isAlwaysOnTop);
    };

    const toggleScreenSharePrivacy = () => {
        setScreenSharePrivacy(!isScreenSharePrivate);
    };

    return (
        <div className="flex items-center justify-between h-10 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-gray-800 dark:to-gray-900 text-white px-4 drag-region">
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-xs font-bold">
                    TM
                </div>
                <span className="text-sm font-semibold">TaskMaster</span>
            </div>

            <div className="flex items-center gap-2 no-drag">
                <button
                    onClick={toggleAlwaysOnTop}
                    className={`p-1.5 rounded hover:bg-white/20 transition-colors ${isAlwaysOnTop ? 'bg-white/30' : ''
                        }`}
                    title="Always on Top"
                >
                    <Pin size={16} className={isAlwaysOnTop ? 'fill-current' : ''} />
                </button>

                <button
                    onClick={toggleScreenSharePrivacy}
                    className={`p-1.5 rounded hover:bg-white/20 transition-colors ${isScreenSharePrivate ? 'bg-white/30' : ''
                        }`}
                    title="Screen Share Privacy"
                >
                    <EyeOff size={16} />
                </button>

                <button
                    onClick={() => openModal('settings')}
                    className="p-1.5 rounded hover:bg-white/20 transition-colors"
                    title="Settings"
                >
                    <Settings size={16} />
                </button>

                <div className="w-px h-6 bg-white/20 mx-1" />

                <button
                    onClick={handleMinimize}
                    className="p-1.5 rounded hover:bg-white/20 transition-colors"
                    title="Minimize"
                >
                    <Minus size={16} />
                </button>

                <button
                    onClick={handleMaximize}
                    className="p-1.5 rounded hover:bg-white/20 transition-colors"
                    title={isMaximized ? 'Restore' : 'Maximize'}
                >
                    <Square size={14} />
                </button>

                <button
                    onClick={handleClose}
                    className="p-1.5 rounded hover:bg-red-500 transition-colors"
                    title="Close"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};
