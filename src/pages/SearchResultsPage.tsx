import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Plane, Train, Building, Clock, MapPin, Star, Wifi, Coffee, Users, ChevronDown, CheckCircle } from 'lucide-react';
import Header from '../components/Header';

const SearchResultsPage = ({ searchParams, teamName, onBack, onSelect }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 5000],
    airlines: [],
    departure: 'any',
    class: 'any'
  });
  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if we're editing a specific service
  const editingService = searchParams?.editTrip?.editService;

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockResults = generateMockResults();
      setSearchResults(mockResults);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const generateMockResults = () => {
    const results = [];
    const selectedTypes = searchParams?.travelTypes || ['flights'];

    // If editing a specific service, only show that type
    const typesToShow = editingService ? [editingService] : selectedTypes;

    if (typesToShow.includes('flights')) {
      results.push(
        {
          id: 'flight-1',
          type: 'flight',
          airline: 'IndiGo',
          flightNumber: '6E 2134',
          departure: '06:30',
          arrival: '08:45',
          duration: '2h 15m',
          price: 8500,
          class: 'Economy',
          route: 'DEL → BOM',
          stops: 'Non-stop',
          aircraft: 'A320',
          luggageAllowance: '15kg',
          amenities: ['WiFi', 'Meals'],
          rating: 4.2
        },
        {
          id: 'flight-2',
          type: 'flight',
          airline: 'Air India',
          flightNumber: 'AI 131',
          departure: '14:20',
          arrival: '16:50',
          duration: '2h 30m',
          price: 12500,
          class: 'Business',
          route: 'DEL → BOM',
          stops: 'Non-stop',
          aircraft: 'B787',
          luggageAllowance: '30kg',
          amenities: ['WiFi', 'Premium Meals', 'Lounge Access'],
          rating: 4.8
        }
      );
    }

    if (typesToShow.includes('trains')) {
      results.push(
        {
          id: 'train-1',
          type: 'train',
          service: 'Rajdhani Express',
          trainNumber: '12951',
          departure: '16:55',
          arrival: '08:35',
          duration: '15h 40m',
          price: 3500,
          class: '3A',
          route: 'NDLS → CSMT',
          seatNumber: 'B1-23',
          amenities: ['AC', 'Meals', 'Bedding'],
          rating: 4.5
        },
        {
          id: 'train-2',
          type: 'train',
          service: 'Shatabdi Express',
          trainNumber: '12001',
          departure: '06:00',
          arrival: '14:25',
          duration: '8h 25m',
          price: 2200,
          class: 'CC',
          route: 'NDLS → CSMT',
          seatNumber: 'C2-15',
          amenities: ['AC', 'Breakfast', 'Lunch'],
          rating: 4.3
        }
      );
    }

    if (typesToShow.includes('hotels')) {
      results.push(
        {
          id: 'hotel-1',
          type: 'hotel',
          name: 'The Taj Mahal Palace',
          rating: 5,
          price: 25000,
          location: 'Colaba, Mumbai',
          roomType: 'Deluxe Room',
          checkIn: '15:00',
          checkOut: '11:00',
          amenities: ['WiFi', 'Spa', 'Pool', 'Gym', 'Restaurant']
        },
        {
          id: 'hotel-2',
          type: 'hotel',
          name: 'ITC Grand Central',
          rating: 5,
          price: 18000,
          location: 'Parel, Mumbai',
          roomType: 'Executive Suite',
          checkIn: '14:00',
          checkOut: '12:00',
          amenities: ['WiFi', 'Business Center', 'Pool', 'Spa']
        }
      );
    }

    return results;
  };

  const handleSelectResult = (result) => {
    onSelect(result, searchParams);
  };

  const renderFlightCard = (result) => (
    <div key={result.id} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-avenir">{result.airline}</h3>
            <p className="text-gray-500 font-avenir">{result.flightNumber}</p>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(Math.floor(result.rating))].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-500 ml-1">{result.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600 font-avenir">₹{result.price.toLocaleString()}</div>
          <div className="text-gray-500 font-avenir">{result.class}</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 font-avenir">{result.departure}</div>
            <div className="text-gray-500 font-avenir">DEL</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 font-avenir">{result.duration}</div>
            <div className="flex items-center justify-center my-2">
              <div className="h-0.5 bg-blue-300 flex-1"></div>
              <div className="mx-3 w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="h-0.5 bg-blue-300 flex-1"></div>
            </div>
            <div className="text-gray-500 font-avenir">{result.stops}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 font-avenir">{result.arrival}</div>
            <div className="text-gray-500 font-avenir">BOM</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span className="font-avenir">Baggage: {result.luggageAllowance}</span>
          <div className="flex items-center space-x-2">
            {result.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-avenir">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleSelectResult(result)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 font-avenir flex items-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Select Flight</span>
        </button>
      </div>
    </div>
  );

  const renderTrainCard = (result) => (
    <div key={result.id} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Train className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-avenir">{result.service}</h3>
            <p className="text-gray-500 font-avenir">{result.trainNumber}</p>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(Math.floor(result.rating))].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-500 ml-1">{result.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600 font-avenir">₹{result.price.toLocaleString()}</div>
          <div className="text-gray-500 font-avenir">{result.class}</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 font-avenir">{result.departure}</div>
            <div className="text-gray-500 font-avenir">NDLS</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 font-avenir">{result.duration}</div>
            <div className="flex items-center justify-center my-2">
              <div className="h-0.5 bg-green-300 flex-1"></div>
              <div className="mx-3 w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="h-0.5 bg-green-300 flex-1"></div>
            </div>
            <div className="text-gray-500 font-avenir">Direct</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 font-avenir">{result.arrival}</div>
            <div className="text-gray-500 font-avenir">CSMT</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span className="font-avenir">Seat: {result.seatNumber}</span>
          <div className="flex items-center space-x-2">
            {result.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-avenir">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleSelectResult(result)}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 font-avenir flex items-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Select Train</span>
        </button>
      </div>
    </div>
  );

  const renderHotelCard = (result) => (
    <div key={result.id} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Building className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-avenir">{result.name}</h3>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(result.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500 font-avenir">{result.location}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-600 font-avenir">₹{result.price.toLocaleString()}</div>
          <div className="text-gray-500 font-avenir">per night</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
        <div className="text-lg font-semibold text-gray-800 font-avenir mb-2">{result.roomType}</div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="font-avenir">Check-in: {result.checkIn}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="font-avenir">Check-out: {result.checkOut}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {result.amenities.slice(0, 4).map((amenity, index) => (
            <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-avenir">
              {amenity}
            </span>
          ))}
        </div>
        <button
          onClick={() => handleSelectResult(result)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 font-avenir flex items-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Select Hotel</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header teamName={teamName} />
      
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span className="font-medium font-avenir">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-3xl font-bold text-gray-900 font-avenir">
                {editingService ? `Edit ${editingService.charAt(0).toUpperCase() + editingService.slice(1)}` : 'Search Results'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="font-medium font-avenir text-gray-700">Filters</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              <select className="bg-white border border-gray-200 px-3 py-2 rounded-xl font-avenir text-gray-700 shadow-sm">
                <option>Sort by Price</option>
                <option>Sort by Duration</option>
                <option>Sort by Rating</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <p className="text-blue-800 font-avenir text-lg">
              <span className="font-semibold">{searchResults.length} results found</span> 
              {editingService && <span> for {editingService}</span>}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-0">
              {searchResults.map((result) => {
                if (result.type === 'flight') return renderFlightCard(result);
                if (result.type === 'train') return renderTrainCard(result);
                if (result.type === 'hotel') return renderHotelCard(result);
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
