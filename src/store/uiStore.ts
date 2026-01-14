import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
    theme: 'light' | 'dark' | 'system';
    backgroundColor: string;
    opacity: number;
    isAlwaysOnTop: boolean;
    isScreenSharePrivate: boolean;
    isFocusMode: boolean;
    activeModal: string | null;
    sidebarCollapsed: boolean;

    // Actions
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    setBackgroundColor: (color: string) => void;
    setOpacity: (opacity: number) => void;
    setAlwaysOnTop: (flag: boolean) => void;
    setScreenSharePrivacy: (flag: boolean) => void;
    setFocusMode: (flag: boolean) => void;
    openModal: (modalId: string) => void;
    closeModal: () => void;
    toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
            theme: 'system',
            backgroundColor: '#ffffff',
            opacity: 1.0,
            isAlwaysOnTop: false,
            isScreenSharePrivate: false,
            isFocusMode: false,
            activeModal: null,
            sidebarCollapsed: false,

            setTheme: (theme) => {
                set({ theme });
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            },

            setBackgroundColor: (color) => {
                set({ backgroundColor: color });
                if (window.electronAPI) {
                    window.electronAPI.setBackgroundColor(color);
                }
            },

            setOpacity: (opacity) => {
                set({ opacity });
                if (window.electronAPI) {
                    window.electronAPI.setOpacity(opacity);
                }
            },

            setAlwaysOnTop: async (flag) => {
                set({ isAlwaysOnTop: flag });
                if (window.electronAPI) {
                    await window.electronAPI.setAlwaysOnTop(flag);
                }
            },

            setScreenSharePrivacy: async (flag) => {
                set({ isScreenSharePrivate: flag });
                if (window.electronAPI) {
                    await window.electronAPI.setScreenSharePrivacy(flag);
                }
            },

            setFocusMode: (flag) => set({ isFocusMode: flag }),

            openModal: (modalId) => set({ activeModal: modalId }),

            closeModal: () => set({ activeModal: null }),

            toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        }),
        {
            name: 'ui-settings',
            partialize: (state) => ({
                theme: state.theme,
                backgroundColor: state.backgroundColor,
                opacity: state.opacity,
                sidebarCollapsed: state.sidebarCollapsed,
            }),
        }
    )
);
