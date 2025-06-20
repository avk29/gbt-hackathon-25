
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, User, Clock, Search, Plane } from 'lucide-react';
import Header from '../components/Header';

const DestinationSearchPage = ({ searchParams, teamName, onBack, onSearch }) => {
  const [travelType, setTravelType] = useState(searchParams?.travelType || 'flights');
  const [fromDestination, setFromDestination] = useState('');
  const [toDestination, setToDestination] = useState('');
  const [checkIn, setCheckIn] = useState(searchParams?.checkIn || '');
  const [checkOut, setCheckOut] = useState(searchParams?.checkOut || '');
  const [travelers, setTravelers] = useState(searchParams?.travelers || 1);
  const [time, setTime] = useState(searchParams?.time || 'morning');

  const handleSearch = () => {
    onSearch({
      travelType,
      fromDestination,
      toDestination,
      checkIn,
      checkOut,
      travelers,
      time
    });
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header teamName={teamName} />
      
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-8 animate-slide-in-left">
            <button
              onClick={handleBackClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="font-medium">Back to Trip Selection</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mb-6 shadow-lg">
              <Plane className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 tracking-tight">
              Where to next?
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Choose your destination and let us craft the perfect journey for you
            </p>
          </div>

          {/* Luxury Search Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-5xl mx-auto border border-gray-100 animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Travel Type */}
              <div className="lg:col-span-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">Travel Type</label>
                <div className="flex space-x-4">
                  {['flights', 'trains', 'hotels'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setTravelType(type)}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 font-medium capitalize ${
                        travelType === type
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* From Destination */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">From</label>
                <div className="relative">
                  <input
                    type="text"
                    value={fromDestination}
                    onChange={(e) => setFromDestination(e.target.value)}
                    placeholder="Enter departure city"
                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm font-medium"
                  />
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* To Destination */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">To</label>
                <div className="relative">
                  <input
                    type="text"
                    value={toDestination}
                    onChange={(e) => setToDestination(e.target.value)}
                    placeholder="Enter destination city"
                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm font-medium"
                  />
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Check-in Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">Check-in</label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm font-medium"
                  />
                  <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Check-out Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">Check-out</label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm font-medium"
                  />
                  <Calendar className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">Travelers</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm font-medium"
                  />
                  <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Time Option */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">Time</label>
                <div className="relative">
                  <select 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm font-medium appearance-none"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                  <Clock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="text-center">
              <button
                onClick={handleSearch}
                disabled={!fromDestination || !toDestination}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 button-elegant backdrop-blur-glass disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 mx-auto"
              >
                <Search className="w-6 h-6" />
                <span>Search Premium Options</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationSearchPage;
