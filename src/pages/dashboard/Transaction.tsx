import axios from 'axios';
import React, { useEffect, useState } from 'react'
interface Donation {
    churchName: string;
    charityAction: string;
    amount: number;
    status: string;
    iban: string;
    date: string;
}
const Transaction: React.FC = () => {
    const BACKEND_URL = "https://simplicio-api-nbop.onrender.com";
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/donate`);
                setDonations(response.data.donations);
            } catch (error) {
                console.error("Error fetching donations: ", error);
            } finally {
                setLoading(false)
            }
        }
        fetchDonations();
    }, [])
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <section className="container mt-20 px-4 mx-auto">
            <h2 className="text-lg font-medium text-gray-800">Transaction records</h2>
            <div className="flex flex-col mt-6">

                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                                            Church Name
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                                            Charity Action
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                                            Status
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                                            Iban
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((donation) => (
                                        <tr key={donation.iban}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{donation.churchName}</td>
                                            <td className="px-12 py-4 text-sm text-gray-500 whitespace-nowrap">{donation.charityAction}</td>
                                            <td className="px-12 py-4 text-sm text-gray-500 whitespace-nowrap">{donation.amount}</td>
                                            <td className={`px-12 py-4 text-sm whitespace-nowrap ${donation.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>{donation.status}</td>
                                            <td className="px-12 py-4 text-sm text-gray-500 whitespace-nowrap">{donation.iban}</td>
                                            <td className="px-12 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(donation.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Transaction