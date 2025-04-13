import React from 'react'

function useTheme() {
  //theme
  const [dark,setDark]= React.useState(false);

  //useeffect
  React.useEffect(()=>{
    if(dark){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
  },[dark]);

  const toggleTheme = () =>{
    setDark(!dark);
  }

  return {
    dark,
    toggleTheme
  }
}

export default useTheme;