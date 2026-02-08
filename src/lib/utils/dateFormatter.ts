export const formatDate = (date: string | Date) => 
  new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit', 
    month: 'short', 
    year: 'numeric'
  }).replace('.', '')