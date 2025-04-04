import React from 'react'

function Header() {
  return (
    <div className="w-full flex flex-row justify-between max-md:items-center">
      <div className="w-[60%] flex flex-col justify-around max-md:w-[80%] max-sm:w-[59%] max-md:gap-1 flo">
        <h2 className="text-xl text-blue-600 font-semibold underline">
          News, Insights and Blogs
        </h2>
        <h4 className="text-[0.95rem] font-normal">
          Here, you can learn about <p className='inline text-rose-600 text-[0.9rem] font-[400]'>Development, Database, Web Designing, Artificial Intelligence, Machine Learning Digital Marketing and Cryptography. </p>
          And you can <span className='text-green-700'>Post, </span><span className='text-green-700'>Read, </span> and <span className='text-green-700'>Write</span> Artical or Blogs. 
        </h4>
      </div>
      <div className="w-[40%] max-lg:w-[15%] max-sm:w-[35%] flex justify-center">
        <img src="https://preview.redd.it/7fm9cx5cwatc1.png?width=1080&format=png&auto=webp&s=3b02d2e7f2897679421b5e00d56b4031716123c5" alt="" className='w-[25%] max-lg:w-full rounded-xl aspect-[1/1]' />
      </div>
    </div>
  )
}

export default Header;