import React from 'react'
import AuthWrapper from '../../components/auth/AuthWrapper'
import { Link } from 'react-router'
import InputField from '../../components/UI/InputField'

function ForgetPassword() {
    const [input,setInput] = React.useState<string>('')
  return (
    <AuthWrapper>
        <h1>Forget Password</h1>
        <Link to="/login">Go back to <span>Login</span></Link>
        <Link to="/register">Do not have account? <span>Create Account</span></Link>
        <form style={{marginTop:'1.25rem'}}>
            <InputField value={input} onChange={(e)=>setInput(e.target.value)} placeholder='username or email'/>
            <button>
                Send Verification Code <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" d="M5.5 13L18 6m-1.75 17.5h.25a72.7 72.7 0 0 1 6.504-21.962L23.26 1L23 .74l-.538.256A72.7 72.7 0 0 1 .5 7.5v.25l5 5v7.75h.25l1.774-1.69a12 12 0 0 1 2.313-1.723z" strokeWidth="1"/>
                </svg>
            </button>
        </form>
    </AuthWrapper>
  )
}

export default ForgetPassword