
import React, { useState } from 'react';
import HomePage from './HomePage';
import TripSelectionPage from './TripSelectionPage';
import ConfirmationPage from './ConfirmationPage';
import tripData from '../data/tripData.json';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchParams, setSearchParams] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const teamName = tripData.teamInfo.teamName;

  const handleSearch = (params) => {
    setSearchParams(params);
    setCurrentPage('trips');
  };

  const handleBookTrip = (trip, params) => {
    setSelectedTrip(trip);
    setSearchParams(params);
    setCurrentPage('confirmation');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSearchParams(null);
    setSelectedTrip(null);
  };

  const handleBackToTrips = () => {
    setCurrentPage('trips');
    setSelectedTrip(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onSearch={handleSearch} teamName={teamName} />;
      case 'trips':
        return (
          <TripSelectionPage 
            searchParams={searchParams} 
            onBookTrip={handleBookTrip}
            teamName={teamName}
            onBack={handleBackToHome}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationPage 
            selectedTrip={selectedTrip} 
            searchParams={searchParams}
            teamName={teamName}
            onBack={handleBackToTrips}
          />
        );
      default:
        return <HomePage onSearch={handleSearch} teamName={teamName} />;
    }
  };

  return (
    <div className="font-sans">
      {renderCurrentPage()}
    </div>
  );
};

export default Index;
