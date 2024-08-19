import { useState, useEffect } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

const Roles = () => {
    const BACKEND_URL = `https://simplicio-api-nbop.onrender.com`;
    const ITEMS_PER_PAGE = 10;

    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/user/all?page=${currentPage}&limit=${ITEMS_PER_PAGE}`, {
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
            return data.users; // Return the fetched users data
        } catch (error: any) {
            toast.error(error?.error || "Error fetching churches")
            return []; // Return an empty array if there's an error
        }
    };
    useEffect(() => {
        fetchUsers(); // Initial fetch of users
    }, [currentPage]);

    const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const openModal = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setSelectedRole("");
        setIsModalOpen(false);
    };

    const handleAssignRole = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/user/${selectedUser?._id}/update-role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ role: selectedRole }),
            });

            if (!response.ok) {
                throw new Error("Failed to update user role");
            }
            const data = await response.json();
            const updatedUsers = await fetchUsers(); // Fetch updated user list
            setAllUsers(updatedUsers);

            // Refresh user list after role assignment
            setCurrentPage(1);
            toast.success(data.message)
            closeModal();
        } catch (error: any) {
            toast.error(error?.error || "Error assigning role")
        }
    };
    return (
        <section className="container mt-20 px-4 mx-auto">
            {/* Existing content */}
            <h2 className="text-lg font-medium text-gray-800">List of Users</h2>
            <div className="flex flex-col mt-6">
                {allUsers.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                        No roles available.
                    </div>
                ) : (
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                                                Name
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                                                Email
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                                                Role
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allUsers.map((user) => (
                                            <tr key={user._id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {user.name}
                                                </td>
                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {user.email}
                                                </td>
                                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {user.role}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <button className="text-[#235552] hover:underline" onClick={() => openModal(user)}>Assign</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === index + 1 ? "z-10 bg-gray-100" : ""}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
                    <div className="relative bg-white w-96 rounded-lg p-6">
                        <h2 className="text-md font-semibold mb-4">Assign Role to {selectedUser?.name}</h2>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-md font-semibold text-gray-700">Role:</label>
                            <Select
                                id="role"
                                name="role"
                                value={{ value: selectedRole, label: selectedRole }}
                                onChange={(selectedOption: any) => setSelectedRole(selectedOption.value)}
                                options={[
                                    { value: 'admin', label: 'Admin' },
                                    { value: 'manager', label: 'Manager' },
                                    { value: 'normal', label: 'Normal' },
                                ]}
                                placeholder="Select Role"
                            />

                        </div>
                        <div className="flex justify-center">
                            <button onClick={closeModal} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                                Cancel
                            </button>
                            <button onClick={handleAssignRole} className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#235552] rounded-md sm:mx-2 hover:bg-[#358e88] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Assign Role
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Roles;
