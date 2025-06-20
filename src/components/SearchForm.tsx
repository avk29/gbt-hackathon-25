
import React, { useState } from 'react';
import { Calendar, User, Clock, Search } from 'lucide-react';

const SearchForm = ({ onSearch }) => {
  const [travelType, setTravelType] = useState('flights');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [time, setTime] = useState('morning');

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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
        {/* Travel Type */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Travel Type</label>
          <select 
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="flights">Flights</option>
            <option value="trains">Trains</option>
            <option value="hotels">Hotels</option>
          </select>
        </div>

        {/* Check-in Date */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
          <div className="relative">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
          <div className="relative">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Travelers */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <User className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Time Option */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <div className="relative">
            <select 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
            <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1">
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
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
