import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupForm: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if any of the fields are empty
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        // Check if the passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const backendUrl = `https://simplicio-api-nbop.onrender.com`
            const response = await axios.post(`${backendUrl}/auth/signup`, formData);
            console.log(response);

            toast.success(response.data.message)
        } catch (error: any) {
            const errorMessage = error?.response?.data?.error || "Please fill in data"
            toast.error(errorMessage)
        }
    };


    return (
        <div className='flex justify-center items-center min-h-screen bg-[#235552]'>
            <div className="w-full max-w-md mx-auto overflow-hidden bg-[#235552] rounded-lg shadow-lg lg:max-w-md">
                <div className="flex justify-center mx-auto">
                </div>
                <p className="mt-3 text-xl text-center text-white">Register your Account!</p>
                <div className="flex items-center justify-between mt-4 px-2">
                    <span className="w-1/5 border-b lg:w-1/4"></span>
                    <a href="#" className="text-xs text-center text-white uppercase">Register with email</a>
                    <span className="w-1/5 border-b lg:w-1/4"></span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4 px-4">
                        <label className="block mb-2 text-sm font-medium text-white">Full Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="block w-full px-3 py-2 text-sm text-white bg-[#235552] border-b-2 border-yellow-500  focus:ring-opacity-40 focus:outline-none" type="text" />
                    </div>
                    <div className="mt-4 px-4">
                        <label className="block mb-2 text-sm font-medium text-white">Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} className="block w-full px-3 py-2 text-sm text-white bg-[#235552] border-b-2 border-yellow-500  focus:ring-opacity-40 focus:outline-none" type="email" />
                    </div>
                    <div className="mt-4 px-4">
                        <label className="block mb-2 text-sm font-medium text-white">Password</label>
                        <input name="password" value={formData.password} onChange={handleChange} className="block w-full px-3 py-2 text-sm text-white bg-[#235552] border-b-2 border-yellow-500  focus:ring-opacity-40 focus:outline-none" type="password" />
                    </div>
                    <div className="mt-4 px-4">
                        <label className="block mb-2 text-sm font-medium text-white">confirmPassword</label>
                        <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="block w-full px-3 py-2 text-sm text-white bg-[#235552] border-b-2 border-yellow-500  focus:ring-opacity-40 focus:outline-none" type="password" />
                    </div>
                    {/* More input fields */}
                    <div className="mt-6 px-2">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Sign up
                        </button>
                    </div>
                    <div className="flex items-center justify-between px-2 mt-4 mb-4">
                        <span className="w-1/5 border-b md:w-1/4"></span>
                        <Link to="/login" className="text-xs text-gray-300 uppercase hover:underline">or Login </Link>
                        <span className="w-1/5 border-b md:w-1/4"></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
