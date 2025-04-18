import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/action/auth';
import { Link } from 'react-router-dom'
import Spinner from './Spinner';
import AuthContext from '../context/AuthContext';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        emailId: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const { btnSpinner, setBtnSpinner } = useContext(AuthContext)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnSpinner(true)
        dispatch(loginUser(formData.emailId, formData.password, setBtnSpinner))
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-sm" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-2xl mx-4 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Illustration */}
                    <div className="lg:w-1/2 bg-blue-500/20 p-8 hidden lg:flex flex-col items-center justify-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2991/2991065.png"
                            alt="Login Illustration"
                            className="w-64 h-64 object-contain"
                        />
                        <h3 className="mt-6 text-2xl font-bold text-white text-center">
                            Welcome Back!
                        </h3>
                        <p className="mt-2 text-blue-100 text-center">
                            Continue your journey with us
                        </p>
                    </div>

                    {/* Right Side - Form */}
                    <div className="lg:w-1/2 p-8 bg-white/70 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Sign In
                        </h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
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
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.emailId ? 'border-red-500' : 'border-gray-200'
                                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId}</p>}
                            </motion.div>

                            {/* Password Input */}
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
                                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </motion.div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-semibold flex items-center justify-center"
                            >
                                {btnSpinner ? (<Spinner />) : (<><p>Login</p></>)}
                            </motion.button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to={'/signup'} className="font-medium text-blue-600 hover:text-blue-500">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginForm;