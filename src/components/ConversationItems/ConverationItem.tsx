import React from 'react';

interface ConversationItemProps {
    name: string;
    email: string;
    onClick: () => void; // Added onClick prop
}

const ConversationItem: React.FC<ConversationItemProps> = ({ name, onClick }) => {
    return (
        <div onClick={onClick}>
            <div className="conversation-item p-1 bg-[#004d00] hover:bg-[#003300] m-1 rounded-md">
                <div className="flex items-center p-2 cursor-pointer">
                    <div className="w-7 h-7 m-1">
                        <img
                            className="rounded-full"
                            src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                            alt="avatar"
                        />
                    </div>
                    <div className="flex-grow p-2">
                        <div className="flex justify-between text-md">
                            <div className="text-sm font-medium text-gray-200">{name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationItem;
