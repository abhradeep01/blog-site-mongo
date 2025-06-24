import React from 'react'
import styles from './ui.module.scss'

function InputField(props:React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input type="text" className={styles.input_field} {...props} />
  )
}

export default InputField