import { ChevronDown, User } from 'lucide-react'
import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Spybee</span>
      <div className={styles.user_profile}>
        <div className={styles.icon_container}>
          <User size={18} />
        </div>
        <div>
          <p className={styles.user_name}>Marco</p>
          <p className={styles.user_role} >Administrador</p>
        </div>
        <ChevronDown size={20} color='white ' />
      </div>
    </header>
  )
}

export default Header