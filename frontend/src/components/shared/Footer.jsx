import React from 'react';
import { Facebook, Twitter, Linkedin, Github, Mail, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Background color changed to your brand blue/purple (#6A38C2)
    <footer className="bg-[#6A38C2] text-white pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start col-span-1">
            <div className='flex items-center gap-2 mb-4'>
                {/* Icon box now white with purple icon */}
                <div className='bg-white p-1.5 rounded-lg'>
                    <Briefcase className='text-[#6A38C2] w-5 h-5' />
                </div>
                <h1 className='text-2xl font-bold tracking-tight text-white'>
                    JobHub
                </h1>
            </div>
            <p className="text-purple-100 text-sm leading-relaxed mb-6 max-w-xs opacity-80">
              Connecting talented professionals with world-class companies. Your next career move starts here.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
              <SocialIcon icon={<Github size={18} />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className="font-bold text-white mb-6 text-lg">For Candidates</h3>
            <ul className="space-y-3 text-sm list-none p-0">
              <li><FooterLink to="/jobs">Browse Jobs</FooterLink></li>
              <li><FooterLink to="/browse">Categories</FooterLink></li>
              <li><FooterLink to="/profile">Candidate Dashboard</FooterLink></li>
              <li><FooterLink to="/jobs">Job Alerts</FooterLink></li>
            </ul>
          </div>

          {/* For Employers */}
          <div className='space-y-4'>
            <h3 className="font-bold text-white mb-6 text-lg">For Employers</h3>
            <ul className="space-y-3 text-sm list-none p-0">
              <li><FooterLink to="/admin/jobs">Post a Job</FooterLink></li>
              <li><FooterLink to="/admin/companies">Companies</FooterLink></li>
              <li><FooterLink to="/admin/jobs">Recruiter Dashboard</FooterLink></li>
              <li><FooterLink to="#">Hiring Advice</FooterLink></li>
            </ul>
          </div>

          {/* Support */}
          <div className='space-y-4'>
            <h3 className="font-bold text-white mb-6 text-lg">Support</h3>
            <div className="space-y-3 text-sm">
              <div className='flex items-center justify-center md:justify-start gap-2 text-purple-100 hover:text-white cursor-pointer transition-colors'>
                <Mail size={16} /> <span>support@jobhub.com</span>
              </div>
              <div className='flex flex-col gap-3'>
                <FooterLink to="#">Privacy Policy</FooterLink>
                <FooterLink to="#">Terms of Service</FooterLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-400/30 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <p className="text-purple-200 text-xs font-medium opacity-70">
            © {new Date().getFullYear()} JobHub. Made with ❤️ by Ankit.
          </p>
          <div className='flex gap-8 text-xs text-purple-200 font-medium opacity-70'>
             <span className='hover:text-white cursor-pointer transition-colors'>English (US)</span>
             <span className='hover:text-white cursor-pointer transition-colors'>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components Adjusted for Dark Background
const FooterLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-purple-100 hover:text-white md:hover:translate-x-1 transition-all duration-300 inline-block opacity-80 hover:opacity-100"
  >
    {children}
  </Link>
)

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#6A38C2] transition-all duration-300 border border-white/20 shadow-md"
  >
    {icon}
  </a>
)

export default Footer;