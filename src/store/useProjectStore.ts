import { create } from 'zustand'
import { getProjects } from '@/services/projectService'
import { Project } from '@/types/project'

interface ProjectState {
  projects: Array<Project>;
  filteredProjects: Array<Project>;
  isLoading: boolean;
  error: string | null;
  searchQuery: string
}

interface Actions {
  setProjects: (projects: Array<Project>) => void;
  fetchProjects: () => Promise<void>;
  filterProjects: (query: string) => void;
}

export const useProjectStore = create<ProjectState & Actions>()((set, get) => ({
  projects: [],
  filteredProjects: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  setProjects: (projects) => set({ projects, filteredProjects: projects }),

  fetchProjects: async () => {
    set({ isLoading: true, error: null }) 
    try {
      const data = await getProjects()
      set({ projects: data, filteredProjects: data, isLoading: false })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      set({ error: 'Error al cargar los proyectos', isLoading: false })
    }
  },

  filterProjects: (query: string) => {
    const { projects } = get()
    const lowerQuery = query.toLowerCase()

    if (!lowerQuery) {
      set({ searchQuery: query, filteredProjects: projects })
      return
    }

    const filtered = projects.filter( project => 
      project.title.toLowerCase().includes(lowerQuery) ||
      project.status.toLowerCase().includes(lowerQuery) ||
      project.projectPlanData.plan.toLowerCase().includes(lowerQuery) ||
      project.users.some( user => user.name.toLowerCase().includes(lowerQuery) )
    )

    set({ searchQuery: query, filteredProjects: filtered })

  }
}))