import React from 'react'
import InputBox from '../components/InputBox'
import PasswordInput from '../components/PasswordInput';
import GoogleAuth from '../components/GoogleAuth';
import { Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import FormAlert from '../components/FormAlert';
import { axiosClient } from '../config/axios';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router';

function LogIn() {
    //input info
    const [inputs,setInputs] = React.useState({
        email:'',
        password:''
    });
    //set checked or not
    const [isChecked,setIsChecked] = React.useState(false);
    //set response
    const [res,setRes]  = React.useState({
        message:'',
        state:false,
        success:false
    });
    //navigate
    const navigation = useNavigate();


    //handle change 
    const handleChange = async (e) =>{
        setInputs({...inputs,[e.target.name]:e.target.value});
    }
    //handle submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            if (inputs.email && inputs.password) {
                const response = await axiosClient.post('/auth/login',{
                    email: inputs.email,
                    password: inputs.password,
                    remeber: isChecked
                });
                if(response.status===200){
                    setRes({...res,message:response.data.message+"redirecting to home page",state:true,success:true});
                    localStorage.setItem('currentuser',JSON.stringify(response.data.data));
                    setTimeout(() => {
                        navigation('/')
                    }, 2000);
                }else{
                    setRes({...res,message:response.data,state:true,success:false});
                }    
            } else {
                setRes({...inputs,message:"fill all required fields",state:true})
            }
        } catch (error) {
            setRes({...res,message:error,state:true,success:false});
        }
    }
    //handle google auth click
    const handleGoogleAuth = async (e) =>{
        e.preventDefault();
    }
  return (
    <div className="w-[100%] h-[100%] flex justify-center">
        <div className="w-[25vw] max-2xl:w-[35vw] max-xl:w-[40vw] max-lg:w-[50vw] max-md:w-[65vw] max-sm:w-[97vw] h-fit bg-white mt-[3.5rem] px-[1.5rem] py-[4rem] rounded">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div>
                    <h2 className="text-center text-[1.1rem] font-semibold capitalize ">LogIn</h2>
                </div>
                <InputBox type='email' placeholder='Email' name='email' value={inputs.email} onChange={handleChange} />
                <div>
                    <PasswordInput name='password' value={inputs.password} onChange={handleChange} />
                    <div className="w-full flex justify-between">
                        <div className='w-fit flex items-center'>
                            <input type="checkbox" id='remember' checked={isChecked===true} name='remember' value={isChecked} onChange={()=>setIsChecked(!isChecked)} />
                            <label htmlFor="remember" className='ml-1 text-[0.9rem] text-blue-500 font-normal'>Remember me</label>
                        </div>
                        <div>
                            <a href="/forgetpassword" className='text-red-500 text-[0.9rem]'>forget password?</a>
                        </div>
                    </div>
                </div>
                <FormAlert variant='outlined' color={res.success?'success':'error'} severity={res.success?'success':'error'} sx={res.state?{display:'flex'}:{display:'none'}}
                    action={
                        <InputAdornment position='end'>
                            {
                                res.success?
                                <IconButton size='small' >
                                    <CircularProgress color='success' size={15}/>
                                </IconButton>:
                                <IconButton size='small' onClick={()=>setRes({...res,message:'',state:false,success:false})}>
                                    <Close color='error' fontSize='small'/>
                                </IconButton>
                            }
                        </InputAdornment>
                    }
                >
                    {res.message}
                </FormAlert>
                <div className="w-full">
                    <Button type='submit' size='small' variant='contained' sx={{fontSize:'0.85rem',textTransform:'capitalize',width:'100%'}}>LogIn</Button>
                    <button className='block w-full mt-4' onClick={handleGoogleAuth}>
                        <GoogleAuth />
                    </button>
                    <p className='text-red-500 text-[0.9rem] mt-1'>{"Don't have any account?"} <a href="/signup" className='text-blue-500'>Sign Up</a></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LogIn