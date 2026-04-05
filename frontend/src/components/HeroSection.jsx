import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react"; // Sparkles icon for a premium feel
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    // Padding top (pt-32) add kiya hai taaki floating navbar ke niche content na chhup jaye
    <div className="text-center pt-32 pb-16 px-4">
      <div className="flex flex-col gap-6 my-10 max-w-4xl mx-auto">
        {/* Badge Style Label */}
        <div className="inline-flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-orange-50 border border-orange-100 shadow-sm transition-all hover:scale-105">
          <span className="text-[#F83002] font-semibold text-sm tracking-wide uppercase">
            No. 1 Job Hunt Platform
          </span>
        </div>

        {/* Main Heading with Gradient */}
        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight tracking-tight text-gray-900">
          Search, Apply & <br /> Get Your
          <span className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
            {" "}
            Dream Jobs
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover thousands of job opportunities from top companies. Your next
          big career move starts right here, right now.
        </p>

        {/* Search Bar - Redesigned for Responsiveness */}
        <div className="relative flex w-full md:w-[70%] lg:w-[60%] h-14 md:h-16 bg-white shadow-2xl shadow-purple-100 border border-gray-100 p-1.5 rounded-full items-center gap-2 mx-auto mt-6 transition-all focus-within:ring-2 focus-within:ring-[#6A38C2]/20">
          <div className="flex items-center justify-center pl-4">
            <Search className="text-gray-400 h-5 w-5 md:h-6 md:w-6" />
          </div>

          <input
            type="text"
            placeholder="Job title, keywords or company..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-gray-700 font-medium placeholder:text-gray-400 placeholder:font-normal bg-transparent"
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()} // Enter press par bhi search chale
          />

          <Button
            onClick={searchJobHandler}
            className="rounded-full h-full px-6 md:px-10 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-bold transition-all active:scale-95 shadow-md"
          >
            Search
          </Button>
        </div>

        {/* Quick Tags (Optional but looks professional) */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-4 opacity-70">
          <span className="text-xs font-semibold text-gray-400">Trending:</span>
          {["Frontend", "Backend", "Data Science", "Designer"].map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
