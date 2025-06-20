
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Wifi, Coffee, Car, Plane, Train, Building, Check } from 'lucide-react';
import Header from '../components/Header';

const SearchResultsPage = ({ searchParams, teamName, onBack, onSelect }) => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    // Mock results based on travel type
    const mockResults = generateMockResults(searchParams?.travelType);
    setResults(mockResults);
  }, [searchParams]);

  const generateMockResults = (travelType) => {
    const baseResults = {
      flights: [
        {
          id: 'f1',
          airline: 'Emirates',
          flightNumber: 'EK 205',
          departure: '14:30',
          arrival: '22:45',
          duration: '8h 15m',
          price: 85000,
          class: 'Business',
          stops: 'Non-stop',
          aircraft: 'Boeing 777-300ER',
          amenities: ['Lie-flat seats', 'Premium dining', 'Wi-Fi', 'Entertainment'],
          rating: 4.8,
          luggageAllowance: '2 x 32kg'
        },
        {
          id: 'f2',
          airline: 'Singapore Airlines',
          flightNumber: 'SQ 317',
          departure: '09:15',
          arrival: '17:30',
          duration: '8h 15m',
          price: 78000,
          class: 'Business',
          stops: 'Non-stop',
          aircraft: 'Airbus A350-900',
          amenities: ['Suite seats', 'Fine dining', 'Wi-Fi', 'Lounge access'],
          rating: 4.9,
          luggageAllowance: '2 x 32kg'
        },
        {
          id: 'f3',
          airline: 'Lufthansa',
          flightNumber: 'LH 756',
          departure: '23:50',
          arrival: '08:15+1',
          duration: '8h 25m',
          price: 72000,
          class: 'Business',
          stops: 'Non-stop',
          aircraft: 'Airbus A340-600',
          amenities: ['Flat beds', 'Gourmet meals', 'Wi-Fi', 'Priority boarding'],
          rating: 4.6,
          luggageAllowance: '2 x 32kg'
        }
      ],
      trains: [
        {
          id: 't1',
          service: 'Shatabdi Express',
          trainNumber: '12002',
          departure: '06:00',
          arrival: '14:30',
          duration: '8h 30m',
          price: 3500,
          class: 'Executive Chair Car',
          route: 'Direct',
          amenities: ['AC', 'Meals', 'Wi-Fi', 'Power outlets'],
          rating: 4.5,
          coach: 'E1',
          seatNumber: '15A'
        },
        {
          id: 't2',
          service: 'Rajdhani Express',
          trainNumber: '12951',
          departure: '16:35',
          arrival: '09:55+1',
          duration: '17h 20m',
          price: 4200,
          class: '1st AC',
          route: 'Direct',
          amenities: ['Sleeper berths', 'All meals', 'Bedding', 'Attendant service'],
          rating: 4.7,
          coach: 'H1',
          seatNumber: '12'
        },
        {
          id: 't3',
          service: 'Gatimaan Express',
          trainNumber: '12049',
          departure: '08:10',
          arrival: '12:25',
          duration: '4h 15m',
          price: 2800,
          class: 'Chair Car',
          route: 'Direct',
          amenities: ['AC', 'Snacks', 'Wi-Fi', 'Comfortable seating'],
          rating: 4.3,
          coach: 'C2',
          seatNumber: '8B'
        }
      ],
      hotels: [
        {
          id: 'h1',
          name: 'The Oberoi',
          category: '5-Star Luxury',
          checkIn: '15:00',
          checkOut: '12:00',
          roomType: 'Deluxe Suite',
          price: 25000,
          rating: 4.9,
          amenities: ['Spa', 'Fine dining', 'Pool', 'Concierge', 'Butler service'],
          location: 'City Center',
          roomNumber: '1205',
          view: 'City View'
        },
        {
          id: 'h2',
          name: 'Taj Palace',
          category: '5-Star',
          checkIn: '14:00',
          checkOut: '11:00',
          roomType: 'Executive Room',
          price: 18000,
          rating: 4.7,
          amenities: ['Multiple restaurants', 'Spa', 'Fitness center', 'Business center'],
          location: 'Business District',
          roomNumber: '806',
          view: 'Garden View'
        },
        {
          id: 'h3',
          name: 'ITC Grand Central',
          category: '5-Star',
          checkIn: '15:00',
          checkOut: '12:00',
          roomType: 'Premium Room',
          price: 15000,
          rating: 4.6,
          amenities: ['Restaurant', 'Bar', 'Gym', 'Wi-Fi', 'Room service'],
          location: 'Airport vicinity',
          roomNumber: '432',
          view: 'Airport View'
        }
      ]
    };

    return baseResults[travelType] || [];
  };

  const handleResultSelect = (result) => {
    setSelectedResult(result.id);
  };

  const handleBookNow = () => {
    if (selectedResult) {
      const result = results.find(r => r.id === selectedResult);
      onSelect(result, searchParams);
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  const getIcon = () => {
    switch (searchParams?.travelType) {
      case 'flights': return Plane;
      case 'trains': return Train;
      case 'hotels': return Building;
      default: return Plane;
    }
  };

  const IconComponent = getIcon();

  const renderResultCard = (result, index) => {
    const isSelected = selectedResult === result.id;
    
    return (
      <div
        key={result.id}
        onClick={() => handleResultSelect(result)}
        className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border-2 animate-scale-in ${
          isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-200'
        }`}
        style={{ 
          animationDelay: `${index * 0.1}s`, 
          animationFillMode: 'both' 
        }}
      >
        {isSelected && (
          <div className="absolute top-4 right-4 z-10 animate-scale-in">
            <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
              <Check className="w-5 h-5" />
            </div>
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                {result.airline || result.service || result.name}
              </h3>
              <p className="text-gray-600 font-light">
                {result.flightNumber || result.trainNumber || result.category}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-semibold text-gray-700">{result.rating}</span>
          </div>
        </div>

        {searchParams?.travelType !== 'hotels' && (
          <div className="flex justify-between items-center mb-4 bg-gray-50 rounded-xl p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 font-medium">Departure</p>
              <p className="text-lg font-bold text-gray-800">{result.departure}</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="flex items-center justify-center">
                <div className="w-full h-px bg-gray-300 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-1">{result.duration}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 font-medium">Arrival</p>
              <p className="text-lg font-bold text-gray-800">{result.arrival}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 font-medium">
              {searchParams?.travelType === 'hotels' ? 'Room Type' : 'Class'}
            </p>
            <p className="font-semibold text-gray-800">
              {result.class || result.roomType}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">
              {searchParams?.travelType === 'hotels' ? 'Location' : 
               searchParams?.travelType === 'trains' ? 'Coach' : 'Aircraft'}
            </p>
            <p className="font-semibold text-gray-800">
              {result.location || result.coach || result.aircraft}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 font-medium mb-2">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {result.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                {amenity}
              </span>
            ))}
            {result.amenities.length > 3 && (
              <span className="text-blue-600 text-xs font-medium">
                +{result.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-right">
            <p className="text-sm text-gray-500 font-light">
              ₹{result.price.toLocaleString()}/Person
            </p>
            <p className="text-2xl font-bold text-blue-600 tracking-tight">
              ₹{(result.price * (searchParams?.travelers || 1)).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 font-light">Total Price</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
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
              <span className="font-medium">Back to Search</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
              Premium {searchParams?.travelType} Options
            </h1>
            <p className="text-xl text-gray-600 font-light">
              {searchParams?.fromDestination} → {searchParams?.toDestination}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium border border-blue-200">
                {searchParams?.travelers} Traveler{searchParams?.travelers !== 1 ? 's' : ''} • {searchParams?.time}
              </span>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results.map((result, index) => renderResultCard(result, index))}
          </div>

          {/* Book Now Button */}
          {selectedResult && (
            <div className="fixed bottom-8 right-8 z-50 animate-scale-in">
              <button
                onClick={handleBookNow}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 button-elegant backdrop-blur-glass"
              >
                Book Selected Option
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
