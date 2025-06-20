import React from 'react'

function useBreakPoint() {
    //size state
    const [width,setWidth] = React.useState(window.innerWidth);
    //useeffect
    React.useEffect(()=>{
        // event func 
        const handleSize = () => setWidth(window.innerWidth);
        //resize event
        window.addEventListener('resize',handleSize);

        //clean up
        return () => window.removeEventListener('resize',handleSize)
    },[]);
  return {
    isPhone: width < 640,
    isSmallTab: width < 768 && width >= 640,
    isTab: width <= 1024 && width >= 768,
    isLaptop: width > 1024 && width < 1280 ,
    isDesktop : width > 1280 && width < 1536,
    isLargeDesktop: width >= 1536 ,
    width: width
  }
}

export default useBreakPoint;