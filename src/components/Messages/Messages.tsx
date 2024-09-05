import React, { useEffect, useState } from "react";
import { MdSend } from 'react-icons/md';

interface Message {
    _id: string;
    senderEmail: string;
    receiverEmail: string;
    message: string;
    read: boolean;
    timestamp: string;
}

interface MessagesProps {
    contactEmail: string;
    contactName: string;
    onBackClick: () => void; // Added onBackClick prop
}

const Messages: React.FC<MessagesProps> = ({ contactEmail, contactName, onBackClick }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const BACKEN_URL = `https://simplicio-api-nbop.onrender.com`;

    const fetchMessages = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BACKEN_URL}/message/messages?contactEmail=${contactEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();

        // Set up polling to fetch messages every 5 seconds
        const interval = setInterval(fetchMessages, 5000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [contactEmail]);

    const sendMessage = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BACKEN_URL}/message/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    receiverEmail: contactEmail,
                    message: newMessage
                })
            });
            const result = await response.json();
            console.log("res", result);

            setNewMessage("");
            await fetchMessages(); // Fetch messages after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="flex-grow h-full flex flex-col">
            {/* Header */}
            <div className="w-full h-15 p-1 bg-[#003300] shadow-md rounded-xl rounded-bl-none rounded-br-none flex items-center">
                <button onClick={onBackClick} className="text-white p-2">
                    Back
                </button>
                <div className="flex p-2 align-middle items-center flex-grow">
                    <div className="border rounded-full border-white p-1/2">
                        <img className="w-14 h-14 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar" />
                    </div>
                    <div className="flex-grow p-2">
                        <div className="text-md text-gray-50 font-semibold">{contactName}</div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                            <div className="text-xs text-gray-50 ml-1">Online</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex-grow bg-[#f0f0f0] my-2 p-2 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg._id} className={`flex ${msg.senderEmail === contactEmail ? 'justify-start' : 'justify-end'} my-2`}>
                        <div className={`flex items-end ${msg.senderEmail === contactEmail ? 'flex-row' : 'flex-row-reverse'} w-full sm:w-3/4`}>
                            {msg.senderEmail === contactEmail && (
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                                    alt="receiver avatar"
                                />
                            )}
                            <div className={`max-w-xs sm:max-w-md mx-2 p-2 rounded-lg shadow-md ${msg.senderEmail === contactEmail ? 'bg-white' : 'bg-green-500 text-white'}`}>
                                {msg.message}
                            </div>
                            {msg.senderEmail !== contactEmail && (
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                                    alt="sender avatar"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex w-full p-2">
                <input
                    className="flex-grow h-12 p-3 rounded-l-md text-gray-800 text-sm focus:outline-none bg-gray-300"
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-r-md"
                    onClick={sendMessage}
                >
                    <MdSend size={24} />
                </button>
            </div>
        </div>
    );
};

export default Messages;
