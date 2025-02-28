import React from 'react'

function Header() {
  return (
    <div className="mt-[4rem] w-[80vw] max-lg:w-[90vw] border">
      <div className="w-[60%] flex flex-col gap-1.5">
        <h2 className="text-xl font-semibold">
          News and insights
        </h2>
        <h4 className="text-[0.925rem] font-normal">
          Learn about Web Design, Development, Database, Search Engines and Marketing by visiting our blog page
        </h4>
      </div>
    </div>
  )
}

export default Header;