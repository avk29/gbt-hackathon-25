
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plane, Train, Building } from 'lucide-react';
import Header from '../components/Header';
import TripCard from '../components/TripCard';
import CreateJourneyCard from '../components/CreateJourneyCard';
import tripData from '../data/tripData.json';

const TripSelectionPage = ({ searchParams, onBookTrip, onOtherDestination, teamName, onBack }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Only load pre-existing trips, no "Other" option here
    setTrips(tripData.preExistingTrips);
  }, []);

  const handleTripSelect = (tripId) => {
    setSelectedTrip(tripId);
  };

  const handleModifyTrip = (trip) => {
    console.log('Modify trip:', trip);
    // Navigate to search results for editing
    onOtherDestination({ ...searchParams, editTrip: trip });
  };

  const handleBookNow = () => {
    if (selectedTrip) {
      const trip = trips.find(t => t.id === selectedTrip);
      onBookTrip(trip, searchParams);
    }
  };

  const handleCreateJourney = (journeyParams) => {
    onOtherDestination(journeyParams);
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header teamName={teamName} />
      
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8 animate-slide-in-left">
            <button
              onClick={handleBackClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="font-medium">Back to Search</span>
            </button>
          </div>

          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
              Choose Your Journey
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Select from pre-configured trips or customize your own
            </p>
            <div className="mt-6 text-sm text-gray-500">
              {searchParams?.travelTypes && (
                <span className="capitalize bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium border border-blue-200">
                  {searchParams.travelTypes.join(', ')} • {searchParams.travelers} Traveler{searchParams.travelers !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {trips.map((trip, index) => (
              <div 
                key={trip.id} 
                className="animate-scale-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`, 
                  animationFillMode: 'both' 
                }}
              >
                <TripCard
                  trip={trip}
                  searchParams={searchParams}
                  selected={selectedTrip === trip.id}
                  onSelect={handleTripSelect}
                  onModify={handleModifyTrip}
                />
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="px-6">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Create Your Journey</h2>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Create Journey Card */}
          <div className="animate-scale-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <CreateJourneyCard 
              searchParams={searchParams}
              onCreateJourney={handleCreateJourney}
            />
          </div>

          {/* Book Now Button */}
          {selectedTrip && (
            <div className="fixed bottom-8 right-8 z-50 animate-scale-in">
              <button
                onClick={handleBookNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 button-elegant backdrop-blur-glass"
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
