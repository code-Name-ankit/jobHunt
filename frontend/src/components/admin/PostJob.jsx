import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Briefcase, AlertCircle } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if(!input.companyId){
            toast.error("Please select a company");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center w-full pt-28 pb-10 px-4'>
                <div className='w-full max-w-4xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100'>
                    
                    {/* Header */}
                    <div className='mb-10 text-center md:text-left'>
                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6A38C2]/10 text-[#6A38C2] text-xs font-bold uppercase mb-4'>
                            <Briefcase size={14} /> Admin Portal
                        </div>
                        <h1 className='font-black text-3xl text-gray-900 tracking-tight'>Post New Opportunity</h1>
                        <p className='text-gray-500 font-medium mt-1'>Fill in the details to find the best talent for your team.</p>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <Label className="font-bold text-gray-700 ml-1">Job Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Senior Frontend Developer"
                                    className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="font-bold text-gray-700 ml-1">Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Brief about the role"
                                    className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="font-bold text-gray-700 ml-1">Requirements</Label>
                                <Input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. React, Node.js, Tailwind"
                                    className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="font-bold text-gray-700 ml-1">Salary (LPA)</Label>
                                <Input
                                    type="text"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 12"
                                    className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="font-bold text-gray-700 ml-1">Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Remote, Bangalore"
                                    className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="font-bold text-gray-700 ml-1">Job Type</Label>
                                <Input
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Full-time, Internship"
                                    className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="font-bold text-gray-700 ml-1">Experience Level (Yrs)</Label>
                                <Input
                                    type="text"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 2"
                                    className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="font-bold text-gray-700 ml-1">No of Position</Label>
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                />
                            </div>
                            
                            {/* Company Selector */}
                            <div className='space-y-2 md:col-span-2'>
                                <Label className="font-bold text-gray-700 ml-1">Select Company</Label>
                                {
                                    companies.length > 0 ? (
                                        <Select onValueChange={selectChangeHandler}>
                                            <SelectTrigger className="w-full py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus:ring-[#6A38C2]">
                                                <SelectValue placeholder="Which company is hiring?" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                                <SelectGroup>
                                                    {
                                                        companies.map((company) => (
                                                            <SelectItem 
                                                                key={company._id} 
                                                                value={company?.name?.toLowerCase()}
                                                                className="py-3 focus:bg-purple-50"
                                                            >
                                                                {company.name}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <div className='flex items-center gap-2 text-[#F83002] bg-red-50 p-4 rounded-2xl border border-red-100'>
                                            <AlertCircle size={18} />
                                            <p className='text-xs font-bold uppercase tracking-tight'>Please register a company first</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='mt-10'>
                            {
                                loading ? (
                                    <Button disabled className="w-full py-7 rounded-2xl bg-[#6A38C2]">
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Posting...
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        disabled={companies.length === 0}
                                        className="w-full py-7 rounded-2xl bg-[#6A38C2] hover:bg-[#5b30a6] text-lg font-bold shadow-lg shadow-purple-100 transition-all active:scale-[0.98] disabled:opacity-50"
                                    >
                                        Post Job Opportunity
                                    </Button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob