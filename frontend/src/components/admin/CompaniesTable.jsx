import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Calendar, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    // --- DELETE HANDLER ---
    const deleteCompanyHandler = async (id) => {
        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                // Refreshing the page to update UI
                window.location.reload();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className='mt-5 overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white'>
            <Table>
                <TableCaption className="pb-4 text-xs text-gray-400 italic">Manage your registered companies and their data.</TableCaption>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
                        <TableHead className="w-[100px] font-bold text-gray-700">Logo</TableHead>
                        <TableHead className="font-bold text-gray-700">Company Name</TableHead>
                        <TableHead className="font-bold text-gray-700">Registration Date</TableHead>
                        <TableHead className="text-right font-bold text-gray-700 px-6">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-20 text-gray-400 font-medium italic">
                                No companies found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="hover:bg-gray-50/50 transition-colors">
                                <TableCell className="py-4">
                                    <Avatar className="h-12 w-12 border border-gray-100 shadow-sm bg-white">
                                        <AvatarImage src={company.logo} className="object-contain p-1" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-bold text-gray-800 text-base">
                                    {company.name}
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2 text-gray-500'>
                                        <Calendar size={14} className='text-[#6A38C2]' />
                                        <span className='text-sm font-medium'>{company.createdAt.split("T")[0]}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right px-6">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className='p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900'>
                                                <MoreHorizontal className='w-5 h-5' />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2 rounded-xl shadow-xl border-gray-50" align="end">
                                            <div className='space-y-1'>
                                                {/* Edit Option */}
                                                <div 
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                                    className='flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded-lg cursor-pointer group transition-colors'
                                                >
                                                    <Edit2 className='w-4 h-4 text-gray-400 group-hover:text-[#6A38C2]' />
                                                    <span className='text-sm font-medium text-gray-600 group-hover:text-[#6A38C2]'>Edit</span>
                                                </div>

                                                {/* Delete Option */}
                                                <div 
                                                    onClick={() => deleteCompanyHandler(company._id)} 
                                                    className='flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg cursor-pointer group transition-colors'
                                                >
                                                    <Trash2 className='w-4 h-4 text-gray-400 group-hover:text-red-600' />
                                                    <span className='text-sm font-medium text-gray-600 group-hover:text-red-600'>Delete</span>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable;