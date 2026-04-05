import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, Briefcase } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    // Search handler
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
    }

    // Cleanup when leaving the page
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            
            {/* Added pt-32 to clear fixed navbar */}
            <div className='max-w-7xl mx-auto pt-32 px-4 pb-20'>
                
                {/* --- Stylish Search Bar Section --- */}
                <div className='flex flex-col items-center justify-center mb-16'>
                    <div className='text-center mb-8'>
                        <h1 className='font-black text-4xl md:text-5xl text-gray-900 tracking-tight mb-2'>
                            Discover Your <span className='text-[#6A38C2]'>Next Career</span>
                        </h1>
                        <p className='text-gray-500 font-medium'>Showing {allJobs.length} opportunities for you.</p>
                    </div>

                    <div className='flex w-full md:w-[600px] shadow-xl shadow-purple-100 rounded-full overflow-hidden border border-gray-100 bg-white p-1'>
                        <div className='flex items-center flex-1 px-4'>
                            <Search className='text-[#6A38C2] mr-2' size={20} />
                            <Input
                                type="text"
                                placeholder='Search by job title, company or keywords...'
                                onChange={(e) => setQuery(e.target.value)}
                                className='border-none focus-visible:ring-0 text-sm md:text-base font-medium placeholder:text-gray-400'
                            />
                        </div>
                        <Button 
                            onClick={searchJobHandler}
                            className='bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-full px-8 py-6 font-bold transition-all active:scale-95'
                        >
                            Search
                        </Button>
                    </div>
                </div>

                {/* --- Results Section --- */}
                <div className='space-y-6'>
                    <div className='flex items-center gap-2 ml-2'>
                        <div className='bg-[#6A38C2] p-1 rounded-md text-white'>
                            <Briefcase size={16} />
                        </div>
                        <h2 className='font-black text-xl text-gray-800 tracking-tight'>Search Results</h2>
                    </div>

                    {
                        allJobs.length <= 0 ? (
                            <div className='flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200'>
                                <p className='text-gray-400 font-bold text-lg'>No jobs found at the moment.</p>
                                <span className='text-gray-300 text-sm'>Try adjusting your search criteria.</span>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {
                                    allJobs.map((job) => {
                                        return (
                                            <Job key={job._id} job={job}/>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse