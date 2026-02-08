'use client'

import { useEffect, useState, useMemo } from 'react'
import { SortingState } from '@tanstack/react-table'
import { useProjectStore } from '@/store/useProjectStore'
import { Table } from '@/components/shared/Table/Table'
import { ProjectSort } from '@/components/projects/ProjectSort/ProjectSort'
import { SearchInput } from '@/components/ui/Input/SearchInput'
import Badge from '@/components/ui/Badge/Badge'
import { Plus } from 'lucide-react'
import { getProjectColumns } from '@/components/projects/columns/columns'
import { ViewSwitcher } from '@/components/projects/ViewSwitcher/ViewSwitcher'
import styles from './page.module.css'
import { ProjectMap } from '@/components/projects/Map/ProjectMap'

export default function Home () {
  const [currentView, setCurrentView] = useState<'table' | 'map'>('table')
  const [sorting, setSorting] = useState<SortingState>([])
  const { filteredProjects, projects, fetchProjects, filterProjects, selectProject } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const columns = useMemo(() => getProjectColumns(), [])

  const handleSort = (id: string) => {
    setSorting((prev) => {
      const isCurrent = prev[0]?.id === id
      return [{ 
        id, 
        desc: isCurrent ? !prev[0].desc : true 
      }]
    })
  }

  const handleSelectProject = (id: string | null) => {
    selectProject(id)
    if (id) {
      setCurrentView('map') 
    }
  }
  


  return (
    <main className={styles.main_container}>
      <header className={styles.actions_container}>
        <div className={styles.title_section}>
          <h1>Mis proyectos</h1>
          <Badge text={`${projects.length} Proyectos`} backgroundColor="#e6e6e6" />
        </div>
        
        <div className={styles.controls_section}>
          <ProjectSort onSort={handleSort} />
          <ViewSwitcher view={currentView} onViewChange={setCurrentView} />
          <SearchInput onChange={filterProjects} />  
          <button className={styles.button_create}>
            <Plus size={20} />
            Crear proyecto
          </button>
        </div>
      </header>

      <section className={styles.section_container}>
        {currentView === 'table' ? (
          <Table 
            columns={columns} 
            data={filteredProjects} 
            sorting={sorting} 
            onSortingChange={setSorting}
            onRowClick={handleSelectProject}
          />
        ) : (
          <ProjectMap />
        )}
      </section>
    </main>
  )
}