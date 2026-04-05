import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'; // Animation ke liye (optional)

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            {/* Heading Section */}
            <div className='mb-10'>
                <h1 className='text-3xl md:text-4xl font-bold'>
                    <span className='text-[#6A38C2]'>Latest & Top </span> 
                    Job Openings
                </h1>
                <p className='text-gray-500 mt-2 text-sm md:text-base'>
                    Discover the most recent opportunities from world-class companies.
                </p>
            </div>

            {/* Jobs Grid - Mobile Friendly */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5'>
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200'>
                            <p className='text-gray-400 font-medium text-lg'>No Jobs Available at the moment</p>
                            <span className='text-sm text-gray-300'>Please check back later!</span>
                        </div>
                    ) : (
                        allJobs?.slice(0, 6).map((job) => (
                            <div key={job._id} className="transform transition-all duration-300 hover:-translate-y-2">
                                <LatestJobCards job={job} />
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs