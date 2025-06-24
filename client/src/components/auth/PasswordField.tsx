import React from 'react'
import styles from './auth.module.scss'
import InputField from '../UI/InputField';

function PasswordField(props:React.InputHTMLAttributes<HTMLInputElement>) {
    const [show,setShow] = React.useState<boolean>(false);

  return (
    <div className={styles.password}>
        <InputField type={show?'text':'password'} {...props} />
        <div className={styles.toggle_eye} onClick={()=>setShow(!show)}>
            {
                show?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1">
                        <path strokeLinejoin="round" d="M10.73 5.073A11 11 0 0 1 12 5c4.664 0 8.4 2.903 10 7a11.6 11.6 0 0 1-1.555 2.788M6.52 6.519C4.48 7.764 2.9 9.693 2 12c1.6 4.097 5.336 7 10 7a10.44 10.44 0 0 0 5.48-1.52m-7.6-7.6a3 3 0 1 0 4.243 4.243"/>
                        <path d="m4 4l16 16"/>
                    </g>
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"/>
                        <path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"/>
                    </g>
                </svg>
            }
        </div>
    </div>
  )
}

export default PasswordField