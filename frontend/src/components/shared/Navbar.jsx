import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Briefcase } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'


const NavLink = ({ to, label, color = "hover:bg-white hover:text-[#6A38C2]" }) => (
    <li>
        <Link to={to} className={`px-5 py-2 rounded-full text-sm font-semibold text-gray-600 transition-all duration-300 ${color} hover:shadow-sm`}>
            {label}
        </Link>
    </li>
)

const MobileLink = ({ to, label, onClick }) => (
    <li onClick={onClick}>
        <Link to={to} className='text-xl font-bold text-gray-800 hover:text-[#6A38C2] transition-colors block'>
            {label}
        </Link>
    </li>
)


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 z-[1000] px-4 py-3 md:px-10'>
            <div className={`mx-auto max-w-7xl rounded-2xl transition-all duration-500 shadow-sm border border-white/20 bg-white/70 backdrop-blur-xl ${isOpen ? 'rounded-b-none' : ''}`}>
                <div className='flex items-center justify-between h-16 px-6'>
                    
                    <div className='flex items-center gap-4 md:flex-1'>
                        <div className='md:hidden'>
                            <button onClick={() => setIsOpen(!isOpen)} className='p-2 hover:bg-gray-100 rounded-xl transition-colors'>
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                        
                        <div className='absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0'>
                            <Link to="/" className='flex items-center gap-2 group'>
                                <div className='bg-[#6A38C2] p-1.5 rounded-lg rotate-3 group-hover:rotate-0 transition-transform'>
                                    <Briefcase className='text-white w-5 h-5' />
                                </div>
                                <h1 className='text-xl font-extrabold tracking-tight text-gray-900 italic'>
                                    Job<span className='text-[#6A38C2] not-italic'>Hub</span>
                                </h1>
                            </Link>
                        </div>
                    </div>

                    <nav className='hidden md:flex items-center justify-center flex-[2]'>
                        <ul className='flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50 list-none'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <NavLink to="/admin/companies" label="Companies" color="hover:bg-white hover:text-[#F83002]" />
                                    <NavLink to="/admin/jobs" label="Jobs" color="hover:bg-white hover:text-[#F83002]" />
                                </>
                            ) : (
                                <>
                                    <NavLink to="/" label="Home" />
                                    <NavLink to="/jobs" label="Jobs" />
                                    <NavLink to="/browse" label="Browse" />
                                </>
                            )}
                        </ul>
                    </nav>

                    <div className='flex items-center justify-end gap-3 md:flex-1'>
                        {!user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login" className="hidden sm:block">
                                    <Button variant="ghost" className="rounded-xl font-semibold text-gray-600 hover:text-[#6A38C2]">Log in</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-xl px-5 shadow-lg shadow-purple-200 transition-all active:scale-95 font-semibold">
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className='flex items-center gap-2 cursor-pointer p-1 pl-3 bg-gray-50 border border-gray-200 rounded-full hover:shadow-md transition-shadow'>
                                        <span className='hidden lg:block text-sm font-medium text-gray-700 px-1'>{user?.fullname?.split(' ')[0]}</span>
                                        <Avatar className="h-8 w-8 border border-white shadow-sm">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                        </Avatar>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 mt-3 p-2 rounded-2xl shadow-2xl border-gray-100" align="end">
                                    <div className='p-3 flex flex-col gap-1'>
                                        <div className='px-2 py-2 mb-2'>
                                            <p className='font-bold text-gray-900'>{user?.fullname}</p>
                                            <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                                        </div>
                                        {user.role === 'student' && (
                                            <Link to="/profile" className='flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors'>
                                                <User2 size={18} />
                                                <span className='text-sm font-medium'>My Profile</span>
                                            </Link>
                                        )}
                                        <button onClick={logoutHandler} className='flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors w-full text-left'>
                                            <LogOut size={18} />
                                            <span className='text-sm font-medium'>Sign out</span>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>

                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t rounded-b-2xl ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className='p-6 space-y-6'>
                        <ul className='flex flex-col gap-4 list-none'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <MobileLink to="/admin/companies" label="Companies" onClick={() => setIsOpen(false)} />
                                    <MobileLink to="/admin/jobs" label="Jobs" onClick={() => setIsOpen(false)} />
                                </>
                            ) : (
                                <>
                                    <MobileLink to="/" label="Home" onClick={() => setIsOpen(false)} />
                                    <MobileLink to="/jobs" label="Jobs" onClick={() => setIsOpen(false)} />
                                    <MobileLink to="/browse" label="Browse" onClick={() => setIsOpen(false)} />
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;