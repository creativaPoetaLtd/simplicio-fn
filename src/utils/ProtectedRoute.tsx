import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export const decodedToken = (token: string) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        toast.error('Please log in to continue.');
        return false; // No token found
    }

    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        // Check token expiration
        if (decodedToken.exp < currentTime) {
            toast.error('Session expired, please log in again.');
            return false; // Token expired
        }

        return true; // Valid token
    } catch (error) {
        toast.error('Invalid token, please log in again.');
        console.error('Error parsing token:', error);
        return false; // Token is invalid
    }
};


export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.role === 'admin';
    } catch (error) {
        console.error("Error parsing token", error);
        return false;

    }
}
export const isManager = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    try {
        const decoded: any = decodedToken(token);
        return decoded.role === 'manager';
    } catch (error) {
        console.error("Error decoding token", error);
        return false;
    }
}