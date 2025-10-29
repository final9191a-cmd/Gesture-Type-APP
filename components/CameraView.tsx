
import React, { useState, useRef } from 'react';
import { FullscreenIcon } from './icons/FullscreenIcon';
import { MinimizeIcon } from './icons/MinimizeIcon';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const CameraView: React.FC<CameraViewProps> = ({ videoRef, canvasRef }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 20, y: 20 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialPos.current = position;
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || isFullScreen) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({ x: initialPos.current.x + dx, y: initialPos.current.y + dy });
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className={`fixed transition-all duration-300 ease-in-out z-50 ${
        isFullScreen
          ? 'w-full h-full top-0 left-0 bg-black'
          : 'w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl shadow-purple-900/50 cursor-move'
      } border-4 border-purple-500`}
      style={!isFullScreen ? { top: `${position.y}px`, right: `${position.x}px` } : {}}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <video ref={videoRef} className="absolute w-full h-full -scale-x-100 object-cover" autoPlay playsInline style={{ borderRadius: isFullScreen ? '0' : '50%' }} />
      <canvas ref={canvasRef} className="absolute w-full h-full -scale-x-100 object-cover" style={{ borderRadius: isFullScreen ? '0' : '50%' }} />
      
      <button 
        onClick={() => setIsFullScreen(!isFullScreen)} 
        className="absolute bottom-2 right-2 p-2 bg-purple-800/50 text-white rounded-full hover:bg-purple-700 transition-all cursor-pointer z-10"
      >
        {isFullScreen ? <MinimizeIcon className="w-6 h-6" /> : <FullscreenIcon className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default CameraView;
