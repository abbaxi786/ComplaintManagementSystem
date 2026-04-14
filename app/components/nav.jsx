'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserContext } from '../lib/context';
import LogOutButton from '../lib/logOut';

function Nav() {
  const { user, loading } = useContext(UserContext);

  // Avoid rendering until authentication state is determined
  if (loading) return null;

  return (
    <div className='md:mx-11 showDown'>
      <div className="navbar bg-emerald-400 text-white shadow-lg px-4 lg:px-10 rounded-b-2xl">
        {/* Left Section - Logo */}
        <div className="navbar-start">
          {/* Mobile Hamburger */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-white text-black rounded-box w-52"
            >
              <li><Link href="/">Home</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/about">About</Link></li>

              {/* Auth Options for Mobile */}
              {!user && (
                <>
                  <li><Link href="/pages/sign">Sign Up</Link></li>
                  <li><Link href="/pages/logIn">Login</Link></li>
                </>
              )}
              {user && (
                <li>
                  <LogOutButton />
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="text-xl font-extrabold">
            Feeder Complaint
          </Link>
        </div>

        {/* Center Section - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-semibold">
            <li>
              <Link href="/" className="hover:underline decoration-emerald-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline decoration-emerald-800">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline decoration-emerald-800">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Authentication */}
        <div className="navbar-end">
          {/* Show Cog Icon ONLY when user is NOT logged in */}
          {!user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <Image
                  src="/icons/settingCog.png"
                  alt="Settings"
                  width={24}
                  height={24}
                />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-white text-black rounded-box w-40"
              >
                <li>
                  <Link href="/pages/logIn">Login</Link>
                </li>
                <li>
                  <Link href="/pages/sign">Sign Up</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Show Profile Dropdown ONLY when user IS logged in */}
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-white p-1">
                  <Image
                    src="/icons/profile.png"
                    alt="Profile"
                    width={32}
                    height={32}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-white text-black rounded-box w-40"
              >
                <li className="px-2 py-1 text-sm text-gray-500">
                  {user?.email}
                </li>
                <li>
                  <LogOutButton />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;