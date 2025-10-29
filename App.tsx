import React, { useState, Suspense, lazy, useEffect } from 'react';
import LiveWallpaper from './components/LiveWallpaper';
import { ALL_GESTURES, Gesture } from './constants/gesture-details';
const HomeScreen = lazy(() => import('./components/HomeScreen'));
const ChatScreen = lazy(() => import('./components/ChatScreen'));

type View = 'home' | 'chat';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  
  const [activeGestures, setActiveGestures] = useState<Gesture[]>(() => {
    try {
      const saved = localStorage.getItem('gestureAppActiveGestures');
      // If there are saved gestures, use them, otherwise default to all recognizable gestures.
      return saved ? JSON.parse(saved) : ALL_GESTURES;
    } catch (error) {
      console.error("Failed to load active gestures from localStorage", error);
      return ALL_GESTURES;
    }
  });
  
  const [gestureMap, setGestureMap] = useState<{ [key: string]: string }>(() => {
    try {
        const saved = localStorage.getItem('gestureAppGestureMap');
        if (saved) return JSON.parse(saved);
    } catch (error) {
        console.error("Failed to load gesture map from localStorage", error);
    }
    const initialMap: { [key: string]: string } = {};
    ALL_GESTURES.forEach(g => {
      initialMap[g.name] = g.char;
    });
    return initialMap;
  });

  const saveSettings = () => {
    try {
      localStorage.setItem('gestureAppActiveGestures', JSON.stringify(activeGestures));
      localStorage.setItem('gestureAppGestureMap', JSON.stringify(gestureMap));
      alert("Your gesture settings have been saved!");
    } catch (error) {
      console.error("Failed to save settings to localStorage", error);
      alert("There was an error saving your settings.");
    }
  };

  const resetSettings = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to reset all gesture settings to their defaults? This action cannot be undone."
    );
    if (isConfirmed) {
      localStorage.removeItem('gestureAppActiveGestures');
      localStorage.removeItem('gestureAppGestureMap');
      window.location.reload();
    }
  };

  return (
    <div className="relative w-screen h-screen bg-space-dark font-rajdhani text-white overflow-hidden">
      <LiveWallpaper />
      <div className="relative z-10 w-full h-full">
        <Suspense fallback={<LoadingSpinner />}>
          {view === 'home' && 
            <HomeScreen 
              onStart={() => setView('chat')} 
              gestureMap={gestureMap} 
              setGestureMap={setGestureMap}
              activeGestures={activeGestures}
              onReset={resetSettings}
              onSave={saveSettings}
            />}
          {view === 'chat' && <ChatScreen onExit={() => setView('home')} gestureMap={gestureMap} />}
        </Suspense>
      </div>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-16 h-16 border-4 border-t-purple-400 border-gray-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-orbitron">Loading Interface...</p>
    </div>
);


export default App;
