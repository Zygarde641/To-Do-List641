import React from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useUIStore } from '../store/uiStore';
import { ColorPicker } from './ui/ColorPicker';
import { Slider } from './ui/Slider';
import { Moon, Sun, Monitor } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
    const {
        theme,
        setTheme,
        backgroundColor,
        setBackgroundColor,
        opacity,
        setOpacity,
        activeModal,
        closeModal,
    } = useUIStore();

    // Local state for initial values to handle "Cancel" logic if needed
    // But for "live" preview, we update the store directly. 
    // If user cancels, we might want to revert? 
    // The user asked for live changes, typically implying immediate effect. 
    // Reverting on cancel is complex without a snapshot. 
    // For now, I'll make it live. If they want to revert, they can change it back.
    // I'll keep local state to sync with store for UI consistency if store updates from elsewhere.

    const handleColorChange = (color: string) => {
        setBackgroundColor(color);
    };

    const handleOpacityChange = (value: number) => {
        setOpacity(value / 100);
    };

    const themeOptions = [
        { value: 'light', icon: <Sun size={20} />, label: 'Light' },
        { value: 'dark', icon: <Moon size={20} />, label: 'Dark' },
        { value: 'system', icon: <Monitor size={20} />, label: 'System' },
    ];

    return (
        <Modal
            isOpen={activeModal === 'settings'}
            onClose={closeModal}
            title="Settings"
            size="lg"
        >
            <div className="space-y-6">
                {/* Theme Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {themeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setTheme(option.value as any)}
                                className={`
                  p-4 rounded-xl border-2 transition-all
                  ${theme === option.value
                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                                    }
                `}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    {option.icon}
                                    <span className="text-sm font-medium">{option.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Background Color */}
                <div>
                    <ColorPicker
                        label="Background Color (Live)"
                        color={backgroundColor}
                        onChange={handleColorChange}
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Changes update immediately
                    </p>
                </div>

                {/* Opacity */}
                <div>
                    <Slider
                        label="Window Opacity (Live)"
                        value={opacity * 100}
                        onChange={handleOpacityChange}
                        min={10}
                        max={100}
                        unit="%"
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Adjust window transparency (10% - 100%)
                    </p>
                </div>

                {/* Keyboard Shortcuts */}
                <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Keyboard Shortcuts
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">New Task</span>
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+N</kbd>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Search</span>
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+F</kbd>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Delete Task</span>
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+D</kbd>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Toggle Complete</span>
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Space</kbd>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="primary" onClick={closeModal}>
                        Done
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
