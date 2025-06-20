
import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';

const HomePage = ({ onSearch, teamName }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1439066615861-d1af74d74000')`,
        }}
      />
      
      {/* Header */}
      <Header teamName={teamName} />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
              Amex GBT
            </h1>
            <p className="text-2xl md:text-3xl text-blue-200 font-light tracking-wide">
              Great Ideas Travel
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl text-white font-light">
              Welcome back, <span className="font-semibold text-blue-300">{teamName}</span>
            </h2>
            <p className="text-lg text-white/80 mt-2">
              Start booking travel for your teams with ease
            </p>
          </div>
        </div>
        
        {/* Search Form */}
        <div className="animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <SearchForm onSearch={onSearch} />
        </div>
        
        {/* Additional Info */}
        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <p className="text-white/70 text-sm">
            Book your next adventure today! Stop waiting for the right moment to explore the world.
          </p>
          <p className="text-white/70 text-sm mt-1">
            Start your journey of getting unforgettable precious moments with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
