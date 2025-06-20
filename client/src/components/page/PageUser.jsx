import useLocalstorage from "../../hooks/useLocalstorage"

function PageUser({username,img}) {
    const {getAuth} = useLocalstorage;
    const currentuser = getAuth('currentuser');
  return (
    <a href={currentuser.username===username?'/profile':`/${username}`} className="w-full h-fit max-md:w-[30%]">
        <div className="w-full">
            <h3 className="font-varta font-semibold">
                Author
            </h3>
            <div className="w-full flex flex-row items-center gap-2 mt-1">
                <img src={img} alt={username} className='aspect-square w-[2.75rem] h-[2.75rem] rounded-full' />
                <h4 className="font-sen font-light text-sm text-green-600">
                    {username}
                </h4>
            </div>
        </div>
    </a>
  )
}

export default PageUser