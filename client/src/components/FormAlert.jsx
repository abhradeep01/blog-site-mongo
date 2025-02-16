import { Alert } from '@mui/material';

function FormAlert(props) {
  return (
    <Alert sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'1.5rem'}} {...props} >
    </Alert>
  )
}

export default FormAlert;