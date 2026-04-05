import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Briefcase, ExternalLink, Globe } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto pt-28 px-4 pb-10'>
                
                {/* Profile Information Card */}
                <div className='bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 mb-8 relative overflow-hidden'>
                    {/* Subtle Background Glow */}
                    <div className='absolute -top-10 -right-10 w-40 h-40 bg-[#6A38C2]/5 rounded-full blur-3xl' />
                    
                    <div className='relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                        <div className='flex flex-col md:flex-row items-center gap-6'>
                            <Avatar className="h-28 w-28 border-4 border-gray-50 shadow-md">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <div className='text-center md:text-left space-y-1'>
                                <h1 className='font-black text-3xl text-gray-900 tracking-tight'>{user?.fullname}</h1>
                                <p className='text-gray-500 font-medium max-w-md'>{user?.profile?.bio || "No bio added yet."}</p>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            className="rounded-full w-12 h-12 p-0 flex items-center justify-center border-gray-200 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all" 
                            variant="outline"
                        >
                            <Pen size={18} />
                        </Button>
                    </div>

                    {/* Contact Details Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-8'>
                        <div className='flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-50 hover:border-gray-200 transition-all group'>
                            <div className='bg-white p-2 rounded-lg shadow-sm text-[#6A38C2]'>
                                <Mail size={18} />
                            </div>
                            <span className='text-sm font-semibold text-gray-600'>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl border border-gray-50 hover:border-gray-200 transition-all'>
                            <div className='bg-white p-2 rounded-lg shadow-sm text-[#6A38C2]'>
                                <Contact size={18} />
                            </div>
                            <span className='text-sm font-semibold text-gray-600'>{user?.phoneNumber || "N/A"}</span>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className='space-y-4 mb-8'>
                        <div className='flex items-center gap-2'>
                            <Briefcase size={18} className='text-gray-400' />
                            <h2 className='font-bold text-gray-800 uppercase tracking-widest text-xs'>Expertise & Skills</h2>
                        </div>
                        <div className='flex flex-wrap items-center gap-2'>
                            {
                                user?.profile?.skills.length !== 0 ? 
                                user?.profile?.skills.map((item, index) => (
                                    <Badge 
                                        key={index} 
                                        className="bg-purple-50 text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white border-none px-4 py-1.5 rounded-lg font-bold transition-all"
                                    >
                                        {item}
                                    </Badge>
                                )) : <span className='text-gray-400 italic text-sm'>Add your skills to stand out</span>
                            }
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className='pt-6 border-t border-gray-50'>
                        <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Professional Resume</Label>
                        {
                            user?.profile?.resume ? (
                                <a 
                                    target='_blank' 
                                    rel='noopener noreferrer' 
                                    href={user?.profile?.resume} 
                                    className='inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-black transition-all shadow-lg shadow-gray-200 group'
                                >
                                    <span className='font-bold'>{user?.profile?.resumeOriginalName}</span>
                                    <ExternalLink size={16} className='group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                                </a>
                            ) : <span className='text-red-400 font-bold text-sm'>No resume uploaded</span>
                        }
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className='px-4'>
                    <div className='flex items-center gap-3 mb-6'>
                        <Globe size={22} className='text-[#6A38C2]' />
                        <h1 className='font-black text-2xl text-gray-800 tracking-tight'>Applied Jobs</h1>
                    </div>
                    <div className='bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden'>
                        <AppliedJobTable />
                    </div>
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile;