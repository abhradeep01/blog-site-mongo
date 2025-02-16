import { Close } from '@mui/icons-material';
import { Button, IconButton, OutlinedInput } from '@mui/material';
import React from 'react'
import { axiosClient } from '../config/axios';
import { useNavigate } from 'react-router';
import FormAlert from '../components/FormAlert';

function VarificationCode() {
    //code
    const [code,setCode] = React.useState('');
    //navigation
    const navigation = useNavigate();
    //response
    const [res,setRes ] = React.useState({
        message:'',
        state:false,
        success:false
    });

    //handle submit 
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        const res = await axiosClient.post('/auth/varificationcode',code);
        if(res.status===200){
          setRes({
            ...res,message:res.data,state:true,success:true
          });
          setTimeout(()=>{
            navigation('/setpassword');
          },3000);
        }else{
          setRes({
            ...res,message:res.data,state:true,success:false
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className="w-[100vw] h-[100%] flex justify-center pt-[4rem]">
      <div className="w-[25vw] max-2xl:w-[35vw] max-xl:w-[40vw] h-fit py-[2.5rem] px-[1.5rem] max-lg:w-[50vw] max-md:w-[65vw] max-sm:w-[97vw] bg-white rounded shadow-sm shadow-slate-300">
        <div className="flex flex-col">
          <div style={{marginBottom:'0.75rem'}}>
            <h3 className="text-[0.9rem] max-sm:font-normal font-medium">
              Please enter 6-digit code which is send to your Email:
            </h3>
          </div>
          <OutlinedInput type='number' placeholder='6-digit-code' onChange={(e)=>setCode(Number(e.target.value))} 
            sx={{width:'100%',height:'2.5rem',marginBottom:'1.5rem',"::placeholder":{color:'red'}}} value={code} inputProps={{minLength:6,maxLength:6}}
          />
          <div className="w-full flex flex-row justify-between">
            <div className="text-[0.85rem] text-red-500">
              <p className="inline font-normal max-sm:font-normal">{"Didn't get 6-digit code?"}<a className="ml-1 text-blue-500 font-medium capitalize cursor-pointer max-sm:font-medium">resend</a></p>
            </div>
            <Button type='submit' onClick={handleSubmit} variant='contained' size='small' sx={{fontSize:'0.8rem',textTransform:'capitalize'}} color='success'>
              submit
            </Button>
          </div>
          {/* alert section */}
          <FormAlert variant='outlined' color={res.success?'success':'error'} severity={res.success?'success':'error'}
          sx={res.state?{width:'100%',display:'flex',marginTop:'0.5rem'}:{display:'none'}}
          action={
            <>
              <IconButton size='small' onClick={()=>setRes({...res,state:false})}>
                <Close fontSize='small' color='error'/>
              </IconButton>
            </>
          }>
            {res.message}
          </FormAlert>
        </div>
      </div>
    </div>
  )
}

export default VarificationCode;