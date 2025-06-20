
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TripCard from '../components/TripCard';
import tripData from '../data/tripData.json';

const TripSelectionPage = ({ searchParams, onBookTrip, teamName }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Add the "Other" option to the trips
    const tripsWithOther = [
      ...tripData.preExistingTrips,
      {
        id: 'other',
        cityName: 'Other',
        type: 'custom'
      }
    ];
    setTrips(tripsWithOther);
  }, []);

  const handleTripSelect = (tripId) => {
    setSelectedTrip(tripId);
  };

  const handleModifyTrip = (trip) => {
    console.log('Modify trip:', trip);
    // Here you would open a modal or navigate to an edit page
  };

  const handleBookNow = () => {
    if (selectedTrip) {
      const trip = trips.find(t => t.id === selectedTrip);
      onBookTrip(trip, searchParams);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header teamName={teamName} />
      
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Choose Your Journey
            </h1>
            <p className="text-xl text-gray-600">
              Select from pre-configured trips or customize your own
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {searchParams?.travelType && (
                <span className="capitalize bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {searchParams.travelType} • {searchParams.travelers} Traveler{searchParams.travelers !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                searchParams={searchParams}
                selected={selectedTrip === trip.id}
                onSelect={handleTripSelect}
                onModify={handleModifyTrip}
              />
            ))}
          </div>

          {/* Book Now Button */}
          {selectedTrip && (
            <div className="fixed bottom-8 right-8 z-50">
              <button
                onClick={handleBookNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-200 transform hover:scale-105"
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripSelectionPage;
