import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


const ResetPasswordForm: React.FC = () => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });

    const backendUrl = 'https://simplicio-backend-tvl39.ondigitalocean.app';
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendUrl}/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmNewPassword
                }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message)
                navigate('/login')
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("Internal server error")
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-[#235552]'>
            <div className="w-full max-w-md mx-auto overflow-hidden bg-[#235552] rounded-lg shadow-lg lg:max-w-md">
                <div className="flex justify-center mx-auto">
                </div>
                <p className="mt-3 text-xl text-center text-white">Reset Password!</p>
                <div className="flex items-center justify-between mt-4 px-2">
                    <span className="w-1/5 border-b lg:w-1/4"></span>
                    <a href="#" className="text-xs text-center text-white uppercase">reset your account</a>
                    <span className="w-1/5 border-b lg:w-1/4"></span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4 px-4">
                        <label className="block mb-2 text-sm font-medium text-white">New Password</label>
                        <input name="newPassword" value={formData.newPassword} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-[#235552] border-b-2 border-yellow-500  focus:ring-opacity-40 focus:outline-none" type="password" required />
                    </div>
                    <div className="mt-4 px-4">
                        <label className="block mb-2 text-sm font-medium text-white">Confirm New Password</label>
                        <input name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} className="block w-full px-4 py-2 text-white bg-[#235552] border-b-2 border-yellow-500  focus:ring-opacity-40 focus:outline-none" type="password" required />
                    </div>

                    <div className="mt-6 px-2">
                        <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ResetPasswordForm;
