import { SlLocationPin } from "react-icons/sl";
import { IoIosCall } from "react-icons/io";
import { BiLogoGmail } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Church {
    _id: string;
    name: string;
    churchEmail: string;
    churchTel: string;
    churchLocation: string;
    user: {
        email: string; // Manager's email
    };
}

const ContactForm = ({ savedBgColor }: any) => {
    const { id } = useParams();
    const BACKEND_URL = `https://simplicio-api-nbop.onrender.com`;
    const [church, setChurch] = useState<Church | null>(null);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/church/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch church details");
                }
                const data = await response.json();
                setChurch(data.church);
            } catch (error) {
                console.log("Error fetching church", error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form data
        if (!formData.message) {
            toast.error('Please fill in the message field');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const messagePayload: any = {
                receiverEmail: church?.user.email, // Send to the manager's email
                message: formData.message
            };

            // If token is not available, include user's email and name in the payload
            if (!token) {
                messagePayload['senderName'] = formData.user_name;
                messagePayload['senderEmail'] = formData.user_email;

                if (!formData.user_name || !formData.user_email) {
                    toast.error('Please provide your name and email');
                    return;
                }
            }

            const response = await fetch(`${BACKEND_URL}/message/send-message`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : '', // Add token if available
                },
                body: JSON.stringify(messagePayload)
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            toast.success('Message sent successfully');
            setFormData({
                user_name: '',
                user_email: '',
                message: ''
            });
        } catch (error) {
            console.log("Error sending message", error);
            toast.error('Message sending failed');
        }
    };

    return (
        <section className={`min-h-screen ${!savedBgColor ? 'bg-gradient-to-br from-[rgb(4,48,47)] via-[rgba(8,57,54,1)] to-[rgba(4,48,47,1)]' : ''}`} style={{ backgroundColor: savedBgColor }} id='contact'>
            <div className="flex flex-col px-6 py-12 lg:mx-20">
                <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
                    <div className="text-white lg:w-1/2 lg:mx-6">
                        <h1 className="text-2xl font-semibold capitalize lg:text-3xl">Obtenez un devis</h1>
                        <p className="max-w-xl mt-6">Demandez-nous tout et nous serions ravis de vous entendre</p>

                        <div className="mt-6 space-y-8 md:mt-8">
                            <p className="flex items-start -mx-2">
                                <SlLocationPin size={20} />
                                <span className="mx-2 text-white truncate w-72">{church?.churchLocation}</span>
                            </p>
                            <p className="flex items-start -mx-2">
                                <IoIosCall size={20} />
                                <span className="mx-2 text-white truncate w-72">{church?.churchTel}</span>
                            </p>
                            <p className="flex items-start -mx-2">
                                <BiLogoGmail size={20} />
                                <span className="mx-2 text-white truncate w-72">{church?.churchEmail}</span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 lg:w-1/2 lg:mx-6">
                        <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-[rgb(4,48,47)] shadow-2xl rounded-xl lg:max-w-xl">
                            <h1 className="text-xl font-medium text-white">Formulaire de contact</h1>
                            <form className="mt-4" onSubmit={handleSubmit}>
                                {/* For unauthenticated users, show name and email input fields */}
                                {!localStorage.getItem('token') && (
                                    <>
                                        <div className="w-full mt-6">
                                            <label className="block mb-2 text-sm text-white">Nom</label>
                                            <input
                                                type="text"
                                                name="user_name"
                                                value={formData.user_name}
                                                onChange={handleChange}
                                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                                placeholder="Nom"
                                            />
                                        </div>
                                        <div className="w-full mt-6">
                                            <label className="block mb-2 text-sm text-white">Email</label>
                                            <input
                                                type="email"
                                                name="user_email"
                                                value={formData.user_email}
                                                onChange={handleChange}
                                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                                placeholder="Email"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="w-full mt-6">
                                    <label className="block mb-2 text-sm text-white">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                        placeholder="Message"
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#235552] rounded-md hover:bg-[#32827c]">
                                    entrer en contact
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
