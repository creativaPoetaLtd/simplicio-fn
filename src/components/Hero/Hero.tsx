import React, { useEffect, useState } from 'react';
import churchLogo from '/images/hopechurch.png';
import { useParams } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';
import Confirm from '../Confirm/Confirm';
import toast from 'react-hot-toast';
import ContactForm from '../ContactForm/ContactForm';
import AboutChurch from '../AboutChurch/AboutChurch';

interface Church {
    _id: string;
    userId: string;
    name: string;
    Manager: string;
    iban: string;
    charityActions: string[];
    sloganMessage: string;
    logo: string;
    qrCodeData: string;
    churchEmail: string;
    churchTel: string;
    churchLocation: string;
    churchAbout: string;
}

const Spinner = () => (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="mb-4 text-center">
            Un instant s'il vous plait...
        </div>
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
    </div>
);


const customSelectStyles: StylesConfig = {
    control: (provided: any) => ({
        ...provided,
        backgroundColor: '#235552',
        border: '2px solid #ffdb4f',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#ffdb4f' : 'transparent',
        color: state.isSelected ? '#235552' : '#235552',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: '#FFFFFF',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#FFFFFF',
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        backgroundColor: '#ffdb4f',
    }),
};

const Hero = () => {
    const { id } = useParams();
    const BACKEND_URL = `https://simplicio-backend-tvl39.ondigitalocean.app`;
    const savedBgColor: any = localStorage.getItem('bgColor');

    const [church, setChurch] = useState<Church | null>(null);
    const [donationAmount, setDonationAmount] = useState<number>(0);
    const [selectCharity, setSelectedCharity] = useState<any>(null); // Change the type to any
    const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize loading state
    const [name, setName] = useState<string>('');
    const [showConfirmPage, setConfirmPage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/church/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch church details');
                }
                const data = await response.json();
                setChurch(data.church);
                setIsLoading(false)
            } catch (error: any) {
                toast.error(error.message)
                console.log('Error fetching church', error);
                setIsLoading(false)
            }
        };
        fetchData();
    }, [id]);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDonationAmount(Number(event.target.value));
    };

    const handleDonationAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace('€ ', ''); // Remove the Euro sign
        setDonationAmount(Number(value));
    };


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDonationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectCharity !== null && donationAmount > 0) {
            setConfirmPage(true);
        } else {
            toast.error('Please select a charity before proceeding and donation Amount');
        }
    };

    const handleCharityActionChange = (selectedOption: any) => {
        setSelectedCharity(selectedOption);
    };

    return (
        <>
            {showConfirmPage ? (
                <Confirm
                    churchImage={church?.logo || churchLogo}
                    donationAmount={donationAmount}
                    churchTitle={church?.name || 'Hope Church'}
                    iban={church?.iban || ''}
                    charityAction={selectCharity.value}
                    name={name || 'Anonyme'}
                    onBack={() => {
                        setConfirmPage(false);
                    }}
                />
            ) : (
                isLoading ? (<Spinner />) : (
                    <header
                        className={`min-h-screen ${!savedBgColor
                            ? 'bg-gradient-to-br from-[rgb(4,48,47)] via-[rgba(8,57,54,1)] to-[rgba(4,48,47,1)]'
                            : ''
                            }`}
                        style={{ backgroundColor: savedBgColor }}
                    >
                        <div className="px-8 py-16 mx-auto lg:mx-12 flex flex-col lg:flex-row items-center">
                            <div className="lg:w-1/2 lg:order-first text-center lg:text-left">
                                <h1 className="text-3xl font-bold text-gray-800 uppercase dark:text-white lg:text-4xl">
                                    {church?.name || 'Hope Church'}
                                </h1>
                                <div className="mt-4 w-32 h-32 md:w-24 md:h-24 lg:w-60 lg:h-60 rounded-full overflow-hidden flex items-center justify-center mx-auto lg:mx-0 bg-white">
                                    <img
                                        className="object-cover w-full h-full"
                                        src={church?.logo ? church.logo : churchLogo}
                                        alt="Church Logo"
                                    />
                                </div>
                            </div>
                            <div className="lg:w-1/2 lg:order-last">
                                <div className="lg:max-w-lg">
                                    <p className="mt-3 lg:w-[80%] w-full text-sm lg:text-lg font-thin text-[#FFFFFF]">
                                        {church?.sloganMessage || 'Bienvenue, et soyez béni vous qui sement dans le Royaume de Dieu'}
                                    </p>
                                    <form onSubmit={handleDonationSubmit} className="flex flex-col mt-4 lg:mt-0">
                                        <Select
                                            id="Manager"
                                            name="Manager"
                                            className="mt-4 mb-4 lg:w-[80%]"
                                            value={selectCharity}
                                            styles={customSelectStyles}
                                            onChange={handleCharityActionChange}
                                            options={church?.charityActions.map(charityAction => ({
                                                value: charityAction,
                                                label: charityAction,
                                            })) as any}
                                            placeholder="Choisissez l'action"
                                        />
                                        <div className="flex lg:w-[80%] mt-4 mb-4 justify-between items-center">
                                            <label htmlFor="donationAmount" className="text-xl  font-medium text-white">
                                                Montant
                                            </label>
                                            <input
                                                type="text"
                                                id="donationAmount"
                                                value={`${donationAmount} €`}
                                                onChange={handleDonationAmountChange}
                                                className="w-[120px] lg:w-[200px] text-center px-4 py-2 text-[gray-700] bg-[#235552] border-2 text-white border-[#ffdb4f] rounded-full focus:ring-opacity-40 focus:outline-none"
                                            />
                                        </div>

                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={donationAmount}
                                            onChange={handleSliderChange}
                                            className="block mt-4 mb-4 w-[100%] lg:w-[80%] px-4 py-2 bg-white rounded-lg focus:ring-opacity-40 focus:outline-none"
                                            style={{ accentColor: '#ffdb4f' }}
                                        />
                                        <div className="flex lg:w-[80%] mt-4 justify-between items-center">
                                            <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={handleNameChange}
                                                placeholder="Votre nom (optionnel)"
                                                className="w-[100%] mb-4 lg:w-[100%] px-4 py-2 text-[gray-700] bg-[#235552] border-2 text-white border-[#ffdb4f] rounded-md focus:ring-opacity-40 focus:outline-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className={`w-[80%] lg:w-[80%] self-center lg:self-start px-5 py-2 mt-6 text-md font-bold tracking-wider text-[#235552] uppercase transition-colors duration-300 transform bg-[#E3E3E3] rounded-full hover:bg-[#235552] hover:text-white hover:border-2 focus:outline-none focus:bg-blue-500 ${window.innerWidth <= 640 ? 'sm:self-center' : ''
                                                }`}
                                        >
                                            Suivant
                                        </button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <AboutChurch
                            savedBgColor={savedBgColor}
                            churchLogo={church?.logo}
                            churchAbout={church?.churchAbout}
                            churchTitle={church?.name}
                        />
                        <ContactForm savedBgColor={savedBgColor} />
                    </header>
                )
            )}
        </>
    );
};

export default Hero;