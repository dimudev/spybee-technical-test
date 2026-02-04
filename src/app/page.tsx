'use client'
import { useProjectStore } from '@/store/useProjectStore'
import { useEffect } from 'react'

export default function Home () {

  const filteredProjects = useProjectStore( state => state.filteredProjects)
  const isLoading = useProjectStore( state => state.isLoading)
  const fetchProjects = useProjectStore( state => state.fetchProjects)

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])
  

  return (
    <main>
      <h1>Projects</h1>
      {isLoading && <p>Loading projects...</p>}
  
      {!isLoading && filteredProjects.length === 0 && (
        <p>No projects found.</p>
      )}

      {!isLoading && filteredProjects.length > 0 && (
        <pre >
          {JSON.stringify(filteredProjects, null, 2)}
        </pre>
      )}
    </main>
  )
}
