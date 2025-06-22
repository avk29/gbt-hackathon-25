
import React from 'react';
import { ArrowLeft, Check, Plane, Train, Building, Calendar, Users, MapPin, Clock } from 'lucide-react';
import Header from '../components/Header';

const ConfirmationPage = ({ selectedTrip, searchParams, teamName, onBack }) => {
  if (!selectedTrip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600 font-avenir">No trip selected</p>
      </div>
    );
  }

  const totalPrice = selectedTrip.pricePerPerson * (searchParams?.travelers || 1);
  const selectedTypes = searchParams?.travelTypes || ['flights'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header teamName={teamName} />
      
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="font-medium font-avenir">Back</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900 font-avenir">Booking Confirmation</h1>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-800 font-avenir">Booking Confirmed!</h2>
                <p className="text-green-700 font-avenir">Your trip to {selectedTrip.cityName} has been successfully booked.</p>
              </div>
            </div>
          </div>

          {/* Trip Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-avenir">Trip Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <img 
                  src={selectedTrip.image} 
                  alt={selectedTrip.cityName}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 font-avenir">{selectedTrip.cityName}</h4>
                  <p className="text-gray-600 font-avenir">{selectedTrip.country}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-avenir">{selectedTrip.duration?.nights} Nights / {selectedTrip.duration?.days} Days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="font-avenir">{searchParams?.travelers || 1} Traveler{(searchParams?.travelers || 1) !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-lg font-bold text-blue-900 font-avenir">Total: ₹{totalPrice.toLocaleString()}</p>
                  <p className="text-sm text-blue-700 font-avenir">₹{selectedTrip.pricePerPerson.toLocaleString()} per person</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            {selectedTypes.includes('flights') && selectedTrip.flightDetails && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Plane className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 font-avenir">Flight Details</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Airline:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.airline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Flight Number:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.flightNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Class:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.class}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Departure:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.departure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Arrival:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.arrival}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Seat:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.seatNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTypes.includes('trains') && selectedTrip.trainDetails && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Train className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 font-avenir">Train Details</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Service:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Train Number:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.trainNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Class:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.class}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Departure:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.departure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Arrival:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.arrival}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Seat:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.seatNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTypes.includes('hotels') && selectedTrip.hotelDetails && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Building className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 font-avenir">Hotel Details</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Hotel:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.hotelDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Room Type:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.hotelDetails.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Room Number:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.hotelDetails.roomNumber}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Check-in:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.hotelDetails.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-avenir">Check-out:</span>
                      <span className="font-medium text-gray-900 font-avenir">{selectedTrip.hotelDetails.checkOut}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-medium transition-colors font-avenir">
              Download PDF
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors font-avenir">
              Send Confirmation Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
