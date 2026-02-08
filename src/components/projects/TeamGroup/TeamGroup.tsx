import styles from './team-group.module.css'

interface User {
  name: string;
  avatarUrl?: string;
}

interface TeamGroupProps {
  users: User[];
}

export const TeamGroup = ({ users }: TeamGroupProps) => {
  const limit = 3
  const displayUsers = users.slice(0, limit)
  const extraCount = users.length - limit

  return (
    <div className={styles.container}>
      {displayUsers.map((user, index) => (
        <div
          key={`${user.name}-${index}`}
          className={styles.avatar}
          title={user.name}
        >
          {user.avatarUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={user.avatarUrl} 
              className={styles.image} 
              alt={user.name} 
            />
          ) : (
            user.name.substring(0, 2).toUpperCase()
          )}
        </div>
      ))}
      
      {extraCount > 0 && (
        <div className={`${styles.avatar} ${styles.extra}`}>
          +{extraCount}
        </div>
      )}
    </div>
  )
}