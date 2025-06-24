import React from 'react'
import AuthWrapper from '../../components/auth/AuthWrapper'
import PasswordField from '../../components/auth/PasswordField'
import type { passwordSet } from '../../types'
import {} from 'react-toastify'

function ChangePassword() {
    const [input,setInput] = React.useState<passwordSet>({
        newPassword:'',
        confirmPassword:''
    });

    const isSame:boolean = (input.newPassword === input.confirmPassword);

    const handleOnchange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
  return (
    <AuthWrapper>
        <h1>Reset Password</h1>
        <form>
            <PasswordField name='newPassword' value={input.newPassword} onChange={handleOnchange} placeholder='New Password'/>
            <PasswordField name='confirmPassword' value={input.confirmPassword} onChange={handleOnchange} placeholder='Confirm Password'/>
            <button>
                Change Password <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7"/>
                </svg>
            </button>
        </form>
    </AuthWrapper>
  )
}

export default ChangePassword