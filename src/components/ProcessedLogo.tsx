import React, { useEffect, useState } from 'react';
import { useCanvasBackgroundRemoval } from '../hooks/useCanvasBackgroundRemoval';

interface ProcessedLogoProps {
  originalImageUrl: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ProcessedLogo: React.FC<ProcessedLogoProps> = ({
  originalImageUrl,
  alt,
  width = 40,
  height = 40,
  className = ''
}) => {
  const { processImage, processedImageUrl, isProcessing, error } = useCanvasBackgroundRemoval();
  const [shouldProcess, setShouldProcess] = useState(true);

  useEffect(() => {
    if (shouldProcess && originalImageUrl) {
      processImage(originalImageUrl);
      setShouldProcess(false);
    }
  }, [originalImageUrl, processImage, shouldProcess]);

  if (isProcessing) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted/20 rounded ${className}`}
        style={{ width, height }}
      >
        <div className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    console.error('Logo processing error:', error);
    // Fallback to original image
    return (
      <img 
        src={originalImageUrl}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <img 
      src={processedImageUrl || originalImageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};