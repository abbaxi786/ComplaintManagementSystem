'use client'
import React from 'react';
import { UserContext } from './context';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
function LogOutButton() {

    const {setUser}= React.useContext(UserContext); 

    // const router= useRouter();

    async function Out(){
        try{
            const response = await axios.post("/api/user",{action:'logout'},{withCredentials:true});
            console.log('logout '+JSON.stringify(response.data));
            if(response.data.success){
                console.log(response.data);
                // alert("The user is logout");
                setUser(null);
                // router.push('/');
                                
            }           

        }catch(error){
            console.log(error.message);
        }
    }
    

  return (
    <button onClick={()=>Out()} className='px-2 py-0.5 cursor-pointer rounded bg-red-500 text-white'>LogOut</button>
  )
}

export default LogOutButton;