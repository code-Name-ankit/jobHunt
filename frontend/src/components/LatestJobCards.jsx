
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, ArrowUpRight } from 'lucide-react' // Modern icons for extra detail

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden'
        >
            {/* Top Section: Company Info & Action Icon */}
            <div className='flex items-center justify-between mb-4'>
                <div className='flex flex-col'>
                    <h1 className='font-bold text-lg text-[#6A38C2] group-hover:underline decoration-2 underline-offset-4'>
                        {job?.company?.name}
                    </h1>
                    <div className='flex items-center gap-1 text-gray-400 mt-0.5'>
                        <MapPin size={14} />
                        <p className='text-xs font-medium'>India • Remote/On-site</p>
                    </div>
                </div>
                {/* Visual indicator that it's clickable */}
                <div className='bg-gray-50 p-2 rounded-full text-gray-400 group-hover:bg-[#6A38C2] group-hover:text-white transition-colors duration-300'>
                    <ArrowUpRight size={18} />
                </div>
            </div>

            {/* Middle Section: Job Title & Description */}
            <div className='space-y-2'>
                <h1 className='font-extrabold text-xl text-gray-800 line-clamp-1'>
                    {job?.title}
                </h1>
                <p className='text-sm text-gray-500 leading-relaxed line-clamp-2'>
                    {job?.description || "Join our dynamic team and help us build the future of technology with your expertise."}
                </p>
            </div>

            {/* Bottom Section: Badges with subtle backgrounds */}
            <div className='flex flex-wrap items-center gap-2 mt-6'>
                <Badge 
                    className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-none font-bold px-3 py-1 rounded-lg' 
                    variant="outline"
                >
                    {job?.position} Positions
                </Badge>
                <Badge 
                    className='bg-red-50 text-[#F83002] hover:bg-red-100 border-none font-bold px-3 py-1 rounded-lg' 
                    variant="outline"
                >
                    {job?.jobType}
                </Badge>
                <Badge 
                    className='bg-purple-50 text-[#7209b7] hover:bg-purple-100 border-none font-bold px-3 py-1 rounded-lg' 
                    variant="outline"
                >
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards