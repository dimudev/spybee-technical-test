import { ArrowDownWideNarrow } from 'lucide-react'
import { Dropdown } from '../../ui/DropDown/DropDown'
import styles from './project-sort.module.css'

interface ProjectSortProps {
  onSort: (id: string) => void
}

export const ProjectSort = ({ onSort }: ProjectSortProps) => {
  const options = [
    { label: 'Orden alfabético', id: 'title' },
    { label: 'Número de Incidencias', id: 'incidents-sort' },
    { label: 'Número de RFI', id: 'rfi' },
    { label: 'Número de Tareas', id: 'tasks' }
  ]

  return (
    <Dropdown
      trigger={
        <button className={styles.triggerButton}>
          <ArrowDownWideNarrow size={20} className={styles.icon} />
        </button>
      }
    >
      <div className={styles.optionsList}> 
        {options.map((opt) => (
          <button
            key={opt.id}  
            onClick={() => onSort(opt.id)}
            className={styles.optionButton}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </Dropdown>
  )
}