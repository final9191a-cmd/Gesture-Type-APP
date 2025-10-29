import React from 'react';
import { Gesture } from '../constants/gesture-details';

interface GestureGuideProps {
  gestureMap: { [key: string]: string };
  setGestureMap: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  activeGestures: Gesture[];
  onReset: () => void;
}

const GestureGuide: React.FC<GestureGuideProps> = ({ gestureMap, setGestureMap, activeGestures, onReset }) => {
  const handleMapChange = (gestureName: string, newValue: string) => {
    setGestureMap(prevMap => ({
      ...prevMap,
      [gestureName]: newValue.toUpperCase(),
    }));
  };

  return (
    <div className="mt-12 w-full">
      <div className="flex justify-between items-center mb-2">
         <h2 className="text-3xl font-orbitron text-indigo-300">Gesture Library</h2>
         <button
          onClick={onReset}
          className="px-3 py-1 text-sm font-semibold text-indigo-300 bg-space-light/80 border border-indigo-400/50 rounded-md hover:bg-indigo-500/30 transition-colors"
        >
          Reset Defaults
        </button>
      </div>
      <p className="text-md text-gray-400 mt-2 mb-6">Hold a gesture to type. You can customize the output for each gesture below.</p>
      
      <div className="max-h-80 overflow-y-auto pr-4 custom-scrollbar">
        <h3 className="text-xl font-orbitron text-green-300 mb-2 sticky top-0 bg-black/30 backdrop-blur-sm py-2 z-10">Recognized Gestures</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-left mb-6">
          {activeGestures.map((gesture) => (
            <div key={gesture.name} className="bg-space-light/80 p-3 rounded-lg border-2 border-green-500/80 transform transition-transform hover:scale-105 flex flex-col items-center text-center">
              <p className="text-4xl">{gesture.emoji}</p>
              <input
                type="text"
                aria-label={`Set character for ${gesture.desc}`}
                value={gestureMap[gesture.name] || ''}
                onChange={(e) => handleMapChange(gesture.name, e.target.value)}
                className="mt-2 w-full text-center bg-space-mid p-1 rounded-md border border-purple-400 font-orbitron text-xl text-green-300 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                maxLength={10}
              />
              <p className="text-sm text-gray-300 leading-tight mt-1">{gesture.desc}</p>
            </div>
          ))}
        </div>
      </div>
       <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #302b63;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #a78bfa;
          border-radius: 10px;
          border: 2px solid #302b63;
        }
      `}</style>
    </div>
  );
};

export default GestureGuide;
