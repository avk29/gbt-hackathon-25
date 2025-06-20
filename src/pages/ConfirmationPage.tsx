
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import { Calendar, Clock, User, MapPin, CreditCard, Edit3, X, Check } from 'lucide-react';

const ConfirmationPage = ({ selectedTrip, searchParams, teamName, onBack }) => {
  const [bookingStatus] = useState('confirmed'); // confirmed, pending, cancelled
  const [showAmenities, setShowAmenities] = useState(false);

  if (!selectedTrip) {
    return <div>No trip selected</div>;
  }

  const totalPrice = selectedTrip.pricePerPerson * (searchParams?.travelers || 1);
  const bookingReference = 'AMX' + Math.random().toString(36).substr(2, 9).toUpperCase();

  const getTravelDetails = () => {
    switch (searchParams?.travelType) {
      case 'flights':
        return selectedTrip.flightDetails;
      case 'trains':
        return selectedTrip.trainDetails;
      case 'hotels':
        return selectedTrip.hotelDetails;
      default:
        return selectedTrip.flightDetails;
    }
  };

  const details = getTravelDetails();

  const amenities = [
    'Free WiFi', 'Power Sockets', 'Air Conditioning', 'Wheelchair Accessible',
    'Bar Car', 'Restaurant', 'Business Lounge Access', 'Priority Boarding'
  ];

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header teamName={teamName} />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8 animate-slide-in-left">
            <button
              onClick={handleBackClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="font-medium">Back to Trip Selection</span>
            </button>
          </div>

          {/* Status Header */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 animate-fade-in-up border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  bookingStatus === 'confirmed' ? 'bg-green-100 text-green-600' :
                  bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {bookingStatus === 'confirmed' ? <Check className="w-6 h-6" /> :
                   bookingStatus === 'pending' ? <Clock className="w-6 h-6" /> :
                   <X className="w-6 h-6" />}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Booking {bookingStatus === 'confirmed' ? 'Confirmed' : 
                           bookingStatus === 'pending' ? 'Pending' : 'Cancelled'}
                  </h1>
                  <p className="text-gray-600 font-light">Reference: {bookingReference}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600 tracking-tight">₹{totalPrice.toLocaleString()}</p>
                <p className="text-sm text-gray-500 font-light">Total Amount</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">{selectedTrip.cityName}</p>
                  <p className="text-sm text-gray-600 font-light">{selectedTrip.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">{selectedTrip.duration.nights} Nights</p>
                  <p className="text-sm text-gray-600 font-light">{selectedTrip.duration.days} Days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">{searchParams?.travelers || 1} Traveler{(searchParams?.travelers || 1) !== 1 ? 's' : ''}</p>
                  <p className="text-sm text-gray-600 font-light">Business Class</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Travel Details */}
            <div className="bg-white rounded-3xl shadow-lg p-6 animate-scale-in border border-gray-100" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-6 tracking-tight">Travel Details</h2>
              
              {details && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-light">Service:</span>
                    <span className="font-semibold">{details.airline || details.service || details.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-light">Reference:</span>
                    <span className="font-semibold">{details.flightNumber || details.trainNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-light">Class:</span>
                    <span className="font-semibold">{details.class || details.roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-light">{searchParams?.travelType === 'hotels' ? 'Room' : 'Seat'}:</span>
                    <span className="font-semibold">{details.roomNumber || details.seatNumber}</span>
                  </div>
                  {details.departure && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-light">Departure:</span>
                      <span className="font-semibold">{details.departure}</span>
                    </div>
                  )}
                  {details.arrival && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-light">Arrival:</span>
                      <span className="font-semibold">{details.arrival}</span>
                    </div>
                  )}
                  {details.luggageAllowance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-light">Luggage:</span>
                      <span className="font-semibold">{details.luggageAllowance}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 font-light">Meals:</span>
                  <span className="font-semibold">{selectedTrip.meals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-light">Transfer:</span>
                  <span className="font-semibold">{selectedTrip.pickupDrop}</span>
                </div>
              </div>
            </div>

            {/* Booking Actions */}
            <div className="bg-white rounded-3xl shadow-lg p-6 animate-scale-in border border-gray-100" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-6 tracking-tight">Booking Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 button-elegant">
                  Sync to Calendar
                </button>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 border border-gray-200">
                  <Edit3 className="w-4 h-4" />
                  <span>Change Trip</span>
                </button>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-800 py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 border border-green-200">
                  Split Trip
                </button>
                <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-800 py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 border border-purple-200">
                  Merge with Another Trip
                </button>
                <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-800 py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 border border-yellow-200">
                  Apply Fee
                </button>
                <button className="w-full bg-red-50 hover:bg-red-100 text-red-800 py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 border border-red-200">
                  Cancel Trip
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => setShowAmenities(!showAmenities)}
                  className="w-full text-left text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  {showAmenities ? 'Hide' : 'Show'} Amenities & Facilities
                </button>
                
                {showAmenities && (
                  <div className="mt-4 grid grid-cols-2 gap-2 animate-fade-in-up">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="font-light">{amenity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Manager Approval */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mt-8 animate-fade-in-up border border-gray-100" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">Approval Status</h2>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 font-light">Manager approval: <span className="font-semibold text-green-600">Approved</span></span>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-light">Approved by Finance Manager on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
