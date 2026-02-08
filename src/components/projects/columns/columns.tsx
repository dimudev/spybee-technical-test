import { createColumnHelper, ColumnDef } from '@tanstack/react-table'
import { formatDate } from '@/lib/utils/dateFormatter'
import { Project, ProjectStatus, Incident, Item, Plan } from '@/types/project'
import { TeamGroup } from '@/components/projects/TeamGroup/TeamGroup'
import { Timer, RotateCcw } from 'lucide-react'
import Badge from '@/components/ui/Badge/Badge'
import styles from './columns.module.css'

const columnHelper = createColumnHelper<Project>()

const STATUS_CONFIG: Record<ProjectStatus, { bg: string; text: string }> = {
  [ProjectStatus.Active]: { bg: '#dcfce7', text: '#15803d' },
  [ProjectStatus.Inactive]: { bg: '#f3f4f6', text: '#4b5563' },
  [ProjectStatus.PendingPayment]: { bg: '#fef9c3', text: '#a16207' },
  [ProjectStatus.Suspended]: { bg: '#fee2e2', text: '#b91c1c' }
}

const PLAN_CONFIG: Record<Plan, { bg: string; label: string }> = {
  [Plan.Big]: { bg: '#7d7d7d', label: 'Big' },
  [Plan.Small]: { bg: '#bc6016', label: 'Small' }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProjectColumns = (): ColumnDef<Project, any>[] => [
  columnHelper.accessor('title', {
    id: 'title',
    header: 'Proyecto',
    size: 250,
    cell: ({ row }) => {
      const { title, createdAt, lastUpdated } = row.original
      return (
        <div className={styles.projectCell}>
          <span className={styles.projectTitle}>{title}</span>
          <div className={styles.dateContainer}>
            <div className={styles.dateItem}>
              <Timer size={14} strokeWidth={1.5} />
              <span>{formatDate(createdAt)}</span>
            </div>
            <div className={styles.dateItem}>
              <RotateCcw size={14} strokeWidth={1.5} />
              <span>{formatDate(lastUpdated)}</span>
            </div>
          </div>
        </div>
      )
    }
  }),
  columnHelper.accessor(row => row.incidents.filter(i => i.item === Item.RFI).length, {
    id: 'rfi',
    header: 'RFI'
  }),
  columnHelper.accessor(row => row.incidents.filter(i => i.item === Item.Task).length, {
    id: 'tasks',
    header: 'Tareas'
  }),
  columnHelper.accessor(row => row.incidents.filter(i => i.item === Item.Incidents).length, {
    id: 'incidents-sort',
    header: 'Incidencias'
  }),
  columnHelper.accessor('projectPlanData.plan', {
    header: 'Plan',
    size: 100,
    cell: info => {
      const planValue = info.getValue() as Plan
      const config = PLAN_CONFIG[planValue] || { bg: '#e6e6e6', label: planValue }

      return (
        <Badge 
          text={config.label} 
          color="white" 
          backgroundColor={config.bg} 
        />
      )
    }
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    size: 120,
    cell: info => {
      const status = info.getValue() as ProjectStatus
      const config = STATUS_CONFIG[status] || STATUS_CONFIG[ProjectStatus.Inactive]
      return (
        <Badge text={status.replace('_', ' ')} backgroundColor={config.bg} color={config.text} />
      )
    }
  }),
  columnHelper.accessor('users', {
    header: 'Equipo',
    size: 130,
    cell: info => <TeamGroup users={info.getValue() || []} />
  }),
  columnHelper.accessor('incidents', {
    header: 'Items por vencer',
    size: 200,
    cell: info => {
      const values = info.getValue() as Incident[]

      const counts = values.reduce((acc, curr) => {
        acc[curr.item] = (acc[curr.item] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const itemsToShow: Item[] = [Item.Incidents, Item.RFI, Item.Task]

      const labels: Record<Item, string> = {
        [Item.Incidents]: 'Incidencias',
        [Item.RFI]: 'RFI',
        [Item.Task]: 'Tareas'
      }

      return (
        <div className={styles.incidentsContainer}>
          {itemsToShow.map(type => (
            <div key={type} className={styles.incidentItem}>
              <span className={styles.incidentCount}>{counts[type] || 0}</span>
              <span className={styles.incidentLabel}>{labels[type]}</span>
            </div>
          ))}
        </div>
      )
    }
  })
]