import React from 'react'

const page = () => {
  return (
    <div>
      <h3 className={`text-black text-center text-4xl font-normal`}>Login</h3>
      <form className={`flex flex-col gap-5 my-4`}>
          <input type="text" className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`} placeholder='Email/Username'/>
          <input type="password" className={`h-10 md:w-80 bg-[#CCC5B980] font-sans rounded-md p-2`} placeholder='Password'/>

          <div className={`grid grid-flow-col justify-center items-center gap-3 md:gap-5 md:w-80`}>
              <input type="text" name="otp1" id="otp1" maxLength={1} pattern='[0-9]' placeholder='0' className={`h-10 w-10 bg-[#CCC5B980] font-sans rounded-md text-center`}/>
              <input type="text" name="otp2" id="otp2" maxLength={1} pattern='[0-9]' placeholder='0' className={`h-10 w-10 bg-[#CCC5B980] font-sans rounded-md text-center`}/>
              <input type="text" name="otp3" id="otp3" maxLength={1} pattern='[0-9]' placeholder='0' className={`h-10 w-10 bg-[#CCC5B980] font-sans rounded-md text-center`}/>
              <input type="text" name="otp4" id="otp4" maxLength={1} pattern='[0-9]' placeholder='0' className={`h-10 w-10 bg-[#CCC5B980] font-sans rounded-md text-center`}/>
              <input type="text" name="otp5" id="otp5" maxLength={1} pattern='[0-9]' placeholder='0' className={`h-10 w-10 bg-[#CCC5B980] font-sans rounded-md text-center`}/>
          </div>

          <input type="submit" value="Submit" className={`bg-secondary text-primary w-1/2 mx-auto rounded-md h-10`} />
      </form>
    </div>
  )
}

export default page