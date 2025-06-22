
import React, { useState } from 'react';
import { Calendar, User, Search, Plane, Train, Building } from 'lucide-react';
import { Checkbox } from '../components/ui/checkbox';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { cn } from '../lib/utils';

const SearchForm = ({ onSearch }) => {
  const [travelTypes, setTravelTypes] = useState({
    flights: true,
    trains: false,
    hotels: false
  });
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [travelers, setTravelers] = useState(1);

  const handleTravelTypeChange = (type, checked) => {
    setTravelTypes(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const handleSearch = () => {
    const selectedTypes = Object.keys(travelTypes).filter(type => travelTypes[type]);
    onSearch({
      travelTypes: selectedTypes,
      fromDate,
      toDate,
      travelers
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-6xl mx-auto border border-white/20 font-avenir">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
        {/* Travel Types */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2 font-avenir">Travel Type</label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flights"
                checked={travelTypes.flights}
                onCheckedChange={(checked) => handleTravelTypeChange('flights', checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div className="flex items-center space-x-1">
                <Plane className="w-4 h-4 text-blue-600" />
                <label htmlFor="flights" className="text-sm font-medium text-gray-700 font-avenir cursor-pointer">
                  Flights
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trains"
                checked={travelTypes.trains}
                onCheckedChange={(checked) => handleTravelTypeChange('trains', checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div className="flex items-center space-x-1">
                <Train className="w-4 h-4 text-green-600" />
                <label htmlFor="trains" className="text-sm font-medium text-gray-700 font-avenir cursor-pointer">
                  Trains
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hotels"
                checked={travelTypes.hotels}
                onCheckedChange={(checked) => handleTravelTypeChange('hotels', checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <div className="flex items-center space-x-1">
                <Building className="w-4 h-4 text-purple-600" />
                <label htmlFor="hotels" className="text-sm font-medium text-gray-700 font-avenir cursor-pointer">
                  Hotels
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* From Date */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2 font-avenir">From</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal bg-white/80 backdrop-blur-sm hover:bg-white font-avenir border-gray-200 rounded-xl shadow-sm",
                  !fromDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "MMM dd, yyyy") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
                className="p-3"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Date */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2 font-avenir">To</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal bg-white/80 backdrop-blur-sm hover:bg-white font-avenir border-gray-200 rounded-xl shadow-sm",
                  !toDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "MMM dd, yyyy") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
                className="p-3"
                disabled={(date) => fromDate && date < fromDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Travelers */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2 font-avenir">Travelers</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              className="w-full h-12 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white font-avenir text-gray-800 shadow-sm pr-10"
            />
            <User className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-1">
          <button
            onClick={handleSearch}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-avenir mt-6 lg:mt-0"
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
