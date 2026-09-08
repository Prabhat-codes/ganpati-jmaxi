import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Schedule } from './components/Schedule';
import { AartiBook } from './components/AartiBook';
import { ModakGame } from './components/ModakGame';
import { MandapsGuide } from './components/MandapsGuide';
import { PronunciationSection } from './components/PronunciationSection';
import { MemoriesCarousel } from './components/MemoriesCarousel';
import { EndingImageSection } from './components/EndingImageSection';
import { Footer } from './components/Footer';
import { SCHEDULE_DATA } from './data/scheduleData';

export function App() {
  const [activeTheme, setActiveTheme] = useState(SCHEDULE_DATA[0].events[0].theme);
  const [activeEventId, setActiveEventId] = useState(SCHEDULE_DATA[0].events[0].id);

  useEffect(() => {
    if (!activeTheme) return;

    const root = document.documentElement;
    root.style.setProperty('--active-accent', activeTheme.accent || '#D97706');
    root.style.setProperty('--active-border', activeTheme.border || 'rgba(217, 119, 6, 0.3)');
    root.style.setProperty('--active-glow', activeTheme.glow || 'rgba(245, 158, 11, 0.15)');
  }, [activeTheme]);

  const handleSelectEvent = (event) => {
    setActiveEventId(event.id);
    setActiveTheme(event.theme);
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <Schedule activeEventId={activeEventId} onSelectEvent={handleSelectEvent} />
        <AartiBook />
        <MandapsGuide />
        <PronunciationSection />
        <MemoriesCarousel />
        <ModakGame />
        <EndingImageSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
