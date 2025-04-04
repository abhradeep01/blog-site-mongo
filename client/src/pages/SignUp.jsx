import React from 'react'
import InputBox from '../components/InputBox';
import PasswordInput from '../components/PasswordInput';
import { Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import GoogleAuth from '../components/GoogleAuth';
import { axiosClient } from '../config/axios';
import { useNavigate } from 'react-router';
import { Camera, Close, CloudUpload } from '@mui/icons-material';
import FormAlert from '../components/FormAlert';

function SignUp() {
    //inputs
    const [inputs,setInputs] = React.useState({
        fullname:"",
        username:"",
        email:"",
        password:""
    });
    //img 
    const [img,setImg] = React.useState({});
    //img loading
    const [imgloading,setImgloading] = React.useState(false);
    //img url
    const [imgurl,setImgurl] = React.useState('');
    //url
    const [url,setUrl] = React.useState('');
    //navigation
    const navigation = useNavigate();
    //res state
    const [res,setRes] = React.useState({
        message:'',
        state:false,
        success:false
    });
    //img res
    const [imgres,setImgres] = React.useState('');
    //default img
    const defaultImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjYiIHI9IjQiIGZpbGw9IiM2ODY4NjgiLz48cGF0aCBmaWxsPSIjNjg2ODY4IiBkPSJNMjAgMTcuNWMwIDIuNDg1IDAgNC41LTggNC41cy04LTIuMDE1LTgtNC41UzcuNTgyIDEzIDEyIDEzczggMi4wMTUgOCA0LjUiLz48L3N2Zz4='

    
    //handle img
    const imageChange = (e) =>{
        const file = e.target.files[0];
        setImg(img);
        try {
            const reader = new FileReader();
            reader.onload = () =>{
                setImgurl(reader.result)
            }
            reader.readAsDataURL(file);
        } catch (error) {
            console.log(error);
        }
    }
    // image upload
    const imgUpload =  async (e) =>{
        e.preventDefault();
        try {
            setImgloading(true);
            const response = await axiosClient.post('/upload/userimage',imgurl);
            if(response.status===200){
                setUrl(response.data);
                setImgres('Image uploaded successfully');
                setTimeout(() => {
                    setImgres('');
                }, 2000);
            }else{
                setRes({...res,message:response.data,state:true,success:false})
            }
        } catch (error) {
            console.log(error);
        }finally{
            setImgloading(false)
        }
    }
    //handle input change
    const handleChange = (e) =>{
        setInputs({...inputs,[e.target.name]:e.target.value});
    }
    //handle submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            if(inputs.fullname && inputs.username && inputs.email && inputs.password && imgurl ){
                const res = await axiosClient.post('/auth/register',{
                    ...inputs,
                    url
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
                <div className='w-full flex flex-row justify-between'>
                    <div className="relative w-fit h-full">
                        <img src={imgurl?imgurl:defaultImg} alt="user-img" className='w-[5rem] object-cover h-[5rem] rounded shadow'/>
                        <input type="file" accept='/*' id='img' className='hidden' onChange={imageChange} />
                        <label htmlFor="img" className='absolute bottom-1 right-1 border border-zinc-200 rounded bg-white h-fit flex justify-center'>
                            <Camera fontSize='small'/>
                        </label>
                    </div>
                    <div className='w-[40%] flex items-center gap-0.5'>
                        <Button variant='contained' size='small' endIcon={imgloading?<CircularProgress size={20}/>:<CloudUpload fontSize='small'/>} 
                            sx={{fontSize:'0.75rem',textTransform:'capitalize',height:'fit-content'}} color='success' onChange={imgUpload}
                        >
                            upload
                        </Button>
                        <p className={imgres?'block text-[0.9rem] text-green-600 font-normal':'hidden'}>{imgres}</p>
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
                    action={res.success?
                        imgloading?<CircularProgress size={20} sx={{color:'white'}}/>:null
                        :
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
                    <Button size='small' variant='contained' sx={{fontSize:'0.9rem',textTransform:'capitalize',width:'100%'}} onClick={handleSubmit}>SignUp</Button>
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