
import React, { useState } from 'react';
import HomePage from './HomePage';
import TripSelectionPage from './TripSelectionPage';
import ConfirmationPage from './ConfirmationPage';
import DestinationSearchPage from './DestinationSearchPage';
import SearchResultsPage from './SearchResultsPage';
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

  const handleOtherDestination = (params) => {
    setSearchParams(params);
    setCurrentPage('destination-search');
  };

  const handleDestinationSearch = (params) => {
    setSearchParams(params);
    setCurrentPage('search-results');
  };

  const handleSelectResult = (result, params) => {
    // Convert result to trip format for confirmation page
    const trip = {
      id: result.id,
      cityName: params.toDestination,
      country: 'Custom Destination',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
      pricePerPerson: result.price,
      duration: { nights: 3, days: 4 },
      meals: 'Breakfast included',
      pickupDrop: 'Airport transfer included',
      flightDetails: searchParams?.travelType === 'flights' ? {
        airline: result.airline,
        flightNumber: result.flightNumber,
        class: result.class,
        seatNumber: '12A',
        departure: result.departure,
        arrival: result.arrival,
        luggageAllowance: result.luggageAllowance
      } : null,
      trainDetails: searchParams?.travelType === 'trains' ? {
        service: result.service,
        trainNumber: result.trainNumber,
        class: result.class,
        seatNumber: result.seatNumber,
        departure: result.departure,
        arrival: result.arrival
      } : null,
      hotelDetails: searchParams?.travelType === 'hotels' ? {
        name: result.name,
        roomType: result.roomType,
        roomNumber: result.roomNumber,
        checkIn: result.checkIn,
        checkOut: result.checkOut
      } : null
    };
    
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

  const handleBackToDestinationSearch = () => {
    setCurrentPage('destination-search');
    setSelectedTrip(null);
  };

  const handleBackToSearchResults = () => {
    setCurrentPage('search-results');
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
            onOtherDestination={handleOtherDestination}
            teamName={teamName}
            onBack={handleBackToHome}
          />
        );
      case 'destination-search':
        return (
          <DestinationSearchPage
            searchParams={searchParams}
            teamName={teamName}
            onBack={handleBackToTrips}
            onSearch={handleDestinationSearch}
          />
        );
      case 'search-results':
        return (
          <SearchResultsPage
            searchParams={searchParams}
            teamName={teamName}
            onBack={handleBackToDestinationSearch}
            onSelect={handleSelectResult}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationPage 
            selectedTrip={selectedTrip} 
            searchParams={searchParams}
            teamName={teamName}
            onBack={currentPage === 'search-results' ? handleBackToSearchResults : handleBackToTrips}
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
