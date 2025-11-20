import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import LevelSelection from './components/LevelSelection';
import GameCategories from './components/GameCategories';
import Footer from './components/Footer';
import HoaxGame from './components/games/HoaxGame';
import AkunGame from './components/games/AkunGame';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'levelSelection' | 'gameCategories' | 'hoaxGame' | 'akunGame'>('home');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleStart = () => {
    setCurrentView('levelSelection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setCurrentView('gameCategories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBackToLevelSelection = () => {
    setSelectedLevel(null);
    setCurrentView('levelSelection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartGame = (gameId: string) => {
    if (gameId === 'deteksi-hoax') {
      setCurrentView('hoaxGame');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (gameId === 'keamanan-akun') {
      setCurrentView('akunGame');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEndGame = () => {
    setCurrentView('gameCategories');
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HeroSection onStart={handleStart} />;
      case 'levelSelection':
        return <LevelSelection onSelectLevel={handleLevelSelect} onGoBack={handleBackToHome} />;
      case 'gameCategories':
        if (selectedLevel) {
          return <GameCategories level={selectedLevel} onGoBack={handleGoBackToLevelSelection} onStartGame={handleStartGame} />;
        }
        return null;
      case 'hoaxGame':
        return <HoaxGame onGoBack={handleEndGame} />;
      case 'akunGame':
        return <AkunGame onGoBack={handleEndGame} />;
      default:
        return <HeroSection onStart={handleStart} />;
    }
  };


  return (
    <div className="bg-[#0D1A2E] text-slate-200">
      <main>
        {renderView()}
      </main>
      <Footer />
    </div>
  );
}
