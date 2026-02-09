import { useProjectStore } from '@/store/useProjectStore'
import { IncidentStatus, Item } from '@/types/project'
import { Calendar, AlertCircle, FileText, CheckSquare, PaintbrushVertical, Funnel, RotateCcw } from 'lucide-react'
import styles from './project-summary.module.css'
import { formatFullDate } from '@/lib/utils/dateFormatter'
import { TeamGroup } from '../TeamGroup/TeamGroup'

export const ProjectSummary = () => {
  const { projects, selectedProjectId } = useProjectStore()
  
  const project = projects.find(p => p._id === selectedProjectId)

  if (!project) {
    return <div className={styles.empty}>Selecciona un proyecto para ver el resumen</div>
  }

  const getMetrics = (type: Item) => {
    const items = project.incidents.filter(item => item.item === type)
    const total = items.length
    const open = items.filter(item => item.status === IncidentStatus.Active).length
    const percentage = total > 0 ? (open / total) * 100 : 0
    return { total, open, percentage }
  }

  const metrics = [
    { label: 'Incidencias', key: Item.Incidents, icon: <AlertCircle size={14}/> },
    { label: 'RFI', key: Item.RFI, icon: <FileText size={14}/> },
    { label: 'Tareas', key: Item.Task, icon: <CheckSquare size={14}/> }
  ]

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <span><PaintbrushVertical size={16}/></span>
          <h1>Resumen</h1>
        </div>
        <div className={styles.tabs}>
          <span className={styles.active_tab}>General</span>
          <span>Mis actualizaciones</span>
          <span className={styles.filters}><Funnel size={14}/> Filtros</span>
        </div>
      </header>

      <section className={styles.metrics_section}>
        <div className={styles.section_title}>
          <RotateCcw size={16} /> <span>Próximos a vencer</span>
          <a href="#">Ver todos</a>
        </div>
        
        <div className={styles.cards_grid}>
          {metrics.map(m => {
            const data = getMetrics(m.key)
            return (
              <div key={m.key} className={styles.metric_card}>
                <p>{m.label}</p>
                <strong>{data.total}</strong>
                <span>Total Abiertas</span>
                <div className={styles.chart_container}>
                  <svg viewBox="0 0 36 36" className={styles.circular_chart}>
                    <path className={styles.circle_bg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path 
                      className={styles.circle} 
                      style={{ stroke: '#ec6e66' }}
                      strokeDasharray={`${data.percentage}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                  </svg>
                  <span className={styles.percentage_text}>{data.open}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className={styles.list_section}>
        <table>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Item</th>
              <th>Fecha Límite</th>
            </tr>
          </thead>
          <tbody>
            {project.incidents.slice(0, 3).map(incident => (
              <tr key={incident._id}>
                <td>
                  <p className={styles.p_title}>{project.title}</p>
                  <span className={styles.p_desc}>{incident.description.substring(0, 20)}...</span>
                </td>
                <td><span className={styles.tag}>{incident.item}</span></td>
                <td>
                  <p className={styles.date}>{formatFullDate(incident.limitDate)}</p>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.events_section}>
        <div className={styles.section_title}>
          <Calendar size={16} /> <span>Próximos eventos</span>
          <a href="#" className={styles.view_all}>Ver todos</a>
        </div>
        <section className={styles.list_section}>
          <table>
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Equipo</th>
                <th>Fecha Límite</th>
              </tr>
            </thead>
            <tbody>
              {project.incidents.slice(0, 3).map(incident => (
                <tr key={incident._id}>
                  <td>
                    <p className={styles.p_title}>{project.title}</p>
                    <span className={styles.p_desc}>{incident.description.substring(0, 20)}...</span>
                  </td>
                  <td> <TeamGroup users={project.users} /></td>
                  <td>
                    <p className={styles.date}>{formatFullDate(incident.limitDate)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </div>
  )
}