import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter, XCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isMobileOpen, setIsMobileOpen] = useState(false); 
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const clearFilters = (e) => {
        e.stopPropagation(); 
        setSelectedValue('');
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>
            
            {/* --- 1. MOBILE VIEW: Clickable Patti --- */}
            <div 
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className='md:hidden flex items-center justify-between p-4 cursor-pointer bg-white'
            >
                <div className='flex items-center gap-3'>
                    <div className='bg-[#6A38C2] p-2 rounded-lg'>
                        <Filter className='w-4 h-4 text-white' />
                    </div>
                    <div>
                        <h1 className='font-bold text-sm text-gray-800'>Filter Jobs</h1>
                        {selectedValue && (
                            <p className='text-[10px] text-[#6A38C2] font-extrabold uppercase'>Selected: {selectedValue}</p>
                        )}
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    {selectedValue && (
                        <button onClick={clearFilters} className='text-[#F83002] text-xs font-bold'>Clear</button>
                    )}
                    {isMobileOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {/* --- 2. DESKTOP VIEW: Static Header (Always Visible) --- */}
            <div className='hidden md:flex items-center justify-between p-6 pb-2'>
                <h1 className='font-bold text-xl text-gray-800'>Filter Jobs</h1>
                {selectedValue && (
                    <button onClick={clearFilters} className='text-[#F83002] text-xs font-bold hover:underline'>Clear All</button>
                )}
            </div>

            {/* --- 3. CONTENT AREA --- */}
            {/* Mobile: Animated Toggle | Desktop: Always Block */}
            <div className={`${isMobileOpen ? 'block' : 'hidden'} md:block px-6 pb-6 pt-2 md:pt-4`}>
                <div className='h-[1px] w-full bg-gray-100 mb-6 hidden md:block' />
                
                <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
                    {fitlerData.map((data, index) => (
                        <div key={index} className='space-y-3'>
                            <h2 className='font-bold text-sm text-gray-400 uppercase tracking-widest'>
                                {data.fitlerType}
                            </h2>
                            <div className='grid gap-2'>
                                {data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    const isSelected = selectedValue === item;
                                    return (
                                        <div 
                                            key={itemId}
                                            className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all border ${isSelected ? 'bg-purple-50 border-purple-200' : 'border-transparent hover:bg-gray-50'}`}
                                            onClick={() => changeHandler(item)}
                                        >
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId} className={`text-sm cursor-pointer font-medium ${isSelected ? 'text-[#6A38C2]' : 'text-gray-600'}`}>
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}

export default FilterCard;