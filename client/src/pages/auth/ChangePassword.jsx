import React from 'react'
import PasswordBox from '../../components/auth/PasswordBox'
import { ResetIcon } from '../../utilities/icons'
import AuthAlert from '../../components/auth/AuthAlert'
import AuthSuccess from '../../components/auth/AuthSuccess'

function ChangePassword() {
    //password"")
    const [inputs,setInputs] = React.useState(
        {
            newpassword:"",
            confirmpassword:"",
            isMatch: function(){
                return (
                    (this.newpassword === "" && this.confirmpassword === "") ? 
                    null : 
                    (this.newpassword === this.confirmpassword)
                )
            }
        }
    );
    //error
    const [res,setRes] = React.useState(
        {
            state: false,
            success:null,
            message:""
        }
    );

    //handle change
    const handleChange = (e) =>{
        setInputs({...inputs,
            [e.target.name]:e.target.value
        })
    }
    
  return (
    <div className="w-[450px] mt-[5rem] py-[2rem] px-[1.5rem] max-sm:w-[97%] rounded bg-stone-300 flex flex-col ">
        <h2 className="font-ptsanscaption capitalize text-xl font-bold mb-1 text-left">
            reset password
        </h2>
        <p className="font-gothicregular text-[1.05rem] font-light text-stone-600">
            Please type something which you'll remember
        </p>
        <form className="flex flex-col gap-4 mt-2">
            {/* new password */}
            <PasswordBox placeholder="new password" name="newpassword" value={inputs.newpassword} onChange={handleChange}/>
            {/* confirm password */}
            <PasswordBox placeholder="confirm password" name="confirmpassword" value={inputs.confirmpassword} onChange={handleChange}/>
            {
                (inputs.isMatch() === false || res.success === false) &&
                <AuthAlert message={ res.message || (inputs.isMatch()?null:"Password is not matched!") }/>
            }
            <button className='bg-black text-white capitalize mt-1 py-1.5 px-1 rounded font-sen w-fit flex items-center hover:opacity-90 hover:cursor-pointer'>
                reset password <span className='ml-1.5'><ResetIcon/></span>
            </button>
        </form>
        {
            ( res.success === true || inputs.isMatch()) &&
            <AuthSuccess message={ res.message || "Password matched" } />
        }
    </div>
  )
}

export default ChangePassword