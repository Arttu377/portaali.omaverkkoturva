import { useState, useCallback } from 'react';
import { removeBackground, loadImage } from '../utils/backgroundRemoval';

export const useBackgroundRemoval = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Create URL for original image preview
      const originalUrl = URL.createObjectURL(file);
      setOriginalImageUrl(originalUrl);
      
      // Load and process the image
      const imageElement = await loadImage(file);
      const processedBlob = await removeBackground(imageElement);
      
      // Create URL for processed image
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImageUrl(processedUrl);
      
      return processedUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Background removal failed:', err);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    if (processedImageUrl) {
      URL.revokeObjectURL(processedImageUrl);
    }
    if (originalImageUrl) {
      URL.revokeObjectURL(originalImageUrl);
    }
    setProcessedImageUrl(null);
    setOriginalImageUrl(null);
    setError(null);
    setIsProcessing(false);
  }, [processedImageUrl, originalImageUrl]);

  return {
    processImage,
    isProcessing,
    processedImageUrl,
    originalImageUrl,
    error,
    reset
  };
};