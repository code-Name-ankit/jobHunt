import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { CalendarDays, Building2 } from 'lucide-react'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    return (
        <div className='overflow-hidden'>
            <Table>
                <TableCaption className="pb-4 text-xs font-medium text-gray-400 italic">
                    {allAppliedJobs.length <= 0 ? "" : "A real-time overview of your application journey."}
                </TableCaption>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
                        <TableHead className="font-bold text-gray-700">Date</TableHead>
                        <TableHead className="font-bold text-gray-700">Job Role</TableHead>
                        <TableHead className="font-bold text-gray-700">Company</TableHead>
                        <TableHead className="text-right font-bold text-gray-700 px-6">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-20 text-gray-400 font-medium">
                                    You haven't applied to any jobs yet. Start exploring!
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="py-4">
                                        <div className='flex items-center gap-2 text-gray-500'>
                                            <CalendarDays size={14} className='opacity-70' />
                                            <span className='text-sm font-medium'>{appliedJob?.createdAt?.split("T")[0]}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className='font-bold text-gray-800'>{appliedJob.job?.title}</TableCell>
                                    <TableCell>
                                        <div className='flex items-center gap-2 text-gray-600'>
                                            <Building2 size={14} className='text-[#6A38C2]' />
                                            <span className='font-medium'>{appliedJob.job?.company?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right px-6">
                                        <Badge 
                                            className={`rounded-full px-3 py-1 font-black text-[10px] tracking-wider border-none shadow-sm ${
                                                appliedJob?.status === "rejected" 
                                                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                                                : appliedJob.status === 'pending' 
                                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                                            }`}
                                        >
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable