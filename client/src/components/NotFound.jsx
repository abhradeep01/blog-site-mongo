import React from 'react'
import { useLocation } from 'react-router';

function NotFound() {
    //location
    const location = useLocation().pathname.split('/');
    const route = location[location.length-1];
    console.log(route);
  return (
    <div className="">
        
    </div>
  )
}

export default NotFound;