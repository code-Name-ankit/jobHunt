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
import { setLoading } from '@/redux/authSlice'
import { Loader2, UserPlus, Mail, Phone, Lock, UserCircle, Image as ImageIcon } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.role) {
            return toast.error("Please select a role");
        }
        
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
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
            
            {/* Added pt-32 to fix overlapping with navbar */}
            <div className='flex items-center justify-center max-w-7xl mx-auto pt-32 pb-20 px-4'>
                <form onSubmit={submitHandler} className='w-full md:w-[550px] bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm'>
                    
                    {/* Header Section */}
                    <div className='text-center mb-10'>
                        <div className='bg-[#6A38C2]/10 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#6A38C2]'>
                            <UserPlus size={24} />
                        </div>
                        <h1 className='font-black text-3xl text-gray-900 tracking-tight'>Create Account</h1>
                        <p className='text-gray-500 font-medium mt-2'>Join our community and find your dream job.</p>
                    </div>

                    <div className='space-y-5'>
                        {/* Full Name */}
                        <div className='space-y-1.5'>
                            <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <UserCircle size={16} className='text-[#6A38C2]' /> Full Name
                            </Label>
                            <Input
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="Enter your full name"
                                className="rounded-xl border-gray-100 bg-gray-50/50 py-6 focus-visible:ring-[#6A38C2]"
                            />
                        </div>

                        {/* Email */}
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

                        {/* Phone & Password Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-1.5'>
                                <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                    <Phone size={16} className='text-[#6A38C2]' /> Phone
                                </Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="8080xxxxxx"
                                    className="rounded-xl border-gray-100 bg-gray-50/50 py-6 focus-visible:ring-[#6A38C2]"
                                />
                            </div>
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
                        </div>

                        {/* Role Selection & File Upload */}
                        <div className='flex flex-col md:flex-row items-center justify-between gap-6 py-2'>
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all border cursor-pointer ${input.role === 'student' ? 'bg-purple-50 border-purple-200' : 'border-transparent hover:bg-gray-50'}`}>
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer w-4 h-4 accent-[#6A38C2]"
                                        id="r1"
                                    />
                                    <Label htmlFor="r1" className="cursor-pointer font-bold text-sm text-gray-700">Student</Label>
                                </div>
                                <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all border cursor-pointer ${input.role === 'recruiter' ? 'bg-purple-50 border-purple-200' : 'border-transparent hover:bg-gray-50'}`}>
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer w-4 h-4 accent-[#6A38C2]"
                                        id="r2"
                                    />
                                    <Label htmlFor="r2" className="cursor-pointer font-bold text-sm text-gray-700">Recruiter</Label>
                                </div>
                            </div>

                            <div className='flex flex-col gap-1.5 w-full md:w-auto'>
                                <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                    <ImageIcon size={14} className='text-[#6A38C2]' /> Profile Pic
                                </Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="cursor-pointer border-gray-100 bg-gray-50/50 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-[#6A38C2] hover:file:bg-purple-200 transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-4'>
                            {
                                loading ? (
                                    <Button disabled className="w-full py-7 rounded-2xl bg-[#6A38C2]">
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Creating account...
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="w-full py-7 rounded-2xl bg-[#6A38C2] hover:bg-[#5b30a6] text-lg font-bold shadow-lg shadow-purple-100 transition-all active:scale-[0.98]"
                                    >
                                        Create Account
                                    </Button>
                                )
                            }
                        </div>

                        <p className='text-center text-gray-500 font-medium text-sm pt-2'>
                            Already have an account? <Link to="/login" className='text-[#6A38C2] font-bold hover:underline'>Login here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup