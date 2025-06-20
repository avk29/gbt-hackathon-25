
import React, { useState } from 'react';
import { ChevronDown, User, LogOut } from 'lucide-react';

const Header = ({ teamName = "Team Amex", userName = "John Anderson" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="text-white font-bold text-xl">Amex GBT</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Bookings</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Support</a>
          </nav>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
          >
            <span>{teamName}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">Finance Department</p>
              </div>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4 mr-2" />
                Profile
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
