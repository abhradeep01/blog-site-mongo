import { Alert, Button } from '@mui/material'
import React from 'react'
import PasswordInput from '../components/PasswordInput';
import { axiosClient } from '../config/axios';
import { useNavigate } from 'react-router';

function ConfirmPassword() {
    //response
    const [res,setRes] = React.useState({
        message:'',
        state:false,
        success:false
    });
    //password
    const [password,setPassword] = React.useState('');
    //confirm password
    const [confirmpassword,setConfirmpassword] = React.useState('');
    //password is same 
    const isMatched = password === confirmpassword;
    //navigation
    const navigation = useNavigate();

    //handle submit
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        const res = await axiosClient.patch('/auth/changepassword',password);
        if(res.status===200){
          setRes({...res,message: res.data,state:true,success:true});
          setTimeout(()=>{
            navigation('/login');
          },3000);
        }else{
          setRes({...res,message:res.data,state:true,success:false})
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center pt-[4rem]">
      <div className="w-[22.5vw] h-fit py-[2.5rem] px-[1.5rem] max-[1025px]:w-[60vw] max-sm:w-[97vw] bg-white rounded shadow-sm shadow-slate-300">
        <div className="flex flex-col">
          <div style={{marginBottom:'0.75rem'}}>
            <h3 className="text-[0.95rem] max-sm:font-normal font-medium">
              Please set your password:
            </h3>
          </div>
          <PasswordInput placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
          <PasswordInput placeholder='Confirm Password' value={confirmpassword} onChange={e=>setConfirmpassword(e.target.value)}/>
          <div className="w-full flex flex-row justify-between">
            <Button onClick={handleSubmit} size='small' variant='contained' sx={{fontSize:'0.75rem',textTransform:'capitalize',width:'fit-content'}}>
              change password
            </Button>
            {/* alert for if password is matched */}
            <Alert variant='outlined' severity={isMatched?'success':'error'} color={isMatched?'success':'error'} sx={password && confirmpassword?{display:'flex',flexDirection:'row',alignItems:'center'}:{display:'none'}} >
              {isMatched?'Password is matched':'Password is not matched'}
            </Alert>
          </div>
          {/* alert popup when password is changed */}
          <Alert variant='outlined' severity={res.success?'success':'error'} color={res.success?'success':'error'} sx={res.state?{display:'inline'}:{display:'none'}} >
            {res.message}
          </Alert>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPassword