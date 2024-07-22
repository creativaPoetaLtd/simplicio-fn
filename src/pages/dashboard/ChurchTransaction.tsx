import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Donation {
    _id: string;
    amount: number;
    charityAction: string;
    date: string;
    status: string;
}

interface ChurchDonation {
    church: string;
    totalAmount: number;
    donations: Donation[];
}

const ChurchTransaction: React.FC = () => {
    const BACKEND_URL = "https://simplicio-backend-tvl39.ondigitalocean.app";
    const [churchDonations, setChurchDonations] = useState<ChurchDonation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedChurch, setSelectedChurch] = useState<ChurchDonation | null>(null);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await axios.get<ChurchDonation[]>(`${BACKEND_URL}/donate/church`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setChurchDonations(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching donations:', error);
                setError('Failed to fetch donations');
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    const openModal = (church: ChurchDonation) => {
        setSelectedChurch(church);
    };

    const closeModal = () => {
        setSelectedChurch(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 lg:h-16 lg:w-16"></div>
            </div>
        );
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
    }

    return (
        <div className="container mt-20 px-4 mx-auto">
            <div className="mx-auto mt-8 max-w-screen-lg px-2">
            <h2 className="text-lg font-bold text-gray-800">Transaction report List</h2>
                {churchDonations.length === 0 ? (
                    <div className="text-center text-gray-500">No donations found</div>
                ) : (
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">Church</th>
                                                <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">Total Amount</th>
                                                <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {churchDonations.map((churchDonation) => (
                                                <tr key={churchDonation.church}>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        {churchDonation.church}
                                                    </td>
                                                    <td className="px-12 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                        ${churchDonation.totalAmount.toFixed(2)}
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <button
                                                            onClick={() => openModal(churchDonation)}
                                                            className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-[#235552] hover:text-white focus:shadow"
                                                        >
                                                            View More
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {selectedChurch && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        <div className="p-4">
                            <h2 className="text-md font-bold mb-4">{selectedChurch.church} - Transactions</h2>
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Charity</th>
                                            <th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Date</th>
                                            <th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Amount</th>
                                            <th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedChurch.donations.map((donation) => (
                                            <tr key={donation._id}>
                                                <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                                    {donation.charityAction}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{new Date(donation.date).toLocaleDateString()}</td>
                                                <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                                                    ${donation.amount.toFixed(2)}
                                                </td>
                                                <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                                    <div className={`inline-flex items-center rounded-full ${getStatusColor(donation.status)} py-2 px-3 text-xs text-white`}>{donation.status}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'bg-[#235552]';
        case 'pending':
            return 'bg-yellow-500';
        default:
            return 'bg-gray-200';
    }
};

export default ChurchTransaction;
