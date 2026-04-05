import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Lock, Mail, UserCheck } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            {/* pt-32 to avoid overlapping with fixed navbar */}
            <div className='flex items-center justify-center max-w-7xl mx-auto pt-32 pb-20 px-4'>
                <form onSubmit={submitHandler} className='w-full md:w-[450px] bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm'>
                    
                    {/* Header Section */}
                    <div className='text-center mb-10'>
                        <div className='bg-[#6A38C2]/10 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#6A38C2]'>
                            <UserCheck size={24} />
                        </div>
                        <h1 className='font-black text-3xl text-gray-900 tracking-tight'>Welcome Back</h1>
                        <p className='text-gray-500 font-medium mt-2'>Enter your credentials to access your account.</p>
                    </div>

                    <div className='space-y-6'>
                        {/* Email Input */}
                        <div className='space-y-1.5'>
                            <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <Mail size={16} className='text-[#6A38C2]' /> Email Address
                            </Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@example.com"
                                className="rounded-xl border-gray-100 bg-gray-50/50 py-6 focus-visible:ring-[#6A38C2]"
                            />
                        </div>

                        {/* Password Input */}
                        <div className='space-y-1.5'>
                            <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <Lock size={16} className='text-[#6A38C2]' /> Password
                            </Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="rounded-xl border-gray-100 bg-gray-50/50 py-6 focus-visible:ring-[#6A38C2]"
                            />
                        </div>

                        {/* Role Selection */}
                        <div className='py-2'>
                            <Label className='font-bold text-gray-700 ml-1 mb-3 block'>Login as</Label>
                            <RadioGroup className="flex items-center gap-4">
                                <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all border cursor-pointer ${input.role === 'student' ? 'bg-purple-50 border-purple-200' : 'border-transparent hover:bg-gray-50'}`}>
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer w-4 h-4 accent-[#6A38C2]"
                                    />
                                    <Label className="cursor-pointer font-bold text-sm text-gray-700">Student</Label>
                                </div>
                                <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all border cursor-pointer ${input.role === 'recruiter' ? 'bg-purple-50 border-purple-200' : 'border-transparent hover:bg-gray-50'}`}>
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer w-4 h-4 accent-[#6A38C2]"
                                    />
                                    <Label className="cursor-pointer font-bold text-sm text-gray-700">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-2'>
                            {
                                loading ? (
                                    <Button disabled className="w-full py-7 rounded-2xl bg-[#6A38C2]">
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Verifying...
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="w-full py-7 rounded-2xl bg-[#6A38C2] hover:bg-[#5b30a6] text-lg font-bold shadow-lg shadow-purple-100 transition-all active:scale-[0.98]"
                                    >
                                        Login
                                    </Button>
                                )
                            }
                        </div>

                        <p className='text-center text-gray-500 font-medium text-sm pt-2'>
                            Don't have an account? <Link to="/signup" className='text-[#6A38C2] font-bold hover:underline'>Create one</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login