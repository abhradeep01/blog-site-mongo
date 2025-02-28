function InputBox(props) {
  return (
    <input
      className='w-full h-[2.5rem] p-1.5 rounded border border-gray-400 focus:outline-gray-800 focus:outline-none'
      {...props}
    />
  )
}

export default InputBox;