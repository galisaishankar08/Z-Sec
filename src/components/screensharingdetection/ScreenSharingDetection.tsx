"use client"
import React, { ReactElement, ReactHTMLElement, useEffect, useState } from 'react';

export const ScreenSharingDetection: React.JSX.Element = ({ children }: any) => {
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const checkScreenSharing = async () => {
      if (typeof window !== 'undefined') {
        try {
          const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          setIsSharing(true);
          mediaStream.getTracks().forEach(track => track.stop());
        } catch (error) {
          setIsSharing(false);
        }
      }
    };

    checkScreenSharing();
  }, []);

  return isSharing ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <p className="text-center text-xl font-bold">Please stop sharing your screen.</p>
    </div>
  ) : (
    <>{children}</>
  );
};
