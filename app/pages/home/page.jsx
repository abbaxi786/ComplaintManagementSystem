'use client';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '@/app/lib/context';
import Tabs from '@/app/components/tab';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LandingPage() {
  const router = useRouter();
  const { user, loading } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [logInMessage, setLogInMessage] = useState('');

  // Fetch user complaints and handle authentication
  useEffect(() => {
    // Wait until authentication status is determined
    if (loading) return;

    // Redirect to login if user is not authenticated
    if (!user || !(user._id || user.id)) {
      router.replace('/pages/logIn'); // Use replace to prevent back navigation
      return;
    }

    const fetchData = async () => {
      try {
        const userId = user._id || user.id;
        console.log('User id is:', userId);

        const response = await axios.get(`/api/usercomplaint/${userId}`);
        console.log('Fetched complaints:', response.data.forms);
        setData(response.data.forms || []);
      } catch (error) {
        console.error('Error fetching complaints:', error.message);
        setData([]);
      }
    };
    fetchData();
  }, [user, loading, router]);

  // Optional loading spinner while checking authentication
  if (loading) {
    return (
      <div className="mt-20 flex justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-500"></span>
      </div>
    );
  }

  return (
    <div className="mt-11 flex flex-col gap-4 px-4 md:px-0">
      {/* Create Complaint Portal Button */}
      <div className="flex justify-end">
        <Link href="/pages/createportal">
          <button className="btn bg-white text-emerald-800 hover:bg-emerald-100 transition-colors">
            Create Complaint Portal
          </button>
        </Link>
      </div>

      {/* Tabs Component */}
      <Tabs ComplaintForm={data} message={logInMessage} />
    </div>
  );
}

export default LandingPage;