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
        accentColor,
        setAccentColor,
        opacity,
        setOpacity,
        activeModal,
        closeModal,
    } = useUIStore();

    const handleBgColorChange = (color: string) => {
        setBackgroundColor(color);
    };

    const handleAccentColorChange = (color: string) => {
        setAccentColor(color);
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
            title="Visual Settings"
            size="lg"
        >
            <div className="space-y-8">
                {/* Theme Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Theme Mode
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {themeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setTheme(option.value as any)}
                                className={`
                  p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                  ${theme === option.value
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-white/10 hover:border-white/20 text-gray-400'
                                    }
                `}
                            >
                                {option.icon}
                                <span className="text-sm font-medium">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Colors Section */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Background Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Main Background
                        </label>
                        <ColorPicker
                            label=""
                            color={backgroundColor}
                            onChange={handleBgColorChange}
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            Sets the main window background color
                        </p>
                    </div>

                    {/* Accent Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Accent Color
                        </label>
                        <ColorPicker
                            label=""
                            color={accentColor}
                            onChange={handleAccentColorChange}
                        />
                        <p className="mt-2 text-xs text-gray-500">
                            Highlights, buttons, and active states
                        </p>
                    </div>
                </div>

                {/* Opacity */}
                <div>
                    <Slider
                        label="Window Opacity"
                        value={opacity * 100}
                        onChange={handleOpacityChange}
                        min={20}
                        max={100}
                        unit="%"
                    />
                    <p className="mt-2 text-xs text-gray-500">
                        Adjust how transparent the window is (20% - 100%)
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <Button variant="primary" onClick={closeModal} className="px-8">
                        Done
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
