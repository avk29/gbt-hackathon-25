
import React, { useState } from 'react';
import { Plane, Train, Building, Search, ArrowRight } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

const CreateJourneyCard = ({ searchParams, onCreateJourney }) => {
  const [travelTypes, setTravelTypes] = useState({
    flights: true,
    trains: false,
    hotels: false
  });
  const [fromDestination, setFromDestination] = useState('');
  const [toDestination, setToDestination] = useState('');

  const handleTravelTypeChange = (type, checked) => {
    setTravelTypes(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const handleSearch = () => {
    const selectedTypes = Object.keys(travelTypes).filter(type => travelTypes[type]);
    onCreateJourney({
      ...searchParams,
      travelTypes: selectedTypes,
      fromDestination,
      toDestination
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-tight font-avenir">Custom Destination</h3>
        <p className="text-gray-600 font-light font-avenir">Plan your journey to any destination</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-end">
        {/* Travel Types */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-3 font-avenir">Travel Type</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="create-flights"
                checked={travelTypes.flights}
                onCheckedChange={(checked) => handleTravelTypeChange('flights', checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div className="flex items-center space-x-1">
                <Plane className="w-4 h-4 text-blue-600" />
                <label htmlFor="create-flights" className="text-sm font-medium text-gray-700 cursor-pointer font-avenir">
                  Flights
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="create-trains"
                checked={travelTypes.trains}
                onCheckedChange={(checked) => handleTravelTypeChange('trains', checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div className="flex items-center space-x-1">
                <Train className="w-4 h-4 text-green-600" />
                <label htmlFor="create-trains" className="text-sm font-medium text-gray-700 cursor-pointer font-avenir">
                  Trains
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="create-hotels"
                checked={travelTypes.hotels}
                onCheckedChange={(checked) => handleTravelTypeChange('hotels', checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div className="flex items-center space-x-1">
                <Building className="w-4 h-4 text-purple-600" />
                <label htmlFor="create-hotels" className="text-sm font-medium text-gray-700 cursor-pointer font-avenir">
                  Hotels
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* From Destination */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-3 font-avenir">From</label>
          <input
            type="text"
            value={fromDestination}
            onChange={(e) => setFromDestination(e.target.value)}
            placeholder="Origin city"
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white backdrop-blur-sm transition-all duration-300 hover:bg-white font-avenir text-gray-800 shadow-sm"
          />
        </div>

        {/* To Destination */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-3 font-avenir">To</label>
          <input
            type="text"
            value={toDestination}
            onChange={(e) => setToDestination(e.target.value)}
            placeholder="Destination city"
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white backdrop-blur-sm transition-all duration-300 hover:bg-white font-avenir text-gray-800 shadow-sm"
          />
        </div>

        {/* Search Button */}
        <div className="md:col-span-2">
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white p-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 font-avenir"
          >
            <Search className="w-4 h-4 mr-2" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJourneyCard;
