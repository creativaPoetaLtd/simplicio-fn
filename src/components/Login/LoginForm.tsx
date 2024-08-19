import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const backendUrl = `https://simplicio-api-nbop.onrender.com`;
            const response = await axios.post(`${backendUrl}/auth/login`, formData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            const decodedToken: any = jwtDecode(token);
            const userRole = decodedToken.role;
            if (userRole === 'admin' || userRole === 'manager') {
                toast.success('Login successful');
                window.location.href = '/dashboard'; 
            } else {
                toast.success('Login successful');
                window.location.href = '/'; 
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || "Invalid email or password";
            toast.error(errorMessage);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-[#235552]'>
            <div className="w-full max-w-md mx-auto overflow-hidden bg-[#235552] rounded-lg shadow-lg lg:max-w-md">
                <div className="flex justify-center mx-auto">
                </div>
                <p className="mt-3 text-xl text-center text-white">Welcome back!</p>
                <div className="flex items-center justify-between mt-4 px-2">
                    <span className="w-1/5 border-b lg:w-1/4"></span>
                    <a href="#" className="text-xs text-center text-white uppercase">login with email</a>
                    <span className="w-1/5 border-b lg:w-1/4"></span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4 px-4">
                        <label className="block mb-2 text-sm font-medium text-white">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 text-sm text-white bg-[#235552] border-b-2 border-yellow-500  focus:ring-opacity-40 focus:outline-none"
                            type="email"
                            required
                        />
                    </div>
                    <div className="mt-4 px-4">
                        <div className="flex justify-between">
                            <label className="block mb-2 text-sm font-medium text-white">Password</label>
                            <Link to="/forgot-password" className="text-xs text-gray-300">Forget Password?</Link>
                        </div>
                        <input name="password" value={formData.password} onChange={handleChange} className="block w-full px-3 py-2 text-sm text-white bg-[#235552] border-b-2 border-yellow-500  focus:ring-opacity-40 focus:outline-none" type="password" required />
                    </div>
                    <div className="mt-6 px-2">
                        <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-between px-2 mt-4 mb-4">
                    <span className="w-1/5 border-b md:w-1/4"></span>
                    <Link to="/signup" className="text-xs text-gray-300 uppercase hover:underline">or sign up</Link>
                    <span className="w-1/5 border-b md:w-1/4"></span>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
