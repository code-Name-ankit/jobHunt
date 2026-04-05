import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { Briefcase, MapPin, IndianRupee, Users, Calendar, Timer, CheckCircle2 } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    
    // Initial check: Agar user ne pehle se apply kiya hai
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    // Syncing state with fetched data
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-6xl mx-auto pt-32 px-4 pb-20'>
                
                {/* Header Card */}
                <div className='bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
                        <div className='text-center md:text-left'>
                            <h1 className='font-black text-3xl md:text-5xl text-gray-900 tracking-tight'>
                                {singleJob?.title}
                            </h1>
                            <div className='flex flex-wrap justify-center md:justify-start items-center gap-3 mt-6'>
                                <Badge className={'bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full border-none font-bold'}>
                                    {singleJob?.postion} Positions
                                </Badge>
                                <Badge className={'bg-red-50 text-[#F83002] px-4 py-1.5 rounded-full border-none font-bold'}>
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className={'bg-purple-50 text-[#6A38C2] px-4 py-1.5 rounded-full border-none font-bold'}>
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>

                        {/* --- Conditional Applied Button --- */}
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-2xl px-10 py-8 text-lg font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2 ${
                                isApplied 
                                ? 'bg-green-50 text-green-600 cursor-not-allowed shadow-none border border-green-100' 
                                : 'bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-purple-100'
                            }`}
                        >
                            {isApplied ? (
                                <>
                                    <CheckCircle2 size={20} />
                                    Applied
                                </>
                            ) : (
                                'Apply Now'
                            )}
                        </Button>
                    </div>
                </div>

                {/* Job Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                    <div className='lg:col-span-2'>
                        <div className='bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 h-full'>
                            <h2 className='text-2xl font-black text-gray-900 mb-6 flex items-center gap-2'>
                                <div className='w-2 h-8 bg-[#6A38C2] rounded-full' /> Job Overview
                            </h2>
                            <p className='text-gray-600 leading-relaxed text-lg whitespace-pre-line'>
                                {singleJob?.description}
                            </p>
                        </div>
                    </div>

                    <div className='lg:col-span-1'>
                        <div className='bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-32'>
                            <h3 className='font-black text-xl text-gray-900 mb-8 tracking-tight'>Quick Summary</h3>
                            <div className='space-y-6'>
                                <InfoItem icon={<Briefcase size={20}/>} label="Role" value={singleJob?.title} />
                                <InfoItem icon={<MapPin size={20}/>} label="Location" value={singleJob?.location} />
                                <InfoItem icon={<Timer size={20}/>} label="Experience" value={`${singleJob?.experience} Years`} />
                                <InfoItem icon={<IndianRupee size={20}/>} label="Total Salary" value={`${singleJob?.salary} LPA`} />
                                <InfoItem icon={<Users size={20}/>} label="Applications" value={singleJob?.applications?.length} />
                                <InfoItem icon={<Calendar size={20}/>} label="Posted On" value={singleJob?.createdAt?.split("T")[0]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const InfoItem = ({ icon, label, value }) => (
    <div className='flex items-start gap-4'>
        <div className='bg-gray-50 p-3 rounded-xl text-[#6A38C2]'>
            {icon}
        </div>
        <div>
            <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>{label}</p>
            <p className='text-sm font-bold text-gray-800'>{value || "N/A"}</p>
        </div>
    </div>
)

export default JobDescription;