'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function GetComplaintForms() {

    const { getforms } = useParams();

    const [forms, setForms] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sendingData, setSendingData] = useState({
        title: '',
        description: '',
        phoneNumber: '',
        clientEmail: '',
        role: '',
        formId: ''
    });

    // FETCH FORM DATA
    useEffect(() => {

        if (!getforms) return;

        const fetchData = async () => {

            try {

                const response = await axios.get(`/api/info/${getforms}`);

                const formData = response.data.data;

                setForms(formData);

                // 🔥 IMPORTANT FIX: use MongoDB _id
                setSendingData((prev) => ({
                    ...prev,
                    formId: formData._id
                }));

            } catch (err) {

                console.error(err);
                setError('Failed to fetch complaint forms.');

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [getforms]);

    // INPUT HANDLER
    const handleChange = (e) => {

        const { name, value } = e.target;

        setSendingData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    // SUBMIT FORM
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                '/api/info',
                sendingData
            );

            console.log(response.data);

            alert('Complaint submitted successfully');

            setSendingData({
                title: '',
                description: '',
                phoneNumber: '',
                clientEmail: '',
                role: '',
                formId: forms._id
            });

        } catch (error) {

            console.error(error);
            alert('Failed to submit complaint');

        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (

        <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg">

            <h1 className="text-2xl font-bold mb-2">
                {forms?.title}
            </h1>

            <p className="mb-4">
                {forms?.description}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Title */}
                <input
                    name="title"
                    value={sendingData.title}
                    onChange={handleChange}
                    placeholder="Complaint Title"
                    className="input input-bordered w-full"
                    required
                />

                {/* Description */}
                <textarea
                    name="description"
                    value={sendingData.description}
                    onChange={handleChange}
                    placeholder="Complaint Description"
                    className="textarea textarea-bordered w-full"
                    required
                />

                {/* Phone + Email */}
                <input
                    name="phoneNumber"
                    value={sendingData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    name="clientEmail"
                    value={sendingData.clientEmail}
                    onChange={handleChange}
                    placeholder="Email"
                    className="input input-bordered w-full"
                    required
                />

                {/* ROLE */}
                <select
                    name="role"
                    value={sendingData.role}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                >

                    <option value="">Select Role</option>

                    {forms?.role?.map((r, i) => (
                        <option key={i} value={r}>
                            {r}
                        </option>
                    ))}

                </select>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit Complaint
                </button>

            </form>

        </div>
    );
}