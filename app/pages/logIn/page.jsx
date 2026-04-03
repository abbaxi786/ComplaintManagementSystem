'use client'
import React from 'react'
import Image from 'next/image';
import axios from 'axios';
import Message from '@/app/components/message';
import { useRouter } from "next/navigation";
import { UserContext } from '@/app/lib/context';


function LogIn() {

  const {setUser}= React.useContext(UserContext);

  const [data, setData] = React.useState({
      email: '',
      password: '',
    });
    
    const router = useRouter();

    
    const [show,setShow]= React.useState(false);
    function func(){
      setShow(!show);
    }
    const [notification,setNotification]=React.useState({
      message:"",
      indicator:""
    });
    console.log(show);

    


    async function SubmitLogIn(){
      try {
        const response = await axios.post('/api/user', {
          ...data,
          action: 'login'
        });        

        if (response.data.success) {
          console.log(response.data);
          setUser(response.data.data);
          setNotification({message:response.data.message,indicator:0});
          func();
          router.push('/');
        }
        else {
          setNotification({message:response.data.message,indicator:1});
          func();
        }


      } catch (error) {
        console.error("Error submitting data:", error);
        setNotification({message:error.message,indicator:2});
        func();
      }
    }
  
    function SetValue(e) {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value
      });
    }
  
  return (
      <div className='flex flex-col-reverse showUp  md:flex-row min-h-screen'>
        {show?<Message message={notification.message} func={func} indicator={notification.indicator}/>: null}      
        <div className='w-full md:w-1/2 flex items-center justify-center p-6'>
          <div className='w-full border border-black p-3 rounded drop-shadow-emerald-700 md:w-2/3'>
            <h1 className='text-2xl showBig md:text-3xl rounded bg-emerald-400 text-white font-bold mb-4 p-2 text-center'>
              Log In
            </h1>
            <input
              name="email"
              onChange={SetValue}
              value={data.email}
              type='email'
              required
              placeholder='Email'
              className='w-full border big p-2 mb-3'
            />
  
            <input
              name="password"
              required
              onChange={SetValue}
              value={data.password}
              type='password'
              placeholder='Password'
              className='w-full border big p-2 mb-3'
            />

  
            <button onClick={SubmitLogIn} className='w-full move move bg-black text-white p-2'>
              Log In
            </button>
          </div>
        </div>
  
        {/* Image Section */}
        <div className='w-full md:w-1/2 relative h-64 md:h-auto'>
          <Image
            src='/bg/bg2.png'
            alt='sideBackground'
            fill
            className='object-contain'
          />
        </div>
  
      </div>
    )
}

export default LogIn;