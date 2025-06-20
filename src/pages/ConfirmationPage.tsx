
import React, { useState } from 'react';
import Header from '../components/Header';
import { Calendar, Clock, User, MapPin, CreditCard, Edit3, X, Check } from 'lucide-react';

const ConfirmationPage = ({ selectedTrip, searchParams, teamName }) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header teamName={teamName} />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Status Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
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
                  <h1 className="text-3xl font-bold text-gray-800">
                    Booking {bookingStatus === 'confirmed' ? 'Confirmed' : 
                           bookingStatus === 'pending' ? 'Pending' : 'Cancelled'}
                  </h1>
                  <p className="text-gray-600">Reference: {bookingReference}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">₹{totalPrice.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total Amount</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">{selectedTrip.cityName}</p>
                  <p className="text-sm text-gray-600">{selectedTrip.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">{selectedTrip.duration.nights} Nights</p>
                  <p className="text-sm text-gray-600">{selectedTrip.duration.days} Days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">{searchParams?.travelers || 1} Traveler{(searchParams?.travelers || 1) !== 1 ? 's' : ''}</p>
                  <p className="text-sm text-gray-600">Business Class</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Travel Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Travel Details</h2>
              
              {details && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold">{details.airline || details.service || details.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-semibold">{details.flightNumber || details.trainNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-semibold">{details.class || details.roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{searchParams?.travelType === 'hotels' ? 'Room' : 'Seat'}:</span>
                    <span className="font-semibold">{details.roomNumber || details.seatNumber}</span>
                  </div>
                  {details.departure && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure:</span>
                      <span className="font-semibold">{details.departure}</span>
                    </div>
                  )}
                  {details.arrival && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival:</span>
                      <span className="font-semibold">{details.arrival}</span>
                    </div>
                  )}
                  {details.luggageAllowance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Luggage:</span>
                      <span className="font-semibold">{details.luggageAllowance}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Meals:</span>
                  <span className="font-semibold">{selectedTrip.meals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transfer:</span>
                  <span className="font-semibold">{selectedTrip.pickupDrop}</span>
                </div>
              </div>
            </div>

            {/* Booking Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Booking Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Sync to Calendar
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Edit3 className="w-4 h-4" />
                  <span>Change Trip</span>
                </button>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-3 px-4 rounded-lg font-medium transition-colors">
                  Split Trip
                </button>
                <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 py-3 px-4 rounded-lg font-medium transition-colors">
                  Merge with Another Trip
                </button>
                <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-3 px-4 rounded-lg font-medium transition-colors">
                  Apply Fee
                </button>
                <button className="w-full bg-red-100 hover:bg-red-200 text-red-800 py-3 px-4 rounded-lg font-medium transition-colors">
                  Cancel Trip
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button 
                  onClick={() => setShowAmenities(!showAmenities)}
                  className="w-full text-left text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showAmenities ? 'Hide' : 'Show'} Amenities & Facilities
                </button>
                
                {showAmenities && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Manager Approval */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Approval Status</h2>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Manager approval: <span className="font-semibold text-green-600">Approved</span></span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Approved by Finance Manager on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
