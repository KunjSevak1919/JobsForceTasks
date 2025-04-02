import './App.css';
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function App() {
  // State to track the progress percentage (0 to 100)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start an interval that simulates API polling every 2 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        const randomIncrement = Math.floor(Math.random() * 10); // Simulate a random API update increment (0-9)
        const newProgress = prev + randomIncrement;
        if (newProgress >= 100) {
          clearInterval(interval); // Stop the interval when progress reaches 100%
          return 100;
        }
        return newProgress;
      });
    }, 1200); // Update every 1000 milliseconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animated-background">
      <h1 className="mb-4">Real-Time Circular Progress Bar</h1>
      <div style={{ width: '200px', height: '200px', margin: 'auto' }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            textColor: '#000',
            pathColor: '#3b82f6', 
            trailColor: '#d1d5db', 
          })}
        />
      </div>
      {progress === 100 && (
        <div className="mt-3">
          <h3>Task Is Completed!</h3>
        </div>
      )}
    </div>
  );
}

export default App;