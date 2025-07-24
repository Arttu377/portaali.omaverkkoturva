import { useState, useCallback } from 'react';

export const useCanvasBackgroundRemoval = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processImage = useCallback(async (imageUrl: string): Promise<string | null> => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Create image element
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          try {
            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
              throw new Error('Could not get canvas context');
            }
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw image to canvas
            ctx.drawImage(img, 0, 0);
            
            // Get image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Process pixels
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              
              // Check if pixel is grayish (background)
              // Gray colors have similar R, G, B values
              const isGray = Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30;
              const isLight = r > 180 && g > 180 && b > 180; // Light gray/white background
              const isDark = r < 100 && g < 100 && b < 100; // Dark gray background
              
              // Check if pixel is white or very light (keep these)
              const isWhite = r > 200 && g > 200 && b > 200;
              
              if ((isGray && (isLight || isDark)) && !isWhite) {
                // Make background transparent
                data[i + 3] = 0;
              } else if (isWhite) {
                // Keep white pixels fully opaque
                data[i + 3] = 255;
              }
              // Other colors remain as they are
            }
            
            // Put processed image data back
            ctx.putImageData(imageData, 0, 0);
            
            // Convert to blob and create URL
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                setProcessedImageUrl(url);
                setIsProcessing(false);
                resolve(url);
              } else {
                setIsProcessing(false);
                reject(new Error('Failed to create blob'));
              }
            }, 'image/png');
            
          } catch (err) {
            setIsProcessing(false);
            const errorMessage = err instanceof Error ? err.message : 'Processing failed';
            setError(errorMessage);
            reject(err);
          }
        };
        
        img.onerror = () => {
          setIsProcessing(false);
          const errorMessage = 'Failed to load image';
          setError(errorMessage);
          reject(new Error(errorMessage));
        };
        
        img.src = imageUrl;
      });
      
    } catch (err) {
      setIsProcessing(false);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Background removal failed:', err);
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    if (processedImageUrl) {
      URL.revokeObjectURL(processedImageUrl);
    }
    setProcessedImageUrl(null);
    setError(null);
    setIsProcessing(false);
  }, [processedImageUrl]);

  return {
    processImage,
    isProcessing,
    processedImageUrl,
    error,
    reset
  };
};
