import React, { useState, useEffect } from 'react';
import './Preloader.css';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(70), 50);
    const timer2 = setTimeout(() => setProgress(100), 180);
    const timer3 = setTimeout(() => setLoaded(true), 320);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className={`preloader-container ${loaded ? 'loaded' : ''}`}>
      <div className="preloader-logo">
        <img 
          src="/branding/gd_goenka_logo_light.png" 
          alt="GD Goenka School Ayodhya Logo" 
          className="preloader-brand-img"
          height="56"
        />
      </div>
      <div className="preloader-progress-bar">
        <div className="preloader-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
