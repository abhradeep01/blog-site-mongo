import React from 'react'
import AuthWrapper from '../../components/auth/AuthWrapper'
import './auth.scss'
import type { registerInput } from '../../types'
import InputField from '../../components/UI/InputField'
import PasswordField from '../../components/auth/PasswordField'
import { Link } from 'react-router'
import GoogleAuthBtn from '../../components/auth/GoogleAuthBtn'

function Register() {
    const [inputs,setInputs] = React.useState<registerInput>({
        fullname:'',
        username:'',
        email:'',
        password:'',
        confirm:'',
        type:''
    });
    const [terms_condition,setTerms_condition] = React.useState<boolean>(false);

    const handleOnchange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }
    console.log({...inputs,terms_condition});
  return (
    <AuthWrapper>
        <div className="register-header">
            <div className="sub-header">
                <h1>Create Account</h1>
                <Link to="/login">Alraedy have account?<span>login</span></Link>
            </div>
            <select name="type" value={inputs.type} id="" onChange={(e)=>setInputs({...inputs,type:e.target.value})} >
                <option value="select">select type</option>
                <option value="employee">as employee</option>
                <option value="employeer">as employeer</option>
            </select>
        </div>
        <form className='registration-form'>
            <InputField type='text' name='fullname' value={inputs.fullname} onChange={handleOnchange} placeholder='enter your full name'/>
            <InputField type='text' name='username' value={inputs.username} onChange={handleOnchange} placeholder='enter your username'/>
            <InputField type='email' name='email' value={inputs.email} onChange={handleOnchange} placeholder='enter your email'/>
            <PasswordField name='password' value={inputs.password} onChange={handleOnchange} placeholder='enter your password'/>
            <div style={{
                width:'100%',
                display:'flex',
                flexDirection:'column',
                gap:'0.25rem'
            }}>
                <PasswordField name='confirm' value={inputs.confirm} onChange={handleOnchange} placeholder='confirm password'/>
                <div style={{
                    width:"100%",
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:'0.225rem',
                    fontSize:'15px'
                }}>
                    <input type="checkbox" checked={terms_condition} onChange={()=>setTerms_condition(!terms_condition)} id='terms_condition' />
                    <label htmlFor="terms_condition">{"I've read and agree with our "}</label>
                    <div style={{color:'blue',textDecoration:'underline',textUnderlineOffset:'3px'}}>Terms & Services</div>
                </div>
            </div>
            <button>
                Create Account <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7"/>
                </svg>
            </button>
        </form>
        <p style={{margin:'0.75rem'}}>OR</p>
        <GoogleAuthBtn/>
    </AuthWrapper>
  )
}

export default Register