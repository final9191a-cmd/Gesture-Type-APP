import React from 'react';
import GestureGuide from './GestureGuide';
import { SparklesIcon } from './icons/SparklesIcon';
import { Gesture } from '../constants/gesture-details';
import { SaveIcon } from './icons/SaveIcon';

interface HomeScreenProps {
  onStart: () => void;
  gestureMap: { [key: string]: string };
  setGestureMap: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  activeGestures: Gesture[];
  onReset: () => void;
  onSave: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, gestureMap, setGestureMap, activeGestures, onReset, onSave }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in-up overflow-y-auto">
      <main className="container mx-auto text-center backdrop-blur-sm bg-black/30 rounded-2xl p-6 md:p-10 border border-purple-500/30 relative">
        <button 
          onClick={onSave}
          className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 text-sm font-semibold text-green-300 bg-space-light/80 border border-green-400/50 rounded-md hover:bg-green-500/30 transition-colors z-20"
          aria-label="Save all changes to gestures"
        >
          <SaveIcon className="w-5 h-5" />
          <span>Save</span>
        </button>
        <div className="flex justify-center items-center gap-4">
          <SparklesIcon className="w-10 h-10 text-purple-400" />
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            Gesture Type AI
          </h1>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-200">
          Experience the future of communication. Type with your hands in thin air.
          Our AI-powered interface translates your gestures into text in real-time.
        </p>

        <button
          onClick={onStart}
          className="mt-8 px-8 py-4 text-xl font-bold font-orbitron text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
        >
          START SESSION
        </button>

        <GestureGuide 
          gestureMap={gestureMap} 
          setGestureMap={setGestureMap} 
          activeGestures={activeGestures}
          onReset={onReset}
        />
      </main>
    </div>
  );
};

export default HomeScreen;
