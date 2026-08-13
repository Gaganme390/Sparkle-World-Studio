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
        <div className="preloader-crest">G</div>
        <div>
          <span className="preloader-title">GD GOENKA</span>
          <div className="preloader-subtitle">AYODHYA</div>
        </div>
      </div>
      <div className="preloader-progress-bar">
        <div className="preloader-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
