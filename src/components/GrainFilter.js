import { useEffect, useRef } from "react";

export default function GrainFilter({
  opacity = 0.05,
  frameInterval = 3,
  grainFinesse = 0.1,
  greyMode = true,
}) {

  const canvasRef = useRef(null);
  const pixelAlpha = 255 * opacity;

  const canvasStyle = {
    position: 'fixed',
    zIndex: '10',
    pointerEvents: 'none',
    top: '0',
    width: '100%',
    height: '100lvh',
  }

  useEffect(() => {
    if (!canvasRef) {
      return
    };

    const ctx = canvasRef.current.getContext('2d');
    let frameCount = 0;
    let animationFrameId;

    const patternWidth = 100;
    const patternHeight = 100;

    //Adjusting the canvas size to the size of the viewport
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const drawNewGrain = (ctx, canvasWidth, canvasHeight, patternWidth, patternHeight) => {
      // Clearing the canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
      // Creating the pattern canvas
      const patternCanvas = document.createElement('canvas');
      patternCanvas.width = patternWidth;
      patternCanvas.height = patternHeight;
      const patternCtx = patternCanvas.getContext('2d');
      
      // Creating the new grain image
      const patternData = patternCtx.createImageData(patternWidth, patternHeight);
  
      // Calculating the length of the pixel data array
      const newImagePixelDataLength = patternData.width * patternData.height * 4;
  
      // Randomizing each pixel of the pixel data array in accordance to the color mode
      for (let i = 0; i < newImagePixelDataLength; i += 4) {
        const value1 = (Math.random() * 255) | 0;
        const value2 = !greyMode ? (Math.random() * 255) | 0 : value1;
        const value3 = !greyMode ? (Math.random() * 255) | 0 : value1;
  
        patternData.data[i    ] = value1;
        patternData.data[i + 1] = value2;
        patternData.data[i + 2] = value3;
        patternData.data[i + 3] = pixelAlpha;
      }
  
      patternCtx.putImageData(patternData, 0, 0);
  
      // Preparing to fill the canvas with the generated grain
      ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
  
      // Filling the canvas
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    const loop = () => {
      if(frameCount++ % frameInterval === 0) {
        drawNewGrain(ctx, canvasRef.current.width, canvasRef.current.height, patternWidth, patternHeight);
      };

      animationFrameId = requestAnimationFrame(loop);
    };

    // Launching the animation loop
    loop();

    // Stopping the animation on component dismount
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  },[
    frameInterval,
    grainFinesse,
    greyMode,
    pixelAlpha
  ],[]);
  
  // Handling window resizing
  useEffect(() => {
    if (canvasRef === null) {
      return
    }

    const handleResize = () => {
      if (canvasRef === null) {
        return
      };
      
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize)
  },[]);

  return (
    <canvas style={canvasStyle} ref={canvasRef} />
  )
}