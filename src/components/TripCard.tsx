
import React, { useState } from 'react';
import { Check, Edit3 } from 'lucide-react';

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
        className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      >
        {selected && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-green-500 text-white rounded-full p-2">
              <Check className="w-5 h-5" />
            </div>
          </div>
        )}
        
        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-6xl mb-4">✈️</div>
            <div className="text-xl font-bold">OTHER</div>
            <div className="text-sm">Custom Destination</div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Other Destinations</h3>
          <p className="text-gray-600 mb-4">Book travel to any destination of your choice</p>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-2xl font-bold text-blue-600">Custom Quote</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
    >
      {selected && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-green-500 text-white rounded-full p-2">
            <Check className="w-5 h-5" />
          </div>
        </div>
      )}
      
      <div className="relative h-48">
        <img 
          src={trip.image} 
          alt={trip.cityName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold">{trip.cityName}</h3>
          <p className="text-sm opacity-90">{trip.country}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {nights} Night{nights !== 1 ? 's' : ''} / {days} Day{days !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-gray-600">{trip.meals}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onModify(trip);
            }}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {details && (
            <>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Service:</span> {details.airline || details.service || details.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Class:</span> {details.class || details.roomType}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{searchParams?.travelType === 'hotels' ? 'Room' : 'Seat'}:</span> {details.roomNumber || details.seatNumber}
              </p>
            </>
          )}
          <p className="text-sm text-gray-600">
            <span className="font-medium">Transfer:</span> {trip.pickupDrop}
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">₹{trip.pricePerPerson.toLocaleString()}/Person</p>
            <p className="text-2xl font-bold text-blue-600">₹{totalPrice.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Total Price</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
