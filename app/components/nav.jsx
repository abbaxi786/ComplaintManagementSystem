'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserContext } from '../lib/context';
import LogOutButton from '../lib/logOut';

function Nav() {

  const { user } = React.useContext(UserContext);

  const [show, setShow] = React.useState(false);

  const [showList,setShowList]= React.useState(false);

  React.useEffect(() => {
    if (user) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [user]);

  return (
    <nav className='flex showDown justify-around text-white bg-emerald-400 p-5 mx-11 rounded-b-2xl'>
      <Link href="/"><h1 className='font-extrabold text-xl'>Feeder Complaint</h1></Link>
      <ul className='flex gap-4'>
        <li>
          <Link className='hover:underline decoration-emerald-800' href="/">Home</Link>
        </li>
        <li>
          <Link className='hover:underline decoration-emerald-800' href="/contact">Contact</Link>
        </li>
        <li>
          <Link className='hover:underline decoration-emerald-800' href="/about">About</Link>
        </li>
        <li>
          <Image src={'/icons/settingCog.png'} alt="Setting Cog" width={25} height={25} />
        </li>

        {show ? (
          <li
            onMouseEnter={() => setShowList(true)}
            onMouseLeave={() => setShowList(false)}
            className='relative'
          >
            <Image src={'/icons/profile.png'} alt="Profile icon" width={25} height={25} />
            {showList && (
              <ul className='absolute bg-white/60 font-bold flex flex-col gap-0.5 p-2 mt-1 rounded shadow-lg z-10'>
                <li className='rounded px-2 py-0.5 bg-emerald-500 text-white'><Link href={'/pages/sign'}>Register</Link></li>
                <li className='rounded px-2 py-0.5 text-white bg-amber-300'><Link href={'/pages/logIn'}>LogIn</Link></li>
                <li className='rounded'><LogOutButton/></li>
              </ul>
            )}
          </li>
        ) : (
          <li>
            <Link className='showBig showDown py-1 px-2 rounded bg-black text-white' href="/pages/logIn">LogIn</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;