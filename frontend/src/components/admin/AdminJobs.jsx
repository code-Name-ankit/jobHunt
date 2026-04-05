import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus, Search, Briefcase } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar />
      <div className='max-w-6xl mx-auto pt-28 px-4 pb-10'>
        
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
            <div className='flex items-center gap-3'>
                <div className='bg-[#6A38C2]/10 p-2 rounded-xl text-[#6A38C2]'>
                    <Briefcase size={24} />
                </div>
                <div>
                    <h1 className='font-black text-2xl text-gray-900 tracking-tight'>Manage Jobs</h1>
                    <p className='text-xs text-gray-500 font-medium tracking-wide'>Create, edit and manage your active job listings</p>
                </div>
            </div>
            
            <Button 
                onClick={() => navigate("/admin/jobs/create")}
                className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-xl px-6 py-6 font-bold shadow-lg shadow-purple-100 flex items-center gap-2 active:scale-95 transition-all"
            >
                <Plus size={20} />
                Post New Job
            </Button>
        </div>

        {/* Search & Table Container */}
        <div className='bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100'>
            <div className='relative w-full md:w-96 mb-8'>
                <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400'>
                    <Search size={18} />
                </div>
                <Input
                    className="pl-10 py-6 rounded-2xl border-gray-100 bg-gray-50/50 focus-visible:ring-[#6A38C2] text-sm font-medium"
                    placeholder="Filter by company, role or keywords..."
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <div className='overflow-hidden'>
                <AdminJobsTable />
            </div>
        </div>

      </div>
    </div>
  )
}

export default AdminJobs