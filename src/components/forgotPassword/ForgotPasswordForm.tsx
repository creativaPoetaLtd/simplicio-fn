import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordForm: React.FC = () => {

    const [formData, setFormData] = useState({
        email: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const backendUrl = 'https://simplicio-backend-tvl39.ondigitalocean.app';
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendUrl}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ email: formData.email })
            })
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            console.error("Error", error);

            toast.error('Internal Server error')
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-[#235552]'>
            <div className="w-full max-w-md mx-auto overflow-hidden bg-[#235552] rounded-lg shadow-lg lg:max-w-md">
                <div className="flex justify-center mx-auto">
                </div>
                <p className="mt-3 text-xl text-center text-white">Forgot your Password!</p>
                <div className="flex items-center justify-between mt-4 px-2">
                    <span className="w-1/5 border-b lg:w-1/4"></span>
                    <a href="#" className="text-xs text-center text-white uppercase">Insert email</a>
                    <span className="w-1/5 border-b lg:w-1/4"></span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4 px-4">
                        <label className="block mb-2 text-sm font-medium text-white">Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-[#235552] border-b-2 border-yellow-500  focus:ring-opacity-40 focus:outline-none" type="email" required />
                    </div>

                    <div className="mt-6 px-2">
                        <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-between mt-4 px-2 mb-4">
                    <span className="w-1/5 border-b md:w-1/4"></span>
                    <Link to="/login" className="text-xs text-gray-300 uppercase hover:underline">or Login</Link>
                    <span className="w-1/5 border-b md:w-1/4"></span>
                </div>
            </div>
        </div>

    );
}

export default ForgotPasswordForm