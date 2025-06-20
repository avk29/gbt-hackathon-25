
import React, { useState } from 'react';
import { Check, Edit3, Sparkles } from 'lucide-react';

const TripCard = ({ trip, searchParams, selected, onSelect, onModify }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const totalPrice = trip.pricePerPerson * (searchParams?.travelers || 1);
  const nights = trip.duration?.nights || 0;
  const days = trip.duration?.days || 0;

  const handleCardClick = () => {
    onSelect(trip.id);
  };

  const getTravelDetails = () => {
    if (!searchParams) return {};
    
    switch (searchParams.travelType) {
      case 'flights':
        return trip.flightDetails;
      case 'trains':
        return trip.trainDetails;
      case 'hotels':
        return trip.hotelDetails;
      default:
        return trip.flightDetails;
    }
  };

  const details = getTravelDetails();

  if (trip.id === 'other') {
    return (
      <div 
        onClick={handleCardClick}
        className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer card-hover border border-gray-100"
      >
        {selected && (
          <div className="absolute top-4 right-4 z-10 animate-scale-in">
            <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
              <Check className="w-5 h-5" />
            </div>
          </div>
        )}
        
        <div className="h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="text-white text-center relative z-10">
            <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <div className="text-xl font-bold tracking-wide">OTHER</div>
            <div className="text-sm font-light">Custom Destination</div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">Other Destinations</h3>
          <p className="text-gray-600 mb-4 font-light">Book travel to any destination of your choice</p>
          
          <div className="text-right">
            <p className="text-sm text-gray-500 font-light">Starting from</p>
            <p className="text-2xl font-bold text-blue-600">Custom Quote</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer card-hover border border-gray-100"
    >
      {selected && (
        <div className="absolute top-4 right-4 z-10 animate-scale-in">
          <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
            <Check className="w-5 h-5" />
          </div>
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.cityName}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold tracking-tight">{trip.cityName}</h3>
          <p className="text-sm opacity-90 font-light">{trip.country}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-lg font-semibold text-gray-800 tracking-tight">
              {nights} Night{nights !== 1 ? 's' : ''} / {days} Day{days !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-gray-600 font-light">{trip.meals}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onModify(trip);
            }}
            className="bg-gray-50 hover:bg-gray-100 p-3 rounded-xl transition-all duration-200 hover:scale-105 border border-gray-200"
          >
            <Edit3 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {details && (
            <>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Service:</span> <span className="font-light">{details.airline || details.service || details.name}</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">Class:</span> <span className="font-light">{details.class || details.roomType}</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">{searchParams?.travelType === 'hotels' ? 'Room' : 'Seat'}:</span> <span className="font-light">{details.roomNumber || details.seatNumber}</span>
              </p>
            </>
          )}
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Transfer:</span> <span className="font-light">{trip.pickupDrop}</span>
          </p>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="text-right">
            <p className="text-sm text-gray-500 font-light">₹{trip.pricePerPerson.toLocaleString()}/Person</p>
            <p className="text-2xl font-bold text-blue-600 tracking-tight">₹{totalPrice.toLocaleString()}</p>
            <p className="text-xs text-gray-400 font-light">Total Price</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
