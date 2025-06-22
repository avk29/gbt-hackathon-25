import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Plane, Train, Building, Clock, MapPin, Star, Wifi, Coffee, Users, ChevronDown } from 'lucide-react';
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
        }
      );
    }

    return results;
  };

  const handleSelectResult = (result) => {
    onSelect(result, searchParams);
  };

  const renderFlightCard = (result) => (
    <div key={result.id} className="bg-white rounded-lg border border-gray-200 p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Plane className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 font-avenir">{result.airline}</h3>
            <p className="text-sm text-gray-500 font-avenir">{result.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600 font-avenir">₹{result.price.toLocaleString()}</div>
          <div className="text-sm text-gray-500 font-avenir">{result.class}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4 py-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 font-avenir">{result.departure}</div>
          <div className="text-sm text-gray-500 font-avenir">DEL</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 font-avenir">{result.duration}</div>
          <div className="flex items-center justify-center my-1">
            <div className="h-px bg-orange-300 flex-1"></div>
            <div className="mx-2 w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="h-px bg-orange-300 flex-1"></div>
          </div>
          <div className="text-sm text-gray-500 font-avenir">{result.stops}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 font-avenir">{result.arrival}</div>
          <div className="text-sm text-gray-500 font-avenir">BOM</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-avenir">Baggage: {result.luggageAllowance}</span>
          <div className="flex items-center space-x-1">
            {result.amenities.map((amenity, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs font-avenir">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleSelectResult(result)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors font-avenir"
        >
          Select Flight
        </button>
      </div>
    </div>
  );

  const renderTrainCard = (result) => (
    <div key={result.id} className="bg-white rounded-lg border border-gray-200 p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Train className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 font-avenir">{result.service}</h3>
            <p className="text-sm text-gray-500 font-avenir">{result.trainNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600 font-avenir">₹{result.price.toLocaleString()}</div>
          <div className="text-sm text-gray-500 font-avenir">{result.class}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4 py-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 font-avenir">{result.departure}</div>
          <div className="text-sm text-gray-500 font-avenir">NDLS</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 font-avenir">{result.duration}</div>
          <div className="flex items-center justify-center my-1">
            <div className="h-px bg-green-300 flex-1"></div>
            <div className="mx-2 w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="h-px bg-green-300 flex-1"></div>
          </div>
          <div className="text-sm text-gray-500 font-avenir">Direct</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 font-avenir">{result.arrival}</div>
          <div className="text-sm text-gray-500 font-avenir">CSMT</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-avenir">Seat: {result.seatNumber}</span>
          <div className="flex items-center space-x-1">
            {result.amenities.map((amenity, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs font-avenir">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleSelectResult(result)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors font-avenir"
        >
          Select Train
        </button>
      </div>
    </div>
  );

  const renderHotelCard = (result) => (
    <div key={result.id} className="bg-white rounded-lg border border-gray-200 p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Building className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 font-avenir">{result.name}</h3>
            <div className="flex items-center space-x-1">
              {[...Array(result.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600 font-avenir">₹{result.price.toLocaleString()}</div>
          <div className="text-sm text-gray-500 font-avenir">per night</div>
        </div>
      </div>
      
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 font-avenir">{result.location}</span>
        </div>
        <div className="text-sm font-medium text-gray-700 font-avenir">{result.roomType}</div>
        <div className="text-xs text-gray-500 font-avenir">Check-in: {result.checkIn} • Check-out: {result.checkOut}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {result.amenities.slice(0, 4).map((amenity, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600 font-avenir">
              {amenity}
            </span>
          ))}
        </div>
        <button
          onClick={() => handleSelectResult(result)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors font-avenir"
        >
          Select Hotel
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-avenir">
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
              <h1 className="text-2xl font-bold text-gray-900 font-avenir">Search Results</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="font-medium font-avenir text-gray-700">Filters</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
              <select className="bg-white border border-gray-200 px-3 py-2 rounded-lg font-avenir text-gray-700">
                <option>Sort by Price</option>
                <option>Sort by Duration</option>
                <option>Sort by Rating</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-orange-800 font-avenir">
              <span className="font-semibold">{searchResults.length} results found</span> for your search
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
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
