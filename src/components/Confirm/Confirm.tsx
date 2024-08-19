import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ConfirmProps {
    churchImage: string;
    donationAmount: number;
    churchTitle: string;
    iban: string;
    name: string;
    charityAction: string,
    email: string;
    onBack: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ churchImage, donationAmount, churchTitle, name, email, iban, charityAction, onBack }) => {

    const BACKEND_URL = `https://simplicio-api-nbop.onrender.com`;
    const { id }: any = useParams();

    const handleConfirm = async () => {
        try {
            localStorage.setItem("churchId", id);
            // Validate the email format before sending
            const validateEmail = (email: any) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            };

            if (!validateEmail(email)) {
                console.error("Invalid email format");
                toast.error("Invalid email format");
                return;
            }

            const response = await fetch(`${BACKEND_URL}/donate`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    churchId: id,
                    amount: donationAmount,
                    charityAction: charityAction,
                    name: name,
                    email: email
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data", data);
                window.location.href = data.checkoutUrl; // Redirect to Stripe checkout
            } else {
                console.error("Failed to make donations");
                toast.error("Failed to make donations");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while making the donation");
        }
    };


    return (
        <header className='bg-gradient-to-br from-[rgb(4,48,47)] via-[rgba(8,57,54,1)] to-[rgba(4,48,47,1)] min-h-screen'>
            <div className="container mx-auto px-4 py-8 w-[90%] lg:w-[30%] ]">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={onBack} className="text-white"><IoArrowBack size={24} /></button>
                    <img className="w-20 h-20 md:w-24 md:h-24 lg:w-[15%] lg:h-[15%] mt-4" src={churchImage} alt="Church Logo" />
                </div>
                <h2 className="text-xl lg:text-2xl text-center font-semibold mb-4 text-[#ffdb4f]">Confirmation virement</h2>
                <div className="flex justify-between mb-2 mt-8">
                    <strong className="text-white text-lg font-thin">Nom</strong>
                    <p className="text-white">{name}</p>
                </div>
                <div className="flex justify-between mb-2 mt-8">
                    <strong className="text-white text-lg font-thin">email</strong>
                    <p className="text-white">{email}</p>
                </div>
                <div className="flex justify-between mb-2 mt-8">
                    <strong className="text-white text-lg font-thin">Montant</strong>
                    <p className="text-white">{`${donationAmount} EUR`}</p>
                </div>
                <div className="flex justify-between mb-2 mt-8">
                    <strong className="text-white text-lg font-light">Vers</strong>
                    <p className='uppercase text-white font-extrabold'>{churchTitle}</p>
                </div>
                <div className="flex justify-between mb-2 mt-8">
                    <strong className='text-white text-lg font-light'>Compte</strong>
                    <p className='text-white font-extrabold'>{iban}</p>
                </div>
                <div className="flex justify-between mb-2 mt-8">
                    <strong className='text-white text-lg font-light'>Communication</strong>
                    <p className='text-white font-extrabold'>{charityAction || 'Dime'}</p>
                </div>
                <div className="flex justify-center mt-10">
                    <button onClick={handleConfirm} className="px-10 py-2 bg-[#ffdb4f] text-[#235552] uppercase font-black rounded-full mt-4">Confirmer</button>
                </div>
            </div>
        </header>
    );
};

export default Confirm;
