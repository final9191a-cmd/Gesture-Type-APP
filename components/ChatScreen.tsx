import React, { useState, useEffect, useRef, useCallback } from 'react';
import CameraView from './CameraView';
import { useGestureControl } from '../hooks/useGestureControl';
import { HomeIcon } from './icons/HomeIcon';

interface ChatScreenProps {
  onExit: () => void;
  gestureMap: { [key: string]: string };
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onExit, gestureMap }) => {
  const [text, setText] = useState<string>('');
  const lastGesture = useRef<string | null>(null);
  const gestureTimeout = useRef<number | null>(null);

  const onGesture = useCallback((gesture: string) => {
    if (gesture !== 'Unknown') {
      console.log('Detected Gesture:', gesture);
      
      if (gesture !== lastGesture.current) {
        if (gestureTimeout.current) clearTimeout(gestureTimeout.current);

        lastGesture.current = gesture;
        
        gestureTimeout.current = window.setTimeout(() => {
          setText(prevText => {
             if (gesture === 'DELETE') {
                return prevText.slice(0, -1);
             } else if (gesture === 'SPACE') {
                return prevText + ' ';
             } else if (gesture === 'DELETE_WORD') {
                const lastSpaceIndex = prevText.trimEnd().lastIndexOf(' ');
                if (lastSpaceIndex === -1) {
                  return '';
                }
                return prevText.substring(0, lastSpaceIndex + 1);
             } else {
                return prevText + gesture;
             }
          });
          lastGesture.current = null;
        }, 500); // Debounce time
      }
    } else {
        if (gestureTimeout.current) clearTimeout(gestureTimeout.current);
        lastGesture.current = null;
    }
  }, []);

  const { videoRef, canvasRef, status, recognizedGesture } = useGestureControl(gestureMap);

  useEffect(() => {
    onGesture(recognizedGesture);
  }, [recognizedGesture, onGesture]);
  
  const chatDisplayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatDisplayRef.current) {
        chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [text])

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 relative animate-fade-in-up">
      <div className="relative flex justify-center items-center mb-4">
        <button 
          onClick={onExit} 
          className="absolute left-0 top-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/30 hover:bg-purple-500/60 transition-colors font-orbitron text-purple-200"
          aria-label="Return to Home Screen"
        >
          <HomeIcon className="w-6 h-6" />
          <span>HOME</span>
        </button>
        <h1 className="text-3xl font-orbitron text-purple-300">Gesture Chat Active</h1>
      </div>

      <div ref={chatDisplayRef} className="flex-grow bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 overflow-y-auto mb-4 font-orbitron text-2xl tracking-wider text-green-300">
        {text}
        <span className="animate-ping">_</span>
      </div>

      <div className="text-center font-rajdhani text-lg text-indigo-300 bg-black/40 p-2 rounded-lg">
        Status: {status}
      </div>

      <CameraView videoRef={videoRef} canvasRef={canvasRef} />
    </div>
  );
};

export default ChatScreen;