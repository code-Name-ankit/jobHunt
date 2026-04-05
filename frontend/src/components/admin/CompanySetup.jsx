import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, AlignLeft, UploadCloud } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto pt-28 px-4 pb-10'>
                <form onSubmit={submitHandler} className='bg-white shadow-sm border border-gray-100 rounded-[2.5rem] overflow-hidden'>
                    {/* Header */}
                    <div className='flex items-center justify-between p-8 border-b border-gray-50'>
                        <div className='flex items-center gap-4'>
                            <Button 
                                type="button"
                                onClick={() => navigate("/admin/companies")} 
                                variant="ghost" 
                                className="flex items-center gap-2 text-gray-500 font-bold hover:bg-gray-100 rounded-xl"
                            >
                                <ArrowLeft size={18}/>
                                <span>Back</span>
                            </Button>
                            <h1 className='font-black text-2xl text-gray-900'>Company Details</h1>
                        </div>
                        {
                            loading ? (
                                <Button disabled className="bg-[#6A38C2] rounded-xl px-8">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                </Button>
                            ) : (
                                <Button type="submit" className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-xl px-10 font-bold shadow-lg shadow-purple-100">
                                    Save Changes
                                </Button>
                            )
                        }
                    </div>

                    {/* Form Body */}
                    <div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
                        
                        {/* Company Name */}
                        <div className='space-y-2'>
                            <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <Building2 size={16} className='text-[#6A38C2]' /> Company Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                            />
                        </div>

                        {/* Website */}
                        <div className='space-y-2'>
                            <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <Globe size={16} className='text-[#6A38C2]' /> Website URL
                            </Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                placeholder="https://example.com"
                            />
                        </div>

                        {/* Location */}
                        <div className='space-y-2'>
                            <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <MapPin size={16} className='text-[#6A38C2]' /> Location
                            </Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2]"
                                placeholder="City, Country"
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className='space-y-2'>
                            <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <UploadCloud size={16} className='text-[#6A38C2]' /> Company Logo
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="py-2 px-4 rounded-2xl border-gray-100 bg-gray-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-[#6A38C2] hover:file:bg-purple-100 transition-all cursor-pointer"
                            />
                        </div>

                        {/* Description - Full Width */}
                        <div className='md:col-span-2 space-y-2'>
                            <Label className="flex items-center gap-2 font-bold text-gray-700 ml-1">
                                <AlignLeft size={16} className='text-[#6A38C2]' /> Company Description
                            </Label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                rows="4"
                                className="w-full p-4 rounded-2xl border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] focus:ring-offset-0 transition-all text-sm md:text-base"
                                placeholder="Tell us about your company vision and culture..."
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup