import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowLeft } from 'lucide-react' // Icons for better UI

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if(!companyName.trim()){
            toast.error("Company name is required");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto pt-32 px-4'>
                {/* Header Section */}
                <div className='mb-10 text-center md:text-left'>
                    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6A38C2]/10 text-[#6A38C2] text-xs font-bold uppercase tracking-wider mb-4'>
                        <Building2 size={14} />
                        Step 1: Setup Company
                    </div>
                    <h1 className='font-black text-3xl md:text-4xl text-gray-900 tracking-tight'>
                        What's your company name?
                    </h1>
                    <p className='text-gray-500 mt-2 font-medium'>
                        Give your company a professional identity. You can always change this later in settings.
                    </p>
                </div>

                {/* Form Card */}
                <div className='bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100'>
                    <div className='space-y-4'>
                        <Label className='text-gray-700 font-bold text-sm ml-1'>Company Legal Name</Label>
                        <Input
                            type="text"
                            className="py-6 px-5 rounded-2xl border-gray-100 focus-visible:ring-[#6A38C2] bg-gray-50/50 text-lg font-medium placeholder:text-gray-300"
                            placeholder="e.g. Microsoft, Google, JobHunt"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className='flex items-center justify-end gap-4 mt-12'>
                        <Button 
                            variant="ghost" 
                            onClick={() => navigate("/admin/companies")}
                            className="rounded-xl px-6 font-bold text-gray-500 hover:text-gray-900"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={registerNewCompany}
                            disabled={!companyName.trim()}
                            className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-xl px-10 py-6 font-bold shadow-lg shadow-purple-100 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none"
                        >
                            Continue
                        </Button>
                    </div>
                </div>

                {/* Simple Back button */}
                <button 
                    onClick={() => navigate("/admin/companies")}
                    className='mt-8 flex items-center gap-2 text-gray-400 hover:text-[#6A38C2] transition-colors text-sm font-bold mx-auto md:mx-0'
                >
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>
            </div>
        </div>
    )
}

export default CompanyCreate;