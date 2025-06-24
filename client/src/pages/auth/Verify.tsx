import React from 'react'
import './auth.scss'
import AuthWrapper from '../../components/auth/AuthWrapper'
import InputField from '../../components/UI/InputField';

function Verify() {
    const [otp,setOtp] = React.useState<number|string>();
  return (
    <AuthWrapper>
        <h1>Verify Code</h1>
        <p>We have sent verification code to your <span>Example.com</span></p>
        <form className="form">
            <InputField type='number' placeholder='enter verification code' value={otp} maxLength={6} max={6} onChange={(e)=>setOtp(e.target.value)} />
            <button type='submit'>
                Verify <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7"/>
                </svg>
            </button>
        </form>
        <p style={{margin:'1rem',fontSize:'16px'}}>OR</p>
        <button style={
            {color: 'white',
            backgroundColor:'rgb(5, 180, 20)',
            display: 'flex',
            alignItems: 'center',
            gap:'0.5rem',
            fontSize:'16px',
            border:'none',
            padding:'0.5rem',
            borderRadius:'0.25rem'}
        }>
            Resend <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" d="M5.5 13L18 6m-1.75 17.5h.25a72.7 72.7 0 0 1 6.504-21.962L23.26 1L23 .74l-.538.256A72.7 72.7 0 0 1 .5 7.5v.25l5 5v7.75h.25l1.774-1.69a12 12 0 0 1 2.313-1.723z" strokeWidth="1"/>
                </svg>
        </button>
    </AuthWrapper>
  )
}

export default Verify