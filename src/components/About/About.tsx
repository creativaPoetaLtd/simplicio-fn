import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
    border-radius: 20px;
    overflow: hidden;
`;

const MonthlyStatistics = [
    { month: 'Jan', amount: 600 },
    { month: 'Feb', amount: 300 },
    { month: 'Mar', amount: 400 },
    { month: 'Apr', amount: 120 },
    { month: 'May', amount: 600 },
    { month: 'Jun', amount: 100 },
    { month: 'Jul', amount: 800 },
    { month: 'Aug', amount: 200 },
    { month: 'Sep', amount: 1000 },
    { month: 'Oct', amount: 0 },
    { month: 'Nov', amount: 1200 },
    { month: 'Dec', amount: 300 },
];

const About = () => {
    return (
        <section className="bg-[rgb(4,48,47)] py-16 px-8" id='about'>
            <div className="max-w-7xl mx-auto space-y-8 text-center text-white">
                <div className="space-y-2">
                    <button className="px-4 py-2 font-semibold bg-gray-700 rounded-full">
                        Why Choose <span className='uppercase font-bold text-[#ffdb4f]'>Simplicio?</span>
                    </button>
                    <h2 className="text-3xl font-bold">Secure Your Money Transfer with Precision!</h2>
                    <p className="text-lg">
                        Financial management is more than just saving; it's about securing a transfer and Securing your transfer.
                    </p>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Useful Transfer Reporting</h3>
                            <button className="text-green-800 bg-gray-200 rounded-full p-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a1 1 0 00-1 1v10.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L11 14.586V4a1 1 0 00-1-1z" /></svg>
                            </button>
                        </div>
                        <div className="text-left">
                            <p className="text-gray-500">Money transfer - 2024</p>
                            <p className="text-2xl font-bold text-gray-900">$480.00</p>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7H7v6h6V7z" /></svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-900">Church</p>
                                        <p className="text-gray-500">Achieved in 4 months</p>
                                    </div>
                                </div>
                                <p className="text-gray-900">$200</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M14 8h-4v6H6l-1-6h9z" /></svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-900">Travel</p>
                                        <p className="text-gray-500">Achieved in 8 months</p>
                                    </div>
                                </div>
                                <p className="text-gray-900">$46,000</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Useful Expenses Reporting */}
                    <div className="p-6 bg-white rounded-lg shadow-lg relative">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Money Monthly Statistics</h3>
                            <button className="text-green-800 bg-gray-200 rounded-full p-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a1 1 0 00-1 1v10.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L11 14.586V4a1 1 0 00-1-1z" /></svg>
                            </button>
                        </div>
                        <ChartContainer>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={MonthlyStatistics}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="amount" fill="#235552" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                        {/* Bubble SVGs */}
                    </div>
                    
                </div>
            </div>
        </section>
    );
}

export default About;
