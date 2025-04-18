import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/action/auth';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

const SignupForm = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        fullName: '',
        emailId: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { btnSpinner, setBtnSpinner } = useContext(AuthContext)

    // ... Keep previous state management and validation logic ...
    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnSpinner(true)
        if (formData.phoneNumber?.length !== 10) {
            return toast.error("Phone Number must be 10 digit.");
        }
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Password do not match with confirm password");
        }
        dispatch(registerUser(formData.fullName, formData.emailId, formData.password, formData.phoneNumber, setBtnSpinner));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const checkValidation = () => {
        if (
            formData.password === "" ||
            formData.confirmPassword === "" ||
            formData.phoneNumber === "" ||
            formData.emailId === "" ||
            formData.fullName === ""
        ) {
            return true;
        }
        return false;
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/80 to-purple-600/80 backdrop-blur-sm" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-2xl mx-4 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Illustration */}
                    <div className="lg:w-1/2 bg-indigo-500/20 p-8 hidden lg:flex flex-col items-center justify-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2991/2991112.png"
                            alt="Signup Illustration"
                            className="w-64 h-64 object-contain"
                        />
                        <h3 className="mt-6 text-2xl font-bold text-white text-center">
                            Join Our Community
                        </h3>
                        <p className="mt-2 text-indigo-100 text-center">
                            Start your journey with us and explore amazing features
                        </p>
                    </div>

                    {/* Right Side - Form */}
                    <div className="lg:w-1/2 p-8 bg-white/70 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Create Account
                        </h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                {/* First Name Input - Keep similar to previous but with motion */}
                                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <div className="relative">
                                        <UserIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-200'
                                                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                            placeholder="John"
                                        />
                                    </div>
                                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                                </motion.div>

                                {/* Last Name Input */}
                                {/* <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <div className="relative">
                                        <UserIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </motion.div> */}
                            </div>

                            {/* Email Input */}
                            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <div className="relative">
                                    <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        name="emailId"
                                        value={formData.emailId}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'
                                            } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </motion.div>


                            {/* Phone Input */}
                            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone</label>
                                <div className="relative">
                                    <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="num"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
                                            } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                        placeholder="+91"
                                    />
                                </div>
                                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                            </motion.div>

                            {/* Password Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-200'
                                                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                        />
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                    <div className="relative">
                                        <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                                                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                                </motion.div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all font-semibold flex items-center justify-center"
                            >
                                {btnSpinner ? (<Spinner />) : (<><p>Create Acount</p></>)}
                            </motion.button>
                        </form>

                        {/* Social Login */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to={'/'} className="font-medium text-blue-600 hover:text-blue-500">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupForm;