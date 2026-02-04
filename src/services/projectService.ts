import { PROJECTS_MOCK } from '@/data'

export const getProjects = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return PROJECTS_MOCK
}