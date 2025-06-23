import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Plane, Train, Building, Clock, MapPin, Star, Wifi, Coffee, Users, ChevronDown, CheckCircle, ChevronUp } from 'lucide-react';
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
  const [expandedFilters, setExpandedFilters] = useState({
    route: true,
    class: true,
    ticketType: true,
    carrier: true,
    exchangeability: true,
    refundability: true
  });

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
          rating: 4.2,
          exchangeable: true,
          refundable: false
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
          rating: 4.8,
          exchangeable: true,
          refundable: true
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
          departure: '07:24',
          arrival: '11:52',
          duration: '4h 28m',
          price: 2159,
          class: 'Second class',
          route: 'Stockholm Central → Malmö C',
          seatNumber: 'Direct',
          amenities: ['AC', 'Meals', 'Bedding'],
          rating: 4.5,
          exchangeable: false,
          refundable: false,
          carrier: 'SJ'
        },
        {
          id: 'train-2',
          type: 'train',
          service: 'Snälltåget',
          trainNumber: 'SN 334',
          departure: '09:10',
          arrival: '14:08',
          duration: '4h 58m',
          price: 2747,
          class: 'Second class',
          route: 'Stockholm Central → Malmö C',
          seatNumber: 'Direct',
          amenities: ['AC', 'Breakfast', 'Lunch'],
          rating: 4.3,
          exchangeable: false,
          refundable: true,
          carrier: 'Snälltåget'
        },
        {
          id: 'train-3',
          type: 'train',
          service: 'Express Train',
          trainNumber: 'SJ 442',
          departure: '09:21',
          arrival: '13:52',
          duration: '4h 31m',
          price: 2159,
          class: 'Second class',
          route: 'Stockholm Central → Malmö C',
          seatNumber: 'Direct',
          amenities: ['AC', 'WiFi'],
          rating: 4.4,
          exchangeable: false,
          refundable: false,
          carrier: 'SJ'
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

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const renderFilterSection = (title, filterKey, content) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleFilter(filterKey)}
        className="flex items-center justify-between w-full text-left text-gray-900 font-medium mb-3"
      >
        <span>{title}</span>
        {expandedFilters[filterKey] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedFilters[filterKey] && content}
    </div>
  );

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
    <div key={result.id} className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header with time and route info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Train className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">{result.carrier}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{result.departure}</div>
                <div className="text-sm text-gray-500">Stockholm Central</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{result.arrival}</div>
                <div className="text-sm text-gray-500">Malmö C</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">{result.duration}</div>
            <div className="text-sm text-gray-500">{result.seatNumber}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Starting at</div>
            <div className="text-xl font-bold text-gray-900">EUR{(result.price / 100).toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Fare options */}
      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">Fare</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Details</button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{result.class} / Non Flexible</div>
              <div className="text-xs text-gray-500 mt-1">
                <span className="inline-block mr-4">Not Exchangeable</span>
                <span className="inline-block">Non Refundable</span>
              </div>
            </div>
            <div className="text-center mr-4">
              <div className="text-lg font-bold text-gray-900">EUR{(result.price / 100 * 0.63).toFixed(2)}</div>
              <div className="text-xs text-gray-500">One-way</div>
            </div>
            <button
              onClick={() => handleSelectResult(result)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Select
            </button>
          </div>

          {result.refundable && (
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{result.class} / Refundable</div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="inline-block mr-4">Not Exchangeable</span>
                  <span className="inline-block">Refundable</span>
                </div>
              </div>
              <div className="text-center mr-4">
                <div className="text-lg font-bold text-gray-900">EUR{(result.price / 100).toFixed(2)}</div>
                <div className="text-xs text-gray-500">One-way</div>
              </div>
              <button
                onClick={() => handleSelectResult(result)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Select
              </button>
            </div>
          )}
        </div>
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
    <div className="min-h-screen bg-gray-50">
      <Header teamName={teamName} />
      
      <div className="pt-20">
        {/* Search header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Stockholm City Station to Malmö C</span>
            </div>
            <div className="text-sm opacity-90">20 Jun • 1 traveller</div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex">
          {/* Sidebar Filters */}
          <div className="w-80 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
            
            {renderFilterSection(
              "Route",
              "route",
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Direct</span>
                </label>
              </div>
            )}

            {renderFilterSection(
              "Class",
              "class",
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Second class</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">First class</span>
                </label>
              </div>
            )}

            {renderFilterSection(
              "Ticket type",
              "ticketType",
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Single ticket</span>
                </label>
              </div>
            )}

            {renderFilterSection(
              "Carrier",
              "carrier",
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">SJ</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Snälltåget</span>
                </label>
              </div>
            )}

            {renderFilterSection(
              "Exchangeability",
              "exchangeability",
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Not Exchangeable</span>
                </label>
              </div>
            )}

            {renderFilterSection(
              "Refundability",
              "refundability",
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Refundable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Non Refundable</span>
                </label>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Select your departure</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">Show earlier trains</button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-0">
                {searchResults.map((result) => {
                  if (result.type === 'train') return renderTrainCard(result);
                  if (result.type === 'flight') return renderFlightCard(result);
                  if (result.type === 'hotel') return renderHotelCard(result);
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
