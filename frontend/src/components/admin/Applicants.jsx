import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto pt-28 px-4 pb-10'>
                
                {/* Header Section */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
                    <div className='flex items-center gap-4'>
                        <button 
                            onClick={() => navigate("/admin/jobs")}
                            className='p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200 text-gray-400 hover:text-gray-900'
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className='flex items-center gap-3'>
                            <div className='bg-[#6A38C2]/10 p-2.5 rounded-xl text-[#6A38C2]'>
                                <Users size={24} />
                            </div>
                            <div>
                                <h1 className='font-black text-2xl text-gray-900 tracking-tight'>
                                    Applicants
                                </h1>
                                <p className='text-xs text-gray-500 font-medium tracking-wide'>
                                    Reviewing candidates for <span className='text-[#6A38C2] font-bold'>"{applicants?.title}"</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Applicant Count Badge */}
                    <div className='bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3'>
                        <span className='text-sm font-bold text-gray-400 uppercase tracking-widest'>Total Applied</span>
                        <span className='bg-[#6A38C2] text-white px-3 py-1 rounded-lg font-black text-lg shadow-md shadow-purple-100'>
                            {applicants?.applications?.length || 0}
                        </span>
                    </div>
                </div>

                {/* Table Container */}
                <div className='bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100'>
                    <div className='overflow-hidden'>
                        <ApplicantsTable />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Applicants