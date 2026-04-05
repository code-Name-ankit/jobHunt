import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, PenTool, Code2, FileText } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "", 
        file: null
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false); // Success hone par close karein
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[450px] rounded-[2rem] p-8 mt-12" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Update Profile</DialogTitle>
                    <p className='text-sm text-gray-500 font-medium'>Keep your professional information up to date.</p>
                </DialogHeader>
                <form onSubmit={submitHandler} className='mt-4'>
                    <div className='space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar'>
                        
                        {/* Full Name - Fixed name attribute */}
                        <div className='space-y-1.5'>
                            <Label htmlFor="fullname" className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <User size={14} className='text-[#6A38C2]' /> Full Name
                            </Label>
                            <Input
                                id="fullname"
                                name="fullname" // "name" se "fullname" kar diya taaki state update ho
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="rounded-xl border-gray-100 bg-gray-50/50 py-5 focus-visible:ring-[#6A38C2]"
                            />
                        </div>

                        {/* Email */}
                        <div className='space-y-1.5'>
                            <Label htmlFor="email" className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <Mail size={14} className='text-[#6A38C2]' /> Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="rounded-xl border-gray-100 bg-gray-50/50 py-5 focus-visible:ring-[#6A38C2]"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className='space-y-1.5'>
                            <Label htmlFor="phoneNumber" className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <Phone size={14} className='text-[#6A38C2]' /> Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber" // Fix name
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="rounded-xl border-gray-100 bg-gray-50/50 py-5 focus-visible:ring-[#6A38C2]"
                            />
                        </div>

                        {/* Bio */}
                        <div className='space-y-1.5'>
                            <Label htmlFor="bio" className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <PenTool size={14} className='text-[#6A38C2]' /> Bio
                            </Label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                rows="3"
                                className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] text-sm font-medium transition-all"
                                placeholder="Write something about yourself..."
                            />
                        </div>

                        {/* Skills */}
                        <div className='space-y-1.5'>
                            <Label htmlFor="skills" className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <Code2 size={14} className='text-[#6A38C2]' /> Skills (comma separated)
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="rounded-xl border-gray-100 bg-gray-50/50 py-5 focus-visible:ring-[#6A38C2]"
                                placeholder="React, Node.js, Tailwind..."
                            />
                        </div>

                        {/* Resume Upload */}
                        <div className='space-y-1.5 pb-2'>
                            <Label htmlFor="file" className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <FileText size={14} className='text-[#6A38C2]' /> Update Resume (PDF)
                            </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="rounded-xl border-gray-100 bg-gray-50/50 cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-[#6A38C2] hover:file:bg-purple-200 transition-all"
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        {
                            loading ? (
                                <Button disabled className="w-full bg-[#6A38C2] rounded-xl py-6 font-bold">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] rounded-xl py-6 font-bold shadow-lg shadow-purple-100 transition-all active:scale-95">
                                    Save Profile Changes
                                </Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog;