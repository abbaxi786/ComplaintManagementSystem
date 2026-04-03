'use client';
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import Message from '@/app/components/message';
import { useRouter } from "next/navigation";

function SignIn() {
  const [data, setData] = React.useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();


  const [show, setShow] = React.useState(false);
  function func() {
    setShow(!show);
  }
  const [notification, setNotification] = React.useState({
    message: "",
    indicator: 0
  });

  function SetValue(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  async function SubmiteData() {
    if (data.password !== data.confirmPassword) {
      setNotification({ message: "Passwords do not match", indicator: 2 })
      func();
      return;
    }

    try {
      const response = await axios.post('/api/user', {
        ...data,
        action: 'register'
      });

      if (response.data.success) {
        setNotification({ message: response.data.message, indicator: 0 })
        func();
        router.push('/pages/logIn');
      }
      else {
        setNotification({ message: response.data.message, indicator: 0 });
        func();
      }

    } catch (error) {
      console.error("Error submitting data:", error);
      setNotification({ message: error.message, indicator: 0 });
      func();
    }
  }



  return (
    <div className='flex showUp flex-col-reverse md:flex-row min-h-screen'>
        {show?<Message message={notification.message} func={func} indicator={notification.indicator}/>: null}      
      {/* Form Section */}
      <div className='w-full md:w-1/2 flex items-center justify-center p-6'>
        <div className='w-full md:w-2/3'>
          <h1 className='text-2xl md:text-3xl showBig rounded  bg-emerald-400 text-white font-bold mb-4 p-2 text-center'>
            Sign In
          </h1>

          <input
            name="userName"
            onChange={SetValue}
            value={data.userName}
            type="text"
            placeholder='Username'
            className='w-full border big p-2 mb-3'
          />

          <input
            name="email"
            onChange={SetValue}
            value={data.email}
            type='email'
            placeholder='Email'
            className='w-full border big p-2 mb-3'
          />

          <input
            name="password"
            onChange={SetValue}
            value={data.password}
            type='password'
            placeholder='Password'
            className='w-full border big p-2 mb-3'
          />

          <input
            name="confirmPassword"
            onChange={SetValue}
            value={data.confirmPassword}
            type='password'
            placeholder='Confirm Password'
            className='w-full border big p-2 mb-3'
          />

          <button className='w-full move move bg-black text-white p-2' onClick={SubmiteData}>
            Sign In
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className='w-full md:w-1/2 relative h-64 md:h-auto'>
        <Image
          src='/bg/bg.png'
          alt='sideBackground'
          fill
          className='object-contain'
        />
      </div>
    </div>
  )
}

export default SignIn;