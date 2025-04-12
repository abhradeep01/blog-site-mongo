import React from 'react'
import useBreakPoint from '../hooks/useBreakPoint';
import Header from '../components/Header';

function Home() {
    //loader 
    const [loading,setLoading] = React.useState(false);
    //mediaquery
    const {width} = useBreakPoint()

  return (
    <div className="mt-[4.5rem] w-[1500px] max-2xl:w-[1200px] max-xl:w-[1000px] max-lg:w-[90%] max-md:w-[95%] max-sm:w-[98%]">
        <Header/>
    </div>
  )
}

export default Home;