import React, { useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useBackgroundRemoval } from '../hooks/useBackgroundRemoval';
import { Upload, Download, RotateCcw } from 'lucide-react';

export const LogoProcessor: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    processImage,
    isProcessing,
    processedImageUrl,
    originalImageUrl,
    error,
    reset
  } = useBackgroundRemoval();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await processImage(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = () => {
    if (processedImageUrl) {
      const link = document.createElement('a');
      link.href = processedImageUrl;
      link.download = 'logo-no-background.png';
      link.click();
    }
  };

  const copyToClipboard = async () => {
    if (processedImageUrl) {
      try {
        const response = await fetch(processedImageUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        console.log('Image copied to clipboard');
      } catch (err) {
        console.error('Failed to copy image:', err);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Logo Background Removal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex gap-2">
          <Button onClick={handleUploadClick} disabled={isProcessing}>
            <Upload className="w-4 h-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Upload Logo'}
          </Button>
          
          {(originalImageUrl || processedImageUrl) && (
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {(originalImageUrl || processedImageUrl) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {originalImageUrl && (
              <div className="space-y-2">
                <h3 className="font-semibold">Original</h3>
                <div className="border rounded-lg p-4 bg-muted/50">
                  <img
                    src={originalImageUrl}
                    alt="Original logo"
                    className="w-full h-auto max-h-48 object-contain"
                  />
                </div>
              </div>
            )}

            {processedImageUrl && (
              <div className="space-y-2">
                <h3 className="font-semibold">Background Removed</h3>
                <div className="border rounded-lg p-4 bg-gradient-to-br from-muted/20 to-muted/40">
                  <img
                    src={processedImageUrl}
                    alt="Processed logo"
                    className="w-full h-auto max-h-48 object-contain"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {isProcessing && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-r-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Processing your logo...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};