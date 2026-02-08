import { User } from 'lucide-react'
import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Spybee</span>
      <div>
        <User />
        <p>Marco</p>
      </div>
    </header>
  )
}

export default Header