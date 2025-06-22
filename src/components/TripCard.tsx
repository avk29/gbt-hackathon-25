
import React, { useState } from 'react';
import { Check, Edit3, Sparkles, Plane, Train, Building } from 'lucide-react';

const TripCard = ({ trip, searchParams, selected, onSelect, onModify }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const totalPrice = trip.pricePerPerson * (searchParams?.travelers || 1);
  const nights = trip.duration?.nights || 0;
  const days = trip.duration?.days || 0;

  const handleCardClick = () => {
    onSelect(trip.id);
  };

  const getSelectedTravelTypes = () => {
    if (!searchParams?.travelTypes) return ['flights'];
    return searchParams.travelTypes;
  };

  const selectedTypes = getSelectedTravelTypes();

  const handleEditService = (serviceType) => {
    onModify({ ...trip, editService: serviceType });
  };

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
          <h3 className="text-2xl font-bold tracking-tight font-avenir">{trip.cityName}</h3>
          <p className="text-sm opacity-90 font-light font-avenir">{trip.country}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800 tracking-tight font-avenir">
            {nights} Night{nights !== 1 ? 's' : ''} / {days} Day{days !== 1 ? 's' : ''}
          </p>
          <p className="text-sm text-gray-600 font-light font-avenir">{trip.meals}</p>
        </div>

        {/* Travel Services */}
        <div className="space-y-4 mb-4">
          {selectedTypes.includes('flights') && trip.flightDetails && (
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800 font-avenir">Flight</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditService('flights');
                  }}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
              <div className="text-xs text-blue-700 space-y-1 font-avenir">
                <p><span className="font-medium">Airline:</span> {trip.flightDetails.airline}</p>
                <p><span className="font-medium">Class:</span> {trip.flightDetails.class}</p>
                <p><span className="font-medium">Seat:</span> {trip.flightDetails.seatNumber}</p>
              </div>
            </div>
          )}

          {selectedTypes.includes('trains') && trip.trainDetails && (
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Train className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800 font-avenir">Train</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditService('trains');
                  }}
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
              <div className="text-xs text-green-700 space-y-1 font-avenir">
                <p><span className="font-medium">Service:</span> {trip.trainDetails.service}</p>
                <p><span className="font-medium">Class:</span> {trip.trainDetails.class}</p>
                <p><span className="font-medium">Seat:</span> {trip.trainDetails.seatNumber}</p>
              </div>
            </div>
          )}

          {selectedTypes.includes('hotels') && trip.hotelDetails && (
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800 font-avenir">Hotel</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditService('hotels');
                  }}
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
              <div className="text-xs text-purple-700 space-y-1 font-avenir">
                <p><span className="font-medium">Hotel:</span> {trip.hotelDetails.name}</p>
                <p><span className="font-medium">Room:</span> {trip.hotelDetails.roomType}</p>
                <p><span className="font-medium">Number:</span> {trip.hotelDetails.roomNumber}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600 font-avenir">
            <span className="font-medium text-gray-800">Transfer:</span> <span className="font-light">{trip.pickupDrop}</span>
          </p>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="text-right">
            <p className="text-sm text-gray-500 font-light font-avenir">₹{trip.pricePerPerson.toLocaleString()}/Person</p>
            <p className="text-2xl font-bold text-blue-600 tracking-tight font-avenir">₹{totalPrice.toLocaleString()}</p>
            <p className="text-xs text-gray-400 font-light font-avenir">Total Price</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
