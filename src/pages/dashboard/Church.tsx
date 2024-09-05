import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

interface Church {
    _id: string;
    userId: string;
    name: string;
    Manager: string;
    iban: string;
    charityActions: string[],
    sloganMessage: string,
    churchWebsiteLink: string,
    logo: string,
    qrCodeData: string;
    churchEmail: string,
    churchTel: string,
    churchLocation: string,
    churchAbout: string
}

const Church: React.FC = () => {
    const BACKEND_URL = "http://localhost:4000";
    const [churches, setChurches] = useState<Church[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedChurch, setSelectedChurch] = useState<Church | null>(null); // State to hold selected church details
    const [isViewMoreOpen, setIsViewMoreOpen] = useState<boolean>(false); // State for modal visibility
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [currentChurch, setCurrentChurch] = React.useState<Church | null>(null);

    const [formData, setFormData] = useState<{
        name: string;
        userId: string;
        iban: string;
        logo: string;
        charityActions: string[];
        sloganMessage: string;
        churchEmail: string;
        churchTel: string;
        churchLocation: string;
        churchAbout: string;
    }>({
        name: "",
        userId: "",
        iban: "",
        logo: "",
        charityActions: [""],
        sloganMessage: "",
        churchEmail: "",
        churchTel: "",
        churchLocation: "",
        churchAbout: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/church/manager-get-church`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch churches");
                }
                const data = await response.json();
                setChurches(data.churches);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching churches:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleViewMore = async (churchId: string) => {
        try {
            const response = await fetch(`${BACKEND_URL}/church/${churchId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch church details");
            }

            const data = await response.json();
            setSelectedChurch(data.church);
            setIsViewMoreOpen(true);
        } catch (error: any) {
            toast.error(error.message || "Error fetching church details")

        }
    };
    const closeViewMoreModal = () => {
        setIsViewMoreOpen(false)
    }

    const openEditModal = (church: Church) => {
        setCurrentChurch(church);

        setFormData({
            name: church.name,
            userId: church.userId,
            iban: church.iban,
            logo: church.logo,
            sloganMessage: church.sloganMessage,
            charityActions: church.charityActions,
            churchEmail: church.churchEmail,
            churchTel: church.churchTel,
            churchLocation: church.churchLocation,
            churchAbout: church.churchAbout
        });
        setIsEditOpen(true);
    };
    const closeEditModal = () => {
        setIsEditOpen(false)
    }
    const handleCharityActionChange = (index: number, value: string) => {
        const newCharityActions = [...formData.charityActions];
        newCharityActions[index] = value;
        setFormData(prevState => ({
            ...prevState,
            charityActions: newCharityActions
        }));
    };
    const addCharityActionField = () => {
        setFormData(prevState => ({
            ...prevState,
            charityActions: [...prevState.charityActions, ""]
        }));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        const updatedFormData = { ...formData };
        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files && fileInput.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        updatedFormData.logo = reader.result;
                    }
                    setFormData(updatedFormData);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BACKEND_URL}/church/${currentChurch?._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const churchesResponse = await fetch(`${BACKEND_URL}/church/manager-get-church`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                if (!churchesResponse.ok) {
                    throw new Error("Failed to fetch churches");
                }

                const data = await churchesResponse.json();


                setChurches(data.churches);

                setIsEditOpen(false);

                toast.success("Church Updated Successfully");
            }
        } catch (error: any) {
            console.error("Error updating church:", error);
            toast.error(error.message || "Failed to update church");
        }
    };

    return (
        <section className="container mt-20 px-4 mx-auto">
            {loading ? (<div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 lg:h-16 lg:w-16"></div>
            </div>) : (
                <div>
                    <div className="flex flex-col mt-6">
                        {churches.length === 0 ? (
                            <div className="text-gray-500 text-center py-8">
                                No churches available.
                            </div>
                        ) : (<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    <div className="flex items-center gap-x-3">
                                                        <input type="checkbox" className="text-[#235552] border-gray-300 rounded" />
                                                        <span>Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    IBAN
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">

                                            {
                                                churches.map((church: Church) => (
                                                    <tr key={church._id}>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-x-3">
                                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded" />
                                                                <div className="flex items-center gap-x-2">
                                                                    <span>{church.name}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            {church.iban}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <button className="text-[#235552] hover:underline" onClick={() => openEditModal(church)}>Edit</button>
                                                            <button className="text-blue-600 ml-4 hover:underline" onClick={() => handleViewMore(church._id)} >View More</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>)}
                    </div>
                    {isViewMoreOpen && (
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <div className="relative inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <h3 className="text-lg font-bold leading-6 text-gray-800 capitalize " id="modal-title">
                                        {selectedChurch?.name}
                                    </h3>
                                    <div className="mt-4">
                                        <p className="text-sm font-bold text-gray-700">Manager</p>
                                        <p className="text-sm text-gray-700">{selectedChurch?.Manager}</p>
                                        <p className="text-sm font-bold text-gray-700">Church Email</p>
                                        <p className="text-sm text-gray-700">{selectedChurch?.churchEmail || "Empty"}</p>
                                        <p className="text-sm font-bold text-gray-700">IBAN</p>
                                        <p className="text-sm text-gray-700">{selectedChurch?.iban}</p>
                                        <p className="text-sm font-bold text-gray-700">Church Telephone</p>
                                        <p className="text-sm text-gray-700">{selectedChurch?.churchTel || "Empty"}</p>
                                        <p className="text-sm font-bold text-gray-700">Church Location</p>
                                        <p className="text-sm text-gray-700">{selectedChurch?.churchLocation || "Empty"}</p>
                                        <p className="text-sm font-bold text-gray-700">Church About</p>
                                        <p className="text-sm text-gray-700">{selectedChurch?.churchAbout || "Empty"}</p>
                                        <p className="text-sm font-bold text-gray-700">Slogan</p>
                                        <p className="text-sm text-gray-700">{selectedChurch?.sloganMessage}</p>
                                        <p className="text-sm font-bold text-gray-700">Charity Actions</p>
                                        <p className="text-sm text-gray-700">{selectedChurch?.charityActions.join(', ')}</p>
                                        <img src={selectedChurch?.qrCodeData} alt="QR Code" className="mt-4" />
                                        <a href={selectedChurch?.churchWebsiteLink} target="_blank" rel="noopener noreferrer" className="block mt-4 text-sm font-bold text-gray-700 hover:underline">{selectedChurch?.churchWebsiteLink || "N/A"}</a>

                                    </div>
                                    <div className="mt-6">
                                        <button type="button" onClick={closeViewMoreModal} className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isEditOpen && (
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <div className="relative inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize" id="modal-title">
                                        Edit Church
                                    </h3>
                                    <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                                        <label htmlFor="name" className="block mt-4 text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        />
                                        <label htmlFor="iban" className="block mt-4 text-sm font-medium text-gray-700">
                                            IBAN
                                        </label>
                                        <input
                                            type="text"
                                            id="iban"
                                            name="iban"
                                            value={formData.iban}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        />
                                        <label htmlFor="logo" className="block mt-4 text-sm font-medium text-gray-700">
                                            Logo
                                        </label>
                                        <input
                                            type="file"
                                            id="logo"
                                            name="logo"
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        />
                                        <label htmlFor="sloganMessage" className="block mt-4 text-sm font-medium text-gray-700">
                                            Slogan Message
                                        </label>
                                        <div className="relative mt-1">
                                            <textarea
                                                id="sloganMessage"
                                                name="sloganMessage"
                                                value={formData.sloganMessage}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 resize-none"
                                                rows={6}
                                            />
                                            <div className="absolute bottom-0 right-0 mb-2 mr-3 text-sm text-gray-400">{formData.sloganMessage.length}/200</div>
                                        </div>
                                        <label htmlFor="charityActions" className="block mt-4 text-sm font-medium text-gray-700">
                                            Charity Actions
                                        </label>
                                        {formData.charityActions.map((action, index) => (
                                            <div key={index} className="flex items-center mt-1">
                                                <input
                                                    type="text"
                                                    value={action}
                                                    onChange={(e) => handleCharityActionChange(index, e.target.value)}
                                                    className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                />
                                                {index === formData.charityActions.length - 1 && (
                                                    <button type="button" onClick={addCharityActionField} className="ml-2 px-3 py-2 text-sm font-medium text-gray-800 bg-blue-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">+</button>
                                                )}
                                            </div>
                                        ))}
                                        <label htmlFor="churchEmail" className="block mt-4 text-sm font-medium text-gray-700">
                                            Church Email
                                        </label>
                                        <input
                                            type="text"
                                            id="churchEmail"
                                            name="churchEmail"
                                            value={formData.churchEmail}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        />
                                        <label htmlFor="churchTel" className="block mt-4 text-sm font-medium text-gray-700">
                                            Church Telephone
                                        </label>
                                        <input
                                            type="text"
                                            id="churchTel"
                                            name="churchTel"
                                            value={formData.churchTel}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        />
                                        <label htmlFor="churchLocation" className="block mt-4 text-sm font-medium text-gray-700">
                                            Church Location
                                        </label>
                                        <input
                                            type="text"
                                            id="churchLocation"
                                            name="churchLocation"
                                            value={formData.churchLocation}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                        />
                                        <label htmlFor="churchAbout" className="block mt-4 text-sm font-medium text-gray-700">
                                            About Church
                                        </label>
                                        <textarea
                                            id="churchAbout"
                                            name="churchAbout"
                                            value={formData.churchAbout}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 resize-none"
                                            rows={6}
                                        />
                                        <div className="mt-4 sm:flex sm:items-center sm:justify-end">
                                            <button type="button" onClick={closeEditModal} className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                                Cancel
                                            </button>
                                            <button type="submit" className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#235552] rounded-md sm:mx-2 hover:bg-[#358e88] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                                Update Church
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default Church