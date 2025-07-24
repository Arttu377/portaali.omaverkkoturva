import React from 'react';
import PageLayout from '../components/PageLayout';
import { LogoProcessor } from '../components/LogoProcessor';

export const LogoTool: React.FC = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Logo Background Removal Tool</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your logo image and remove the background while keeping all the white elements intact. 
            Perfect for logos with gray or colored backgrounds that need to become transparent.
          </p>
        </div>
        
        <LogoProcessor />
        
        <div className="mt-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">How it works:</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Upload your logo image with any background color</li>
            <li>• Our AI will analyze the image and identify the background</li>
            <li>• White and colored elements are preserved while the background becomes transparent</li>
            <li>• Download the result as a PNG with transparent background</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};