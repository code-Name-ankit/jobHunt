import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Plus, Search, Building2 } from 'lucide-react' // Icons for better UI

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-6xl mx-auto pt-28 px-4'>
                
                {/* Header Section */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-[#6A38C2]/10 p-2 rounded-xl'>
                            <Building2 className='text-[#6A38C2] w-6 h-6' />
                        </div>
                        <div>
                            <h1 className='font-black text-2xl text-gray-900 tracking-tight'>Registered Companies</h1>
                            <p className='text-xs text-gray-500 font-medium'>Manage and monitor your partnered organizations</p>
                        </div>
                    </div>
                    
                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-xl px-6 py-6 font-bold shadow-lg shadow-purple-100 flex items-center gap-2 active:scale-95 transition-all"
                    >
                        <Plus size={20} />
                        New Company
                    </Button>
                </div>

                {/* Filter & Table Container */}
                <div className='bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100'>
                    <div className='relative w-full md:w-80 mb-6'>
                        <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                            <Search className='text-gray-400 w-4 h-4' />
                        </div>
                        <Input
                            className="pl-10 py-5 rounded-xl border-gray-100 focus-visible:ring-[#6A38C2] bg-gray-50/50"
                            placeholder="Filter by company name..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    
                    {/* Table styling is handled inside CompaniesTable, but container is ready */}
                    <div className='overflow-hidden'>
                        <CompaniesTable />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Companies