import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConversationItem from '../ConversationItems/ConverationItem';

interface ConversationData {
    name: string;
    email: string;
}

interface ConversationProps {
    setContactEmail: (email: string) => void;
    setContactName: (name: string) => void;
    setShowMessages: (show: boolean) => void; // Add this prop
}

const Conversation: React.FC<ConversationProps> = ({ setContactEmail, setContactName, setShowMessages }) => {
    const BACKEND_URL = `https://simplicio-api-nbop.onrender.com`;
    const [conversations, setConversations] = useState<ConversationData[]>([]);
    const token = localStorage.getItem('token') || '';

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/message/conversation-users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setConversations(response.data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversations();
    }, [token]);

    const handleItemClick = (name: string, email: string) => {
        setContactEmail(email);
        setContactName(name);
        setShowMessages(true); // Set to true when a conversation is selected
    };

    return (
        <div className="p-1">
            {conversations.map((item) => (
                <ConversationItem
                    key={item.email}
                    name={item.email}
                    email={item.email}
                    onClick={() => handleItemClick(item.email, item.email)} // Handle click
                />
            ))}
        </div>
    );
};

export default Conversation;
