import React, { useState, useEffect } from "react";
import Select from 'react-select';
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
    logo: string,
    churchWebsiteLink: string,
    qrCodeData: string;
    user: User
    churchEmail: string,
    churchTel: string,
    churchLocation: string,
    churchAbout: string
}
interface User {
    _id: string;
    name: string;
    email: string;
}
const ITEMS_PER_PAGE = 10;

const Churches: React.FC = () => {
    const BACKEND_URL = `https://simplicio-backend-tvl39.ondigitalocean.app`;
    const [currentPage, setCurrentPage] = useState(1);
    const [churches, setChurches] = useState<Church[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [deleteChurchId, setDeleteChurchId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isViewMoreOpen, setIsViewMoreOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
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

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const displayedChurches = churches.slice(startIndex, endIndex);
    const totalPages = Math.ceil(churches.length / ITEMS_PER_PAGE);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/church`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch churches");
                }

                const data = await response.json();
                setChurches(data.churches);
                setLoading(false);
            } catch (error: any) {
                console.log("Error", error);

                toast.error(error.message || "Error fetching churches")
                setLoading(false);
            }
        };

        fetchData();
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/user/all-admin-manager`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setAllUsers(data.users);
            } catch (error: any) {
                toast.error(error.message || "Error feching users")
            }
        };

        fetchUsers();
    }, []);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const closeViewMoreModal = () => {
        setIsViewMoreOpen(false)
    }
    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
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
        setIsEditOpen(false);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return;
        }

        // Validate Manager
        if (!selectedUser) {
            toast.error('Manager is required');
            return;
        }
        if (!formData.iban.trim()) {
            toast.error('IBAN is required');
            return;
        }

        if (!formData.logo) {
            toast.error('Logo is required');
            return;
        }

        if (!formData.sloganMessage.trim()) {
            toast.error('Slogan Message is required');
            return;
        }

        if (formData.sloganMessage.length < 100 || formData.sloganMessage.length > 200) {
            toast.error('Slogan Message should be between 100 and 200 characters');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/church`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to create church");
            }
            const updatedData = await response.json();
            setChurches([...churches, updatedData.church]);
            closeModal();
            toast.success("Church created Successfully")
        } catch (error: any) {
            toast.error(error.message || "Failed to create church")
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
                // Church updated successfully, now fetch the updated list of churches
                const churchesResponse = await fetch(`${BACKEND_URL}/church`, {
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

                // Close the edit modal
                setIsEditOpen(false);

                toast.success("Church Updated Successfully");
            }
        } catch (error: any) {
            console.error("Error updating church:", error);
            toast.error(error.message || "Failed to update church");
        }
    };

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
            setIsViewMoreOpen(true); // Open view more modal
        } catch (error: any) {
            toast.error(error.message || "Error fetching church details")

        }
    };
    const handleDeleteModal = (churchId: string) => {

        setDeleteChurchId(churchId)
        setIsDeleteOpen(true)


    }

    const handleDelete = async (churchId: string) => {
        try {
            const response = await fetch(`${BACKEND_URL}/church/${churchId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete church");
            }
            // Remove the deleted church from the state
            setChurches(prevChurches => prevChurches.filter(church => church._id !== churchId));
            setIsDeleteOpen(false);
            toast.success("Church deleted successfully");
        } catch (error: any) {
            toast.error(error.message || "Error deleting church");
        }
    };

    const handleManagerChange = (selectedOption: any) => {
        setSelectedUser(selectedOption);
        setFormData(prevState => ({
            ...prevState,
            userId: selectedOption.value._id
        }));
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <section className="container mt-20 px-4 mx-auto">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2 className="text-lg font-medium text-gray-800">List of Churches</h2>
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center mt-4 gap-x-3">
                            <button onClick={openModal} className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto hover:text-white hover:bg-[#235552]">
                                New Church
                            </button>
                        </div>
                    </div>

                    {isOpen && (
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <div className="relative inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl  sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize " id="modal-title">
                                        Add New Church
                                    </h3>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <label htmlFor="name" className="block mt-4 text-sm font-medium text-gray-700 ">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                                        />
                                        <label htmlFor="Manager" className="block mt-4 text-sm font-medium text-gray-700">
                                            Manager
                                        </label>
                                        <Select
                                            id="Manager"
                                            name="Manager"
                                            value={selectedUser}
                                            onChange={handleManagerChange}
                                            options={allUsers.map(user => ({ value: user, label: user.name })) as any} // Add 'as any' here
                                            placeholder="Select manager..."
                                        />

                                        <label htmlFor="iban" className="block mt-4 text-sm font-medium text-gray-700 ">
                                            IBAN
                                        </label>
                                        <input
                                            type="text"
                                            id="iban"
                                            name="iban"
                                            value={formData.iban}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                                        />
                                        <label htmlFor="iban" className="block mt-4 text-sm font-medium text-gray-700 ">
                                            Logo
                                        </label>
                                        <input
                                            type="file" // Specify the type as file
                                            id="logo" // Change id to logo
                                            name="logo"
                                            onChange={handleChange} // Handle the change event
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
                                                rows={6} // Adjust rows as needed
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
                                        <label htmlFor="churchEmail" className="block mt-4 text-sm font-medium text-gray-700 ">
                                            Church Email
                                        </label>
                                        <input
                                            type="text"
                                            id="churchEmail"
                                            name="churchEmail"
                                            value={formData.churchEmail}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                                        />

                                        <label htmlFor="churchTel" className="block mt-4 text-sm font-medium text-gray-700 ">
                                            Church Telephone
                                        </label>
                                        <input
                                            type="text"
                                            id="churchTel"
                                            name="churchTel"
                                            value={formData.churchTel}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                                        />

                                        <label htmlFor="churchLocation" className="block mt-4 text-sm font-medium text-gray-700 ">
                                            Church Location
                                        </label>
                                        <input
                                            type="text"
                                            id="churchLocation"
                                            name="churchLocation"
                                            value={formData.churchLocation}
                                            onChange={handleChange}
                                            className="block w-full mt-1 px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                                        />

                                        <label htmlFor="churchAbout" className="block mt-4 text-sm font-medium text-gray-700 ">
                                            About Church
                                        </label>
                                        <textarea
                                            id="churchAbout"
                                            name="churchAbout"
                                            value={formData.churchAbout}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 resize-none"
                                            rows={6} // Adjust rows as needed
                                        />
                                        <div className="mt-4 sm:flex sm:items-center sm:justify-end">
                                            <button type="button" onClick={closeModal} className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                                Cancel
                                            </button>
                                            <button type="submit" className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#235552] rounded-md sm:mx-2 hover:bg-[#358e88] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                                Create Church
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
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
                                        <p className="text-sm text-gray-700">{selectedChurch?.user?.name}</p>
                                        <p className="text-sm font-bold text-gray-700">Manager Email</p>
                                        <p className="text-sm text-gray-700">{selectedChurch?.user?.email}</p>
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
                    {isDeleteOpen && (
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75">
                                    </div>
                                </div>
                                <div className="relative inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <h3 className="text-lg font-bold leading-6 text-center text-gray-800 capitalize " id="modal-title">
                                        Delete church
                                    </h3>
                                    <div className="mt-4 flex justify-center">
                                        <p> Do you want to delete it?</p>
                                    </div>
                                    <div className="mt-4 flex justify-center ">
                                        <button type="button" onClick={closeDeleteModal} className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                            Cancel
                                        </button>
                                        <button type="submit" onClick={() => handleDelete(deleteChurchId)} className="w-full sm:w-auto px-4 py-2 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#FF2026] rounded-md sm:mx-2 hover:bg-[#ff5a60] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                            delete
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
                    <div className="flex flex-col mt-6">
                        {churches.length === 0 ? (
                            <div className="text-gray-500 text-center py-8">
                                No churches available.
                            </div>
                        ) : (
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                        Manager
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {/* Display churches based on pagination */}
                                                {displayedChurches.map((church: Church) => (
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
                                                            {church.Manager}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <button className="text-[#235552] hover:underline" onClick={() => openEditModal(church)}>Edit</button>
                                                            <button className="text-red-600 ml-4 hover:underline" onClick={() => handleDeleteModal(church._id)}>Delete</button>
                                                            <button className="text-blue-600 ml-4 hover:underline" onClick={() => handleViewMore(church._id)}>View More</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-4">
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">

                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >

                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.707 7.293a1 1 0 0 1 0 1.414L5.414 11H16a1 1 0 0 1 0 2H5.414l2.293 2.293a1 1 0 1 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === index + 1 ? "z-10 bg-gray-100" : ""}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.293 12.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 1 1-1.414-1.414L8.586 13H4a1 1 0 0 1 0-2h4.586l-2.293-2.293a1 1 0 1 1 1.414-1.414l4 4z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        )}

                    </div>


                </div>
            )}
        </section>
    );
};

export default Churches;

