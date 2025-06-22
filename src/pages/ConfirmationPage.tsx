
import React from 'react';
import { ArrowLeft, Check, Plane, Train, Building, Calendar, Users, MapPin, Clock, Download, Mail } from 'lucide-react';
import Header from '../components/Header';

const ConfirmationPage = ({ selectedTrip, searchParams, teamName, onBack }) => {
  if (!selectedTrip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-avenir">
        <p className="text-xl text-gray-600">No trip selected</p>
      </div>
    );
  }

  const totalPrice = selectedTrip.pricePerPerson * (searchParams?.travelers || 1);
  const selectedTypes = searchParams?.travelTypes || ['flights'];

  return (
    <div className="min-h-screen bg-gray-50 font-avenir">
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
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-800 font-avenir">Booking Confirmed!</h2>
                <p className="text-green-700 font-avenir">Your travel booking has been successfully confirmed.</p>
              </div>
            </div>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-avenir">Booking Summary</h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600 font-avenir">₹{totalPrice.toLocaleString()}</div>
                <div className="text-sm text-gray-500 font-avenir">Total Amount</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <img 
                  src={selectedTrip.image} 
                  alt={selectedTrip.cityName}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 font-avenir">{selectedTrip.cityName}</h4>
                  <p className="text-gray-600 font-avenir">{selectedTrip.country}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-avenir">{selectedTrip.duration?.nights} Nights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="font-avenir">{searchParams?.travelers || 1} Traveler{(searchParams?.travelers || 1) !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-lg font-bold text-orange-900 font-avenir">₹{selectedTrip.pricePerPerson.toLocaleString()}</div>
                  <div className="text-sm text-orange-700 font-avenir">per person</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            {selectedTypes.includes('flights') && selectedTrip.flightDetails && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Plane className="w-5 h-5 text-orange-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 font-avenir">Flight Details</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 font-avenir">{selectedTrip.flightDetails.departure}</div>
                      <div className="text-sm text-gray-500 font-avenir">Departure</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 font-avenir">2h 15m</div>
                      <div className="flex items-center justify-center my-1">
                        <div className="h-px bg-orange-300 flex-1"></div>
                        <div className="mx-2 w-2 h-2 bg-orange-400 rounded-full"></div>
                        <div className="h-px bg-orange-300 flex-1"></div>
                      </div>
                      <div className="text-sm text-gray-500 font-avenir">Non-stop</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 font-avenir">{selectedTrip.flightDetails.arrival}</div>
                      <div className="text-sm text-gray-500 font-avenir">Arrival</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 font-avenir">Airline:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.airline}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-avenir">Flight:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.flightNumber}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-avenir">Class:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.class}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-avenir">Seat:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.flightDetails.seatNumber}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTypes.includes('trains') && selectedTrip.trainDetails && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Train className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 font-avenir">Train Details</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 font-avenir">{selectedTrip.trainDetails.departure}</div>
                      <div className="text-sm text-gray-500 font-avenir">Departure</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 font-avenir">15h 40m</div>
                      <div className="flex items-center justify-center my-1">
                        <div className="h-px bg-green-300 flex-1"></div>
                        <div className="mx-2 w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="h-px bg-green-300 flex-1"></div>
                      </div>
                      <div className="text-sm text-gray-500 font-avenir">Direct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 font-avenir">{selectedTrip.trainDetails.arrival}</div>
                      <div className="text-sm text-gray-500 font-avenir">Arrival</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 font-avenir">Service:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.service}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-avenir">Train:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.trainNumber}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-avenir">Class:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.class}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-avenir">Seat:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.trainDetails.seatNumber}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTypes.includes('hotels') && selectedTrip.hotelDetails && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 font-avenir">Hotel Details</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 font-avenir">Hotel:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.hotelDetails.name}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-avenir">Room:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.hotelDetails.roomType}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-avenir">Check-in:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.hotelDetails.checkIn}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 font-avenir">Check-out:</span>
                      <div className="font-medium text-gray-900 font-avenir">{selectedTrip.hotelDetails.checkOut}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors font-avenir">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors font-avenir">
              <Mail className="w-4 h-4" />
              <span>Send Confirmation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
