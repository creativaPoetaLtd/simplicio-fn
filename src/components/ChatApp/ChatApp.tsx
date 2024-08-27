import { useState } from 'react';
import Conversation from '../Conversation/Conversation';
import Messages from '../Messages/Messages';

const ChatApp = () => {
    const [contactEmail, setContactEmail] = useState<string>('');
    const [contactName, setContactName] = useState<string>('');
    const [showMessages, setShowMessages] = useState<boolean>(false); // State to toggle view

    const handleBackClick = () => {
        setShowMessages(false);
        setContactEmail('');
        setContactName('');
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            {!showMessages ? (
                <div className="h-full w-full p-2 overflow-y-auto">
                    <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Qiewcode Chat</div>
                    <div className="search-chat flex p-3">
                        <input
                            className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700 w-full rounded-l-md"
                            type="text"
                            placeholder="Search Messages"
                        />
                        <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-600 dark:text-gray-200 p-3">Recent</div>
                    <Conversation setContactEmail={setContactEmail} setContactName={setContactName} setShowMessages={setShowMessages} />
                </div>
            ) : (
                <div className="flex-grow h-full p-2 rounded-md">
                    <Messages contactEmail={contactEmail} contactName={contactName} onBackClick={handleBackClick} />
                </div>
            )}
        </div>
    );
};

export default ChatApp;
