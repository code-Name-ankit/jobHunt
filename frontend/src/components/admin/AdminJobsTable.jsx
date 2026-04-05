import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react' // Trash2 icon add kiya
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs, searchJobByText]);

    // --- DELETE LOGIC ---
    const deleteJobHandler = async (jobId) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                // Note: Iske baad aapko Redux state bhi update karni chahiye 
                // ya page reload/re-fetch karna chahiye.
                window.location.reload(); 
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='mt-5 overflow-hidden rounded-xl border border-gray-100 shadow-sm'>
            <Table>
                <TableCaption className="pb-4">A list of your recent posted jobs</TableCaption>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
                        <TableHead className="font-bold">Company Name</TableHead>
                        <TableHead className="font-bold">Role</TableHead>
                        <TableHead className="font-bold">Date</TableHead>
                        <TableHead className="text-right font-bold px-6">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50/50 transition-colors">
                                <TableCell className="font-medium text-gray-700">{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell className="text-gray-500">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right px-6">
                                    <Popover>
                                        <PopoverTrigger>
                                            <button className='p-2 hover:bg-gray-100 rounded-full transition-all'>
                                                <MoreHorizontal className='w-5 h-5 text-gray-500' />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2 rounded-xl shadow-xl border-gray-100" align="end">
                                            {/* Edit */}
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer group'>
                                                <Edit2 className='w-4 h-4 text-gray-400 group-hover:text-[#6A38C2]' />
                                                <span className='text-sm font-medium text-gray-600 group-hover:text-[#6A38C2]'>Edit</span>
                                            </div>
                                            
                                            {/* Applicants */}
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer group mt-1'>
                                                <Eye className='w-4 h-4 text-gray-400 group-hover:text-blue-600'/>
                                                <span className='text-sm font-medium text-gray-600 group-hover:text-blue-600'>Applicants</span>
                                            </div>

                                            {/* Delete Option Add kiya */}
                                            <div onClick={() => deleteJobHandler(job._id)} className='flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg cursor-pointer group mt-1'>
                                                <Trash2 className='w-4 h-4 text-gray-400 group-hover:text-red-600' />
                                                <span className='text-sm font-medium text-gray-600 group-hover:text-red-600'>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable