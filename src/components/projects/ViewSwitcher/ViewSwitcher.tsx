import { LayoutGrid, MapPin, Table } from 'lucide-react'
import styles from './view-swticher.module.css'

interface ViewSwitcherProps {
  view: 'table' | 'map'
  onViewChange: (view: 'table' | 'map') => void
}

export const ViewSwitcher = ({ view, onViewChange }: ViewSwitcherProps) => {
  return (
    <div className={styles.container}>
      <button 
        className={`${styles.button} ${view === 'table' ? styles.active : ''}`}
        onClick={() => onViewChange('table')}
        title="Vista de Tabla"
      >
        <Table size={18} />
      </button>

      <div className={styles.divider}>
        <LayoutGrid size={18} />
      </div>

      <button 
        className={`${styles.button} ${view === 'map' ? styles.active : ''}`}
        onClick={() => onViewChange('map')}
        title="Vista de Mapa"
      >
        <MapPin size={18} />
      </button>
    </div>
  )
}