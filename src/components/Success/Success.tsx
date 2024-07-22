import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '/images/Logo.jpg';
import { IoArrowBack } from 'react-icons/io5';
import toast from 'react-hot-toast';

const Success = () => {
    const frontEndUrl = 'https://simplicio-fn.netlify.app';
    const BACKEND_URL = 'https://simplicio-backend-tvl39.ondigitalocean.app'
    const churchId = localStorage.getItem('churchId');
    const location = useLocation();

    useEffect(() => {
        const checkPaymentStatus = async () => {
            const query = new URLSearchParams(location.search);
            const sessionId = query.get('session_id');
            console.log("sessionID", sessionId);

            if (sessionId) {
                try {
                    const response = await fetch(`${BACKEND_URL}/donate/status?session_id=${sessionId}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.status === 'completed') {
                            toast.success("Donation completed successfully!");
                            setTimeout(() => {
                                window.location.href = `${frontEndUrl}/church/${churchId}`;
                            }, 3000);
                        } else {
                            toast.error("Payment not completed. Please try again.");
                        }
                    } else {
                        toast.error("Failed to check payment status");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    toast.error("An error occurred while checking the payment status");
                }
            }
        };

        checkPaymentStatus();
    }, [location.search, churchId, frontEndUrl]);

    return (
        <header className='bg-gradient-to-br from-[rgb(4,48,47)] via-[rgba(8,57,54,1)] to-[rgba(4,48,47,1)] min-h-screen'>
            <div className="container mx-auto px-4 py-8 w-[90%] lg:w-[30%]">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => {
                        window.location.href = `${frontEndUrl}/church/${churchId}`;
                    }} className="text-white">
                        <IoArrowBack size={24} />
                    </button>
                </div>
                <p className='text-white text-2xl font-bold'>Un peu de patiente, On vous redirige vers votre banque</p>
                <div className="flex justify-center mt-16">
                    <img src={Logo} alt="Logo" />
                </div>
            </div>
        </header>
    );
};

export default Success;
