
import React, { useState } from 'react';
import { Calendar, User, Clock, Search } from 'lucide-react';

const SearchForm = ({ onSearch }) => {
  const [travelType, setTravelType] = useState('flights');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [time, setTime] = useState('09:00');

  const handleSearch = () => {
    onSearch({
      travelType,
      checkIn,
      checkOut,
      travelers,
      time
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-6xl mx-auto border border-white/20 font-avenir">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-end">
        {/* Travel Type */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-3 font-avenir">Travel Type</label>
          <select 
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white font-avenir text-gray-800 shadow-sm"
          >
            <option value="flights">Flights</option>
            <option value="trains">Trains</option>
            <option value="hotels">Hotels</option>
          </select>
        </div>

        {/* Check-in Date */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-3 font-avenir">Check-in</label>
          <div className="relative">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white font-avenir text-gray-800 shadow-sm"
            />
            <Calendar className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-3 font-avenir">Check-out</label>
          <div className="relative">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white font-avenir text-gray-800 shadow-sm"
            />
            <Calendar className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Travelers */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-3 font-avenir">Travelers</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white font-avenir text-gray-800 shadow-sm"
            />
            <User className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Time Selection */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-3 font-avenir">Time</label>
          <div className="relative">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white font-avenir text-gray-800 shadow-sm appearance-none"
            />
            <Clock className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1">
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-avenir"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
