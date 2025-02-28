import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useLocation, useNavigate } from 'react-router'
import { axiosClient } from '../config/axios'

function Home() {
  //navigation
  const navigation = useNavigate();
  //category
  const cat = useLocation().search
  //posts
  const [data,setdata] = useState({});

  useEffect(()=>{
    const homeFetch = async () => {
      try {
        const res = await axiosClient(`/posts${cat}`);
        if(res.status===200){
          setdata(res.data);
          // console.log(res.data);
        }else{
          navigation('/login')
        }
      } catch (error) {
        // navigation('/login')
        console.log(error);
      }
    }
    homeFetch();
  },[cat,navigation])
  return (
    <>
      <Header/>
    </>
  )
}

export default Home