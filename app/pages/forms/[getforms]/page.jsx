'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function GetComplaintForms() {
    const { getforms } = useParams(); // Access dynamic route parameter
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching complaint forms for: ", getforms);
        if (!getforms) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/info/${getforms}`);
                setForms(response.data);
                console.log("Fetched forms: ", response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch complaint forms.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [getforms]);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 rounded-md hover:shadow-zinc-700 shadow-lg showUp">
            <h1 className="text-2xl font-bold mb-4">
                Complaint Forms for Portal ID: {getforms}
            </h1>

            {forms.length === 0 ? (
                <p>No complaint forms found.</p>
            ) : (
                <form className="space-y-4">
                    <input type='text' placeholder='title'/>
                    <textarea placeholder='description' className='w-full h-32'/>
                    <input type='text' placeholder='phone number'/>
                    <input type='email' placeholder='email'/>
                    {/* <select for="role">
                        {forms.role.map((items, index) => (
                            <option key={index} value={items}>{items}</option>
                        ))}
                    </select> */}
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit Complaint</button>
                </form>
            )}
        </div>
    );
}