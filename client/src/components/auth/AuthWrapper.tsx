import React from 'react'
import styles from './auth.module.scss'

function AuthWrapper({children}:{children:React.ReactNode}) {
  return (
    <div className={styles.auth_wrapper}>
        <div className={styles.container}>
            {children}
        </div>
    </div>
  )
}

export default AuthWrapper