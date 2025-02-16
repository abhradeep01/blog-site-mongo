import { Close } from '@mui/icons-material';
import { Alert, Button, IconButton } from '@mui/material';
import React from 'react';
import { axiosClient } from '../config/axios';
import { useNavigate } from 'react-router';
import InputBox from '../components/InputBox';

function ForgetPassword() {
  //email input
  const [email,setEmail] = React.useState('')
  //navigation
  const navigation = useNavigate();
  //set response
  const [res,setRes] = React.useState({
    message:'',
    state:false,
    success:false
  });

  //handle submit 
  const handleSubmit =  async (e) =>{
    e.preventDefault();
    try {
      const res = await axiosClient.patch('/auth/forgetpassword',email);
      if(res.status===200){
        setRes({
          ...res,
          message:res.data,
          state:true,
          success:true
        });
        setTimeout(()=>{
          navigation('/verify');
        },3000)
      }else{
        setRes({
          ...res,
          message:res.data,
          state:true,
          success:false
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="w-[100vw] h-[100%] flex justify-center pt-[4rem]">
      <div className="w-[25vw] max-2xl:w-[35vw] max-xl:w-[40vw] max-lg:w-[50vw] max-md:w-[65vw] max-sm:w-[97vw] h-fit py-[2.5rem] px-[1.5rem] bg-white rounded shadow-sm shadow-slate-300">
        <div className="flex flex-col gap-1">
          <div style={{marginBottom:'0.75rem'}}>
            <h3 className="text-[0.95rem] max-sm:font-normal font-medium">
              Please provide your registerd email so, we could send you password reset link
            </h3>
            <InputBox type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="w-full flex flex-row justify-between">
            <Button type='submit' onClick={handleSubmit} variant='contained' size='small' sx={{fontSize:'0.8rem',textTransform:'capitalize',width:'fit-content'}} color='success'>
              submit
            </Button>
            {/* alert section */}
            <Alert variant='outlined' color={res.success?'success':'error'}
            sx={res.state?{width:'100%',height:'2.5rem',display:'flex',flexDirection:'row',alignItems:'center',marginTop:'0.5rem'}:{display:'none'}}
            action={
              <>
                <IconButton size='small' onClick={()=>setRes({...res,state:false})}>
                  <Close fontSize='small' color='error'/>
                </IconButton>
              </>
            }>
              {res.message}
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword