
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { ChevronRight } from 'lucide-react'; // Ek icon extra premium touch ke liye

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Mobile Developer",
    "DevOps Engineer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='my-20 px-4'>
            {/* Header for Carousel (Optional but looks good) */}
            <div className='text-center mb-8'>
                <h2 className='text-xl md:text-2xl font-bold text-gray-800'>Browse by Category</h2>
                <div className='w-16 h-1 bg-[#6A38C2] mx-auto mt-2 rounded-full'></div>
            </div>

            <Carousel className="w-full max-w-2xl mx-auto relative group">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/3">
                                <div className='p-1'>
                                    <Button 
                                        onClick={() => searchJobHandler(cat)} 
                                        variant="outline" 
                                        className="w-full rounded-full border-gray-200 hover:border-[#6A38C2] hover:text-[#6A38C2] hover:bg-purple-50 transition-all duration-300 shadow-sm hover:shadow-md py-6 group/btn"
                                    >
                                        <span className='truncate text-sm md:text-base font-semibold'>{cat}</span>
                                        <ChevronRight className='w-4 h-4 ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity' />
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>

                {/* Arrows styling - hidden on mobile, visible on hover on desktop */}
                <CarouselPrevious className="hidden md:flex -left-12 border-none bg-gray-100 hover:bg-[#6A38C2] hover:text-white transition-colors" />
                <CarouselNext className="hidden md:flex -right-12 border-none bg-gray-100 hover:bg-[#6A38C2] hover:text-white transition-colors" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;