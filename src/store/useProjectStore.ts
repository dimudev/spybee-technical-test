import { getProjects } from '@/services/projectService'
import { Project } from '@/types/project'
import { create } from 'zustand'

interface ProjectState {
  projects: Array<Project>;
  isLoading: boolean;
  error: string | null;
  filteredProjects: Array<Project>;
}

interface Actions {
  setProjects: (projects: Array<Project>) => void;
  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectState & Actions>()((set) => ({
  projects: [],
  filteredProjects: [],
  isLoading: false,
  error: null,
  setProjects: (projects) => set({ projects }),
  fetchProjects: async () => {
    set({ isLoading: true, error: null }) 
    try {
      const data = await getProjects()
      set({ projects: data, filteredProjects: data, isLoading: false })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      set({ error: 'Failed to load projects', isLoading: false })
    }
  }
}))