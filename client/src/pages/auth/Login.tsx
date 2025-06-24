import React from 'react'
import InputField from '../../components/UI/InputField';
import type { loginInput } from '../../types';
import PasswordField from '../../components/auth/PasswordField';
import GoogleAuthBtn from '../../components/auth/GoogleAuthBtn';
import { Link } from 'react-router';
import AuthWrapper from '../../components/auth/AuthWrapper';

function Login() {
    const [inputs,setInputs] = React.useState<loginInput>({
        type:'',
        password:''
    });
    const [remember,setRemember] = React.useState<boolean>(false);

    const handleOnchange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }
    
  return (
    <AuthWrapper>
        <h1>Login</h1>
        <form className="form">
            <InputField name='type' value={inputs.type} onChange={handleOnchange} placeholder='username OR email' />
            <div style={{width:'100%',display:'flex',flexDirection:'column',gap:'0.4rem'}}>
                <PasswordField name='password' value={inputs.password} onChange={handleOnchange} placeholder='password'/>
                <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:'space-between'}}>
                    <div style={{width:"100%",display:'flex',flexDirection:'row',alignItems:'center',fontSize:"15px",gap:'0.25rem'}}>
                        <input type="checkbox" checked={remember===true?true:false} onChange={()=>setRemember(!remember)}  id='remember' />
                        <label htmlFor="remember">Remember Me</label>
                    </div>
                    <Link to="/forget" style={{textAlign:'right',color:'blue'}}>Forget Password?</Link>
                </div>
            </div>
            <button type='submit'>
                LogIn <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7"/>
                </svg>
            </button>
        </form>
        <p style={{margin:'0.75rem'}}>OR</p>
        <GoogleAuthBtn/>
    </AuthWrapper>
  )
}

export default Login