import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tag, Project } from '../types';

interface DataStore {
    tags: Tag[];
    projects: Project[];

    // Tag actions
    addTag: (tag: Tag) => void;
    updateTag: (id: string, updates: Partial<Tag>) => void;
    deleteTag: (id: string) => void;
    setTags: (tags: Tag[]) => void;

    // Project actions
    addProject: (project: Project) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    setProjects: (projects: Project[]) => void;
}

export const useDataStore = create<DataStore>()(
    persist(
        (set) => ({
            tags: [],
            projects: [],

            // Tag actions
            addTag: (tag) => set((state) => ({
                tags: [...state.tags, tag]
            })),

            updateTag: (id, updates) => set((state) => ({
                tags: state.tags.map(tag => tag.id === id ? { ...tag, ...updates } : tag)
            })),

            deleteTag: (id) => set((state) => ({
                tags: state.tags.filter(tag => tag.id !== id)
            })),

            setTags: (tags) => set({ tags }),

            // Project actions
            addProject: (project) => set((state) => ({
                projects: [...state.projects, project]
            })),

            updateProject: (id, updates) => set((state) => ({
                projects: state.projects.map(project =>
                    project.id === id ? { ...project, ...updates } : project
                )
            })),

            deleteProject: (id) => set((state) => ({
                projects: state.projects.filter(project => project.id !== id)
            })),

            setProjects: (projects) => set({ projects }),
        }),
        {
            name: 'data-store',
        }
    )
);
