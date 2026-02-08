import { useEffect, useRef } from 'react'
import { ProjectStatus } from '@/types/project'
import { useProjectStore } from '@/store/useProjectStore'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import styles from './project-map.module.css'

const STATUS_COLORS = {
  [ProjectStatus.Active]: '#15803d',
  [ProjectStatus.Inactive]: '#4b5563',
  [ProjectStatus.PendingPayment]: '#a16207',
  [ProjectStatus.Suspended]: '#b91c1c'
}

export const ProjectMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const currentMarkers = useRef<maplibregl.Marker[]>([])
  
  const { filteredProjects, selectedProjectId } = useProjectStore()

  useEffect(() => {
    if (!mapContainer.current) return

    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [-3.703, 40.416],
        zoom: 5
      })
    }

    const mapInstance = map.current

    const renderMarkers = () => {
      currentMarkers.current.forEach(m => m.remove())
      currentMarkers.current = []

      filteredProjects.forEach(project => {
        const color = STATUS_COLORS[project.status] || '#3b82f6'
        
        const marker = new maplibregl.Marker({ color })
          .setLngLat([project.position.lng, project.position.lat])
          .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(`<b>${project.title}</b>`))
          .addTo(mapInstance)
        currentMarkers.current.push(marker)
      })
    }

    if (mapInstance.loaded()) {
      renderMarkers()
    } else {
      mapInstance.on('load', () => {
        mapInstance.resize()
        renderMarkers()
      })
    }

  }, [filteredProjects])

  useEffect(() => {
    if (!map.current || !selectedProjectId) return

    const project = filteredProjects.find(p => p._id === selectedProjectId)
    if (project) {
      map.current.flyTo({
        center: [project.position.lng, project.position.lat],
        zoom: 12,
        essential: true
      })
    }
  }, [selectedProjectId, filteredProjects])

  return (
    <div 
      ref={mapContainer} 
      className={styles.mapWrapper}
    />
  )
}