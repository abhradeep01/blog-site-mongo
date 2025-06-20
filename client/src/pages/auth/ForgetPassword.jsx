import React from 'react';
import InputBox from '../../components/auth/InputBox';
import { SendIcon } from '../../utilities/icons';
import OrAuth from '../../components/auth/OrAuth';
import AuthAlert from '../../components/auth/AuthAlert';
import AuthSuccess from '../../components/auth/AuthSuccess';
import { useDispatch, useSelector } from 'react-redux';

function ForgetPassword() {
    // user
    const [username,isUsername] = React.useState(false);
    // dispatch
    const dispatch = useDispatch();
    // state
    const state = useSelector(state=>state.auth);

  return (
    <div className="w-[450px] mt-[5rem] py-[2rem] px-[1.5rem] max-sm:w-[97%] rounded bg-stone-300 flex flex-col items-center">
        <h2 className="font-varelaround capitalize text-xl font-bold mb-1.5 text-left">
            forget password?
        </h2>
        <p className="font-gothicregular text-[1.05rem] font-light text-stone-600 text-center">
            Don't worry! It happens. {username?
                "Please enter your account's username.":
                "Please enter the email associated with your account."
            }
        </p>
        <form className="w-full mt-3">
            <InputBox 
                type={username?
                    "text":
                    "email"
                }
                placeholder={username?
                    "Enter your username":
                    "Enter your email address"
                }
            />
            {
                res.success===false && 
                <AuthAlert message={res.message}/>
            }
            <div className="w-full flex flex-row items-center justify-between mt-3">
                <button type='submit' className='bg-black text-sm text-white capitalize py-[0.3rem] px-1.5 rounded font-sen w-fit flex items-center hover:opacity-90 hover:cursor-pointer'>
                    send code <SendIcon className="size-4 ml-1"/>
                </button>
                <a href="/register" className='text-red-500 font-gothicregular hover:text-red-400'>
                    Doesn't have any account?
                </a>
            </div>
        </form>
        <div className='w-full mt-2 text-center'>
            <OrAuth name={"or forget email"}/>
            <button className='w-fit px-1.5 py-1 rounded font-gothicregular underline text-blue-600 underline-offset-[3px] hover:cursor-pointer' onClick={()=>isUsername(!username)}>
                {
                    username?
                    "Use email Instead Of username":
                    "Use username Instead Of Email"
                }
            </button>
        </div>
        {
            res.success===true &&
            <AuthSuccess message={res.message}/>
        }
    </div>
  )
}

export default ForgetPassword