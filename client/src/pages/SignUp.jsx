import React from 'react'
import InputBox from '../components/InputBox';
import PasswordInput from '../components/PasswordInput';
import { Button, IconButton, InputAdornment } from '@mui/material';
import GoogleAuth from '../components/GoogleAuth';
import { axiosClient } from '../config/axios';
import { useNavigate } from 'react-router';
import { Camera, Close } from '@mui/icons-material';
import FormAlert from '../components/FormAlert';

function SignUp() {
    //inputs
    const [inputs,setInputs] = React.useState({
        fullname:'',
        username:'',
        email:'',
        password:''
    });
    //img 
    const [img,setImg] = React.useState(null);
    //navigation
    const navigation = useNavigate();
    //res state
    const [res,setRes] = React.useState({
        message:'',
        state:false,
        success:false
    });
    //default user image
    const defaultImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjYiIHI9IjQiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIwIDE3LjVjMCAyLjQ4NSAwIDQuNS04IDQuNXMtOC0yLjAxNS04LTQuNVM3LjU4MiAxMyAxMiAxM3M4IDIuMDE1IDggNC41IiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=';
    
    //handle input change
    const handleChange = (e) =>{
        setInputs({...inputs,[e.target.name]:e.target.value});
    }
    //handle submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            if(inputs.fullname && inputs.username && inputs.email && inputs.password && img){
                const res = await axiosClient.post('/auth/register',{
                    fullname: inputs.fullname,
                    username: inputs.username,
                    email: inputs.email,
                    password:inputs.password,
                    img
                });
                if(res.status===200){
                    setRes({...res,message:res.data,state:true,success:true});
                    navigation('/register');
                }else{
                    setRes({...res,message:'Having some server issue!',state:true,success:false})
                }
            }else{
                setRes({...res,message:'Please fill all required fields!',state:true,success:false})
            }   
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="w-[100vw] h-[100%] flex justify-center">
        <div className="w-[25vw] max-2xl:w-[35vw] max-xl:w-[40vw] max-lg:w-[50vw] max-md:w-[65vw] max-sm:w-[97vw] h-fit bg-white mt-[3.5rem] px-[3rem] py-[4rem] rounded">
            <div className="w-full flex flex-col gap-[1.5rem]">
                <div>
                    <h2 className="text-lg font-medium capitalize text-center">sign up</h2>
                </div>
                <div className="relative w-fit h-fit">
                    <img src={defaultImg} alt="user-img" className='w-[4.5rem] shadow shadow-zinc-400 rounded-sm' />
                    <div className="absolute bottom-0.5 right-0.5">
                        <input type="file" id='img' accept='/*' src="" alt="" className='hidden' value={img} onChange={e=>setImg(e.target.files[0])} />
                        <label htmlFor="img">
                            <Camera/>
                        </label>
                    </div>
                </div>
                <InputBox placeholder='Fullname' name='fullname' value={inputs.fullname} onChange={handleChange} />
                <InputBox placeholder='Username' name='username' value={inputs.username} onChange={handleChange} />
                <InputBox placeholder='Email' name='email' value={inputs.email} onChange={handleChange} />
                <div>
                    <PasswordInput placeholder='Password' name='password' value={inputs.password} onChange={handleChange} />
                    <p className='text-red-500 text-[0.9rem] mt-1'>{"Already have an account?"}<a href="/login" className='ml-1 text-blue-500'>LogIn</a></p>
                </div>
                <FormAlert variant='outlined' color={res.success?'success':'error'} severity={res.success?'success':'error'} sx={res.state?{display:'flex'}:{display:'none'}}
                    action={res.success?null:
                        <InputAdornment position='end'>
                            <IconButton size='small' onClick={()=>setRes({...res,message:'',state:false,success:false})}>
                                <Close fontSize='small'/>
                            </IconButton>
                        </InputAdornment>
                    }
                >
                    {res.message}
                </FormAlert>
                <div className='w-full'>
                    <Button size='small' variant='contained' sx={{fontSize:'0.9rem',textTransform:'capitalize',width:'100%'}} onClick={handleSubmit}>LogIn</Button>
                    <button className='block w-full mt-4'>
                        <GoogleAuth/>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp;