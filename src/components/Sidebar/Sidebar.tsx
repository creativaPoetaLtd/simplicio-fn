
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineChurch, MdOutlineSettings, MdOutlineAssignmentInd, MdMessage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidReport } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { decodedToken } from "../../utils/ProtectedRoute";
import LogoImage from '/images/Logo.jpg'
interface Menu {
    name: string;
    link: string;
    icon: React.ComponentType<any>;
    margin?: boolean;
}

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: any = decodedToken(token);
            if (decoded && decoded.role === 'admin') {
                setIsAdmin(true)
            }
            if (decoded && decoded.role === 'manager') {
                setIsManager(true)
            }
        }
    }, [])
    const menus: Menu[] = [
        { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
        ...(isManager ? [{ name: "Church", link: "/dashboard/church", icon: MdOutlineChurch }] : [{ name: "Churches", link: "/dashboard/churches", icon: MdOutlineChurch }]),
        ...(isAdmin ? [{ name: "Roles", link: "/dashboard/roles", icon: MdOutlineAssignmentInd }] : []),
        { name: "Transaction report", link: "/dashboard/transaction", icon: BiSolidReport },
        { name: "Message", link: "/", icon: MdMessage, margin: true },
        // { name: "profile", link: "/", icon: CgProfile },
        { name: "Settings", link: "/dashboard/settings", icon: MdOutlineSettings },
        { name: "Logout", link: "/logout", icon: IoIosLogOut },
    ];

    const handleClick = (link: string) => {
        if (link === '/logout') {
            localStorage.removeItem('token');
            navigate('/');
        }
        else {
            navigate(link);
            setOpen(false);
        }
    };

    return (
        <section className="flex">
            {/* Sidebar */}
            <div
                className={`bg-[#235552] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-300 px-4`}
            >
                <div className="py-3 flex justify-between items-center">
                    {/* Logo */}
                    {open && (
                        <Link to="/">
                            <img src={LogoImage} alt="Simplicio Logo" className="h-10" /> {/* Adjust the height as per your logo size */}

                        </Link>
                    )}
                    {/* Hamburger Icon */}
                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {/* Menu Items */}
                    {menus?.map((menu, i) => (
                        <div
                            key={i}
                            className={` ${menu?.margin && "mt-5"} group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-black rounded-md`}
                            onClick={() => handleClick(menu.link)}
                        >
                            <div><menu.icon size="20" /></div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                    }`}
                            >
                                {menu.name}
                            </h2>
                            <h2
                                className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu.name}
                            </h2>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Sidebar;
