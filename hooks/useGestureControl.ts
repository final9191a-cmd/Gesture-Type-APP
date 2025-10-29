import { useState, useEffect, useRef } from 'react';
import { GestureRecognizer, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';

let gestureRecognizer: GestureRecognizer | undefined = undefined;

export const useGestureControl = (gestureMap: { [key: string]: string }) => {
  const [status, setStatus] = useState('Initializing...');
  const [recognizedGesture, setRecognizedGesture] = useState('Unknown');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const gestureMapRef = useRef(gestureMap);

  useEffect(() => {
    gestureMapRef.current = gestureMap;
  }, [gestureMap]);

  useEffect(() => {
    const createGestureRecognizer = async () => {
      try {
        setStatus('Loading models...');
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        setStatus('Ready for camera access.');
        enableCam();
      } catch(e) {
        console.error(e);
        setStatus('Error loading models.');
      }
    };

    const enableCam = () => {
      if (!gestureRecognizer) {
        setStatus('Gesture recognizer not ready.');
        return;
      }

      navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.addEventListener("loadeddata", predictWebcam);
            setStatus('Camera enabled. Point your hand at the camera.');
          }
        })
        .catch(err => {
          console.error("Error accessing camera: ", err);
          setStatus('Camera access denied.');
        });
    };

    const predictWebcam = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Schedule the next frame before processing the current one.
      // This ensures the loop continues even if this frame fails.
      animationFrameId.current = requestAnimationFrame(predictWebcam);
      
      if (!video || !canvas || !gestureRecognizer || video.readyState < 2 || video.paused) {
          return;
      }

      const canvasCtx = canvas.getContext('2d');
      if (!canvasCtx) return;

      const nowInMs = Date.now();
      const results = gestureRecognizer.recognizeForVideo(video, nowInMs);

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      const drawingUtils = new DrawingUtils(canvasCtx);
      
      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, { color: '#C0C0C0', lineWidth: 5 });
          drawingUtils.drawLandmarks(landmarks, { color: '#FF0000', lineWidth: 2 });
        }
      }
      canvasCtx.restore();

      if (results.gestures.length > 0) {
        const topGesture = results.gestures[0][0];
        // Only recognize gestures with a high confidence score to prevent flicker
        if (topGesture.score > 0.7) {
          const categoryName = topGesture.categoryName;
          const mappedGesture = gestureMapRef.current[categoryName] || 'Unknown';
          if (mappedGesture !== recognizedGesture) {
            setRecognizedGesture(mappedGesture);
          }
        } else if (recognizedGesture !== 'Unknown') {
            setRecognizedGesture('Unknown');
        }
      } else {
          if (recognizedGesture !== 'Unknown') {
             setRecognizedGesture('Unknown');
          }
      }
    };

    createGestureRecognizer();
    
    return () => {
        if(animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        if(gestureRecognizer) {
            gestureRecognizer.close();
            gestureRecognizer = undefined;
        }
    }
  }, []);

  return { videoRef, canvasRef, status, recognizedGesture };
};