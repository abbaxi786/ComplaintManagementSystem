'use client';
import React from 'react'
import { UserContext } from '@/app/lib/context';
import axios from 'axios';

function Portal() {

    const { user } = React.useContext(UserContext);
    const [role, setRole] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [newRole, setNewRole] = React.useState("");

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function AddRole() {
        if (newRole.trim()) {
            setRole([...role, newRole]);
            setNewRole("");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            console.log({ title, description, role });
            // Add your API call or submission logic here
                axios.post('/api/complaintForm', {
                    title,
                    description,
                    role,
                    userId: user._id
                })
                .then(response => {
                    console.log('Portal created successfully:', response.data);
                    // Reset the form or navigate to another page
                    setTitle("");
                    setDescription("");
                    setRole([]);
                })
                .catch(error => {
                    console.error('Error creating portal:', error);
                });
        }
    }

    return (
        <form className="max-w-md mx-auto mt-10 p-6 rounded-md hover:shadow-zinc-700 shadow-lg showUp" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter Portal Name"
                className="border border-gray-300 rounded-md p-2 w-full mb-4 big"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Portal Description"
                className="border border-gray-300 big rounded-md p-2 w-full mb-4"
                rows={4}
            ></textarea>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Enter the role"
                    className="border border-gray-300 big rounded-md p-2 flex-1"
                />
                <button type="button" onClick={AddRole} className="bg-emerald-500 big text-white rounded-md px-4 py-2">
                    Add Role
                </button>
            </div>
            {role.length > 0 && (
                <div className="mb-4">
                    {role.map((r, idx) => (
                        <span key={idx} className="inline-block bg-emerald-200 text-emerald-800 px-2 py-1 rounded mr-2 mb-2">
                            {r}
                        </span>
                    ))}
                </div>
            )}
            <button type="submit" className="bg-emerald-500 big text-white px-4 py-2 rounded-md">
                Create Portal
            </button>
        </form>
    );
}

export default Portal;