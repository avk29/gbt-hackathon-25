import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Plane, Train, Building, Calendar, Users, MapPin, Clock, Download, Mail, CalendarPlus, Edit, Split, Merge, DollarSign, X, Gift, CheckCircle2, User } from 'lucide-react';
import Header from '../components/Header';

const ConfirmationPage = ({ selectedTrip, searchParams, teamName, onBack }) => {
  const [bookingStatus, setBookingStatus] = useState('pending');
  const [showAmenities, setShowAmenities] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBookingStatus('confirmed');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!selectedTrip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-avenir">
        <p className="text-xl text-gray-600">No trip selected</p>
      </div>
    );
  }

  const totalPrice = selectedTrip.pricePerPerson * (searchParams?.travelers || 1);
  const selectedTypes = searchParams?.travelTypes || ['flights'];

  const amenities = [
    'Complimentary WiFi',
    'Welcome Drink',
    'Newspaper',
    'Room Service',
    'Laundry Service',
    'Concierge',
    'Fitness Center',
    'Business Center',
    'Spa Access',
    'Pool Access'
  ];

  const sidebarActions = [
    { icon: CalendarPlus, label: 'Sync to Calendar', color: 'blue' },
    { icon: Edit, label: 'Change Trip', color: 'green' },
    { icon: Split, label: 'Split Trip', color: 'purple' },
    {  icon: Merge, label: 'Merge Trip', color: 'orange' },
    { icon: DollarSign, label: 'Apply Fee', color: 'red' },
    { icon: X, label: 'Cancel Trip', color: 'gray' },
    { icon: Gift, label: 'Show Amenities', color: 'pink', action: () => setShowAmenities(!showAmenities) }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header teamName={teamName} />
      
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
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
              <h1 className="text-3xl font-bold text-gray-900 font-avenir">Booking Status</h1>
            </div>

            {/* Status Message */}
            <div className={`border rounded-2xl p-8 mb-8 transition-all duration-500 ${
              bookingStatus === 'pending' 
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
            }`}>
              <div className="flex items-center space-x-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  bookingStatus === 'pending' 
                    ? 'bg-yellow-100' 
                    : 'bg-green-100'
                }`}>
                  {bookingStatus === 'pending' ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                  ) : (
                    <Check className="w-8 h-8 text-green-600" />
                  )}
                </div>
                <div>
                  <h2 className={`text-2xl font-bold font-avenir ${
                    bookingStatus === 'pending' ? 'text-yellow-800' : 'text-green-800'
                  }`}>
                    {bookingStatus === 'pending' ? 'Booking in Progress...' : 'Booking Confirmed!'}
                  </h2>
                  <p className={`font-avenir ${
                    bookingStatus === 'pending' ? 'text-yellow-700' : 'text-green-700'
                  }`}>
                    {bookingStatus === 'pending' 
                      ? 'Please wait while we process your booking' 
                      : 'Your travel booking has been successfully confirmed'}
                  </p>
                </div>
              </div>
            </div>

            {/* Manager Approval Status */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 font-avenir">Manager Approval</h3>
                    <p className="text-gray-600 font-avenir">Sarah Johnson - Travel Manager</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-green-600 mb-1">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold font-avenir">Approved</span>
                  </div>
                  <p className="text-sm text-gray-500 font-avenir">Dec 22, 2024 at 2:30 PM</p>
                </div>
              </div>
            </div>

            {/* Booking Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 font-avenir">Booking Summary</h3>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600 font-avenir">₹{totalPrice.toLocaleString()}</div>
                  <div className="text-gray-500 font-avenir">Total Amount</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <img 
                    src={selectedTrip.image} 
                    alt={selectedTrip.cityName}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-3xl font-bold text-gray-900 font-avenir">{selectedTrip.cityName}</h4>
                    <p className="text-gray-600 font-avenir text-lg">{selectedTrip.country}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-6 h-6 text-gray-500" />
                      <span className="font-avenir text-lg">{selectedTrip.duration?.nights} Nights</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-gray-500" />
                      <span className="font-avenir text-lg">{searchParams?.travelers || 1} Traveler{(searchParams?.travelers || 1) !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                    <div className="text-2xl font-bold text-blue-900 font-avenir">₹{selectedTrip.pricePerPerson.toLocaleString()}</div>
                    <div className="text-blue-700 font-avenir">per person</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-6">
              {selectedTypes.includes('flights') && selectedTrip.flightDetails && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
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
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
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
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
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
            <div className="flex justify-center space-x-6 mt-8">
              <button className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold transition-colors font-avenir">
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
              <button className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 font-avenir">
                <Mail className="w-5 h-5" />
                <span>Send Confirmation</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 font-avenir mb-6">Booking Actions</h3>
              <div className="space-y-3">
                {sidebarActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 hover:shadow-md bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 hover:text-${action.color}-800`}
                  >
                    <action.icon className="w-5 h-5" />
                    <span className="font-medium font-avenir">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Amenities List */}
              {showAmenities && (
                <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                  <h4 className="font-bold text-pink-800 font-avenir mb-3">Included Amenities</h4>
                  <div className="space-y-2">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-600" />
                        <span className="text-sm text-pink-700 font-avenir">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
