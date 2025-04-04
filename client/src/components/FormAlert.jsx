import { Alert } from '@mui/material';

function FormAlert(props) {
  return (
    <Alert sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}} {...props} >
    </Alert> 
  )
}

export default FormAlert;