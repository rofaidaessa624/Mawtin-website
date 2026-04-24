import React, { useState, useEffect } from 'react';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="progress-bar"
      className="fixed top-0 left-0 h-1 bg-green-600 z-1000 transition-all duration-200"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export default ProgressBar;