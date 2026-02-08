import styles from './badge.module.css'

interface BadgeProps {
  text: string;
  backgroundColor: string
  color?: string;
}

const Badge = ({ text, color, backgroundColor }: BadgeProps) => {
  return (
    <span 
      style={{ backgroundColor, color }} 
      className={styles.badge}
    >
      {text}
    </span>
  )
}

export default Badge