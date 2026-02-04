import { Project } from '@/types/project'
import { PROJECTS_MOCK } from '@/data'

export const getProjects = async (): Promise<Project[]> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return PROJECTS_MOCK as Project[]
}