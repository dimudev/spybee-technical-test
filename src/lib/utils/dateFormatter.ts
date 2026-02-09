export const formatDate = (date: string | Date) => 
  new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit', 
    month: 'short', 
    year: 'numeric'
  }).replace('.', '')

export const formatFullDate = (dateString: string | Date): string => {
  if (!dateString) return ''

  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) return 'Fecha inválida'

  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

