
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Plane, Train, Building, Calendar, Users, MapPin, Clock, Download, Mail, CalendarPlus, Edit, Split, Merge, DollarSign, X, Gift, CheckCircle2, User, Share2 } from 'lucide-react';
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
    { icon: Merge, label: 'Merge Trip', color: 'orange' },
    { icon: DollarSign, label: 'Apply Fee', color: 'red' },
    { icon: X, label: 'Cancel Trip', color: 'gray' },
    { icon: Gift, label: 'Show Amenities', color: 'pink', action: () => setShowAmenities(!showAmenities) }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header teamName={teamName} />
      
      <div className="pt-20 px-4 pb-20">
        <div className="max-w-7xl mx-auto flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header with Actions */}
            <div className="bg-orange-400 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBack}
                  className="flex items-center space-x-2 text-white hover:text-orange-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back</span>
                </button>
                <div className="h-6 w-px bg-orange-300"></div>
                <div className="flex items-center space-x-2">
                  <Train className="w-5 h-5" />
                  <span className="font-medium">Trip</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share itinerary</span>
                </button>
              </div>
            </div>

            {/* Trip Title and Date */}
            <div className="bg-white px-6 py-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedTrip.cityName}</h1>
                  <p className="text-gray-600">
                    {searchParams?.fromDate ? new Date(searchParams.fromDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'Thursday, 12 June 2025'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Ref# {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Contact us</button>
                  <span className="text-gray-400 mx-2">|</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Create a shared trip</button>
                  <p className="text-sm text-gray-600 mt-1">{teamName}</p>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className={`px-6 py-4 border-b transition-all duration-500 ${
              bookingStatus === 'pending' 
                ? 'bg-yellow-50' 
                : 'bg-green-50'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  bookingStatus === 'pending' 
                    ? 'bg-yellow-100' 
                    : 'bg-green-100'
                }`}>
                  {bookingStatus === 'pending' ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></div>
                  ) : (
                    <Check className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${
                    bookingStatus === 'pending' ? 'text-yellow-800' : 'text-green-800'
                  }`}>
                    {bookingStatus === 'pending' ? 'Booking in Progress...' : 'Booked'}
                  </h2>
                  <p className={`text-sm ${
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
            <div className="bg-white px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Manager Approval</p>
                    <p className="text-sm text-gray-600">Sarah Johnson - Travel Manager</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-green-600 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">Approved</span>
                  </div>
                  <p className="text-xs text-gray-500">Dec 22, 2024 at 2:30 PM</p>
                </div>
              </div>
            </div>

            {/* Booking Details - Table Format */}
            {selectedTypes.includes('flights') && selectedTrip.flightDetails && (
              <div className="bg-white">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                    <Plane className="w-5 h-5 text-orange-600" />
                    <span>Flight Details</span>
                  </h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-5 gap-4 text-center text-sm font-medium text-gray-700 mb-4">
                      <div>Departure</div>
                      <div>Arrival</div>
                      <div>Class</div>
                      <div>Coach</div>
                      <div>Seat</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.flightDetails.departure}</div>
                        <div className="text-gray-600">Departure Airport</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.flightDetails.arrival}</div>
                        <div className="text-gray-600">Arrival Airport</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.flightDetails.class}</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">A</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.flightDetails.seatNumber}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Flight:</strong> {selectedTrip.flightDetails.airline} {selectedTrip.flightDetails.flightNumber}</p>
                    <p><strong>Amenities:</strong> WiFi Access, In-flight Entertainment, Complimentary Meal</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTypes.includes('trains') && selectedTrip.trainDetails && (
              <div className="bg-white">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                    <Train className="w-5 h-5 text-orange-600" />
                    <span>Train Details</span>
                  </h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-5 gap-4 text-center text-sm font-medium text-gray-700 mb-4">
                      <div>Departure</div>
                      <div>Arrival</div>
                      <div>Class</div>
                      <div>Coach</div>
                      <div>Seat</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.trainDetails.departure}</div>
                        <div className="text-gray-600">Departure Station</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.trainDetails.arrival}</div>
                        <div className="text-gray-600">Arrival Station</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.trainDetails.class}</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">3</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.trainDetails.seatNumber}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Train:</strong> {selectedTrip.trainDetails.service} {selectedTrip.trainDetails.trainNumber}</p>
                    <p><strong>Amenities:</strong> WiFi Access, Power Socket at Seat, Bar Car</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTypes.includes('hotels') && selectedTrip.hotelDetails && (
              <div className="bg-white">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                    <Building className="w-5 h-5 text-orange-600" />
                    <span>Hotel Details</span>
                  </h3>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-4 gap-4 text-center text-sm font-medium text-gray-700 mb-4">
                      <div>Hotel</div>
                      <div>Room Type</div>
                      <div>Check-in</div>
                      <div>Check-out</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.hotelDetails.name}</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.hotelDetails.roomType}</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.hotelDetails.checkIn}</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedTrip.hotelDetails.checkOut}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Room:</strong> {selectedTrip.hotelDetails.roomNumber}</p>
                    <p><strong>Amenities:</strong> Free WiFi, Room Service, Fitness Center, Pool Access</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80">
            {/* Price Summary */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{selectedTrip.cityName} - {selectedTrip.country}</h3>
              <div className="text-right mb-4">
                <div className="text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</div>
                <div className="text-sm text-gray-500">One Way</div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Price</span>
                  <span>₹{selectedTrip.pricePerPerson.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Additional fees</span>
                  <span>₹0</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm">
                  Download receipts
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors text-sm">
                  Trip history
                </button>
              </div>
            </div>

            {/* Booking Actions */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Actions</h3>
              <div className="space-y-2">
                {sidebarActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 text-gray-700 hover:text-gray-900 text-sm"
                  >
                    <action.icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Amenities List */}
              {showAmenities && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3 text-sm">Included Amenities</h4>
                  <div className="space-y-1">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-gray-700">{amenity}</span>
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
