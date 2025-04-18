import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    console.log(name, email)


    const logout = () => {
        localStorage.removeItem('notes-token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        window.location.href = '/'; // or use navigate('/login') if using React Router
    };

    return (
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm relative z-50"   >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Side - Company Name */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0 flex items-center"
                    >
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            NoteFlow
                        </span>
                    </motion.div>

                    {/* Right Side - User Profile */}
                    <div className="relative ml-4 flex items-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-3 cursor-pointer"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {/* User Avatar */}
                            <div className="relative">
                                <div className="h-10 w-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold text-lg">
                                    {name ? name.split(" ").map(word => word[0]).join("").toUpperCase() : 'NA'}
                                </div>
                                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                            </div>


                            {/* User Details (Desktop) */}
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-900">{name}</p>
                                <p className="text-xs font-medium text-gray-500 truncate">{email}</p>
                            </div>

                            <ChevronDownIcon
                                className={`h-5 w-5 text-gray-500 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </motion.div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="origin-top-right absolute right-0 mt-[200px] w-48 rounded-lg shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                            >
                                <div className="py-2 px-4">
                                    <div className="md:hidden border-b border-gray-100 pb-2 mb-2">
                                        <p className="text-sm text-gray-900 font-medium">{name}</p>
                                        <p className="text-xs text-gray-500 truncate">{email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <a
                                            href="#"
                                            className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                        >
                                            Profile Settings
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                                        >
                                            Billing
                                        </a>
                                        <a
                                            onClick={() => logout()}
                                            className="block px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        >
                                            Sign out
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;