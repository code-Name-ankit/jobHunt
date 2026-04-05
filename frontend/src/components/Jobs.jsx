import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            {/* pt-24 added to prevent content hiding under floating navbar */}
            <div className='max-w-7xl mx-auto pt-24 px-4'>
                <div className='flex flex-col md:flex-row gap-8'>
                    
                    {/* Sidebar: Filter Card (Sticky on desktop) */}
                    <div className='w-full md:w-1/4 lg:w-1/5'>
                        <div className='md:sticky md:top-24'>
                            <FilterCard />
                        </div>
                    </div>

                    {/* Main Content: Jobs List */}
                    <div className='flex-1 pb-10'>
                        {
                            filterJobs.length <= 0 ? (
                                <div className='flex flex-col items-center justify-center h-[50vh] bg-white rounded-3xl shadow-sm border border-gray-100'>
                                    <span className='text-xl font-bold text-gray-400'>No jobs found matching your criteria</span>
                                    <p className='text-gray-300'>Try adjusting your filters or search query.</p>
                                </div>
                            ) : (
                                // Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    <AnimatePresence>
                                        {
                                            filterJobs.map((job) => (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id}>
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </AnimatePresence>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs