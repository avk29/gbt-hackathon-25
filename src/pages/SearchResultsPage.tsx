
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Plane, Train, Building, Clock, MapPin, Star, Wifi, Coffee, Users } from 'lucide-react';
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

  useEffect(() => {
    // Simulate loading and generate mock results
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

    if (selectedTypes.includes('flights')) {
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
          amenities: ['WiFi', 'Meals']
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
          amenities: ['WiFi', 'Premium Meals', 'Lounge Access']
        }
      );
    }

    if (selectedTypes.includes('trains')) {
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
          amenities: ['AC', 'Meals', 'Bedding']
        }
      );
    }

    if (selectedTypes.includes('hotels')) {
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
          name: 'The Oberoi Mumbai',
          rating: 5,
          price: 22000,
          location: 'Nariman Point, Mumbai',
          roomType: 'Premier Room',
          checkIn: '14:00',
          checkOut: '12:00',
          amenities: ['WiFi', 'Spa', 'Pool', 'Business Center']
        }
      );
    }

    return results;
  };

  const handleSelectResult = (result) => {
    onSelect(result, searchParams);
  };

  const renderFlightCard = (result) => (
    <div key={result.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Plane className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 font-avenir">{result.airline}</h3>
            <p className="text-sm text-gray-500 font-avenir">{result.flightNumber} • {result.aircraft}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 font-avenir">₹{result.price.toLocaleString()}</p>
          <p className="text-sm text-gray-500 font-avenir">{result.class}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 font-avenir">{result.departure}</p>
          <p className="text-sm text-gray-500 font-avenir">Departure</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 font-avenir">{result.duration}</p>
          <div className="flex items-center justify-center my-1">
            <div className="h-px bg-gray-300 flex-1"></div>
            <div className="mx-2 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>
          <p className="text-sm text-gray-500 font-avenir">{result.stops}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 font-avenir">{result.arrival}</p>
          <p className="text-sm text-gray-500 font-avenir">Arrival</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 font-avenir">Route: {result.route}</span>
          <span className="text-sm text-gray-600 font-avenir">Baggage: {result.luggageAllowance}</span>
        </div>
        <button
          onClick={() => handleSelectResult(result)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors font-avenir"
        >
          Select
        </button>
      </div>
    </div>
  );

  const renderTrainCard = (result) => (
    <div key={result.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Train className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 font-avenir">{result.service}</h3>
            <p className="text-sm text-gray-500 font-avenir">{result.trainNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 font-avenir">₹{result.price.toLocaleString()}</p>
          <p className="text-sm text-gray-500 font-avenir">{result.class}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 font-avenir">{result.departure}</p>
          <p className="text-sm text-gray-500 font-avenir">Departure</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 font-avenir">{result.duration}</p>
          <div className="flex items-center justify-center my-1">
            <div className="h-px bg-gray-300 flex-1"></div>
            <div className="mx-2 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>
          <p className="text-sm text-gray-500 font-avenir">Route: {result.route}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 font-avenir">{result.arrival}</p>
          <p className="text-sm text-gray-500 font-avenir">Arrival</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 font-avenir">Seat: {result.seatNumber}</span>
          <div className="flex items-center space-x-2">
            {result.amenities.map((amenity, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 font-avenir">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleSelectResult(result)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-colors font-avenir"
        >
          Select
        </button>
      </div>
    </div>
  );

  const renderHotelCard = (result) => (
    <div key={result.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Building className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 font-avenir">{result.name}</h3>
            <div className="flex items-center space-x-1">
              {[...Array(result.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 font-avenir">₹{result.price.toLocaleString()}</p>
          <p className="text-sm text-gray-500 font-avenir">per night</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 font-avenir mb-2">
          <MapPin className="w-4 h-4 inline mr-1" />
          {result.location}
        </p>
        <p className="text-sm font-medium text-gray-700 font-avenir">{result.roomType}</p>
        <p className="text-xs text-gray-500 font-avenir">Check-in: {result.checkIn} • Check-out: {result.checkOut}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {result.amenities.slice(0, 4).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 font-avenir">
              {amenity}
            </span>
          ))}
          {result.amenities.length > 4 && (
            <span className="text-xs text-gray-500 font-avenir">+{result.amenities.length - 4} more</span>
          )}
        </div>
        <button
          onClick={() => handleSelectResult(result)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-colors font-avenir"
        >
          Select
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header teamName={teamName} />
      
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
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
              <h1 className="text-2xl font-bold text-gray-900 font-avenir">Search Results</h1>
            </div>
            
            <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="font-medium font-avenir">Filters</span>
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
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
