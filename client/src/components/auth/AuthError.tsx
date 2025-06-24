import styles from './auth.module.scss'

function AuthError({message}:{message:string}) {
  return (
    <div className={styles.auth_error}>
        {message}
    </div>
  )
}

export default AuthError