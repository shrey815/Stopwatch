import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from '../utils/formatTime';
import { sessionAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LapList from './LapList';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleStartPause();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleReset();
      } else if (e.code === 'KeyL' && isRunning) {
        e.preventDefault();
        handleLap();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, time, laps]);

  const toggleStartPause = () => {
    setIsRunning(!isRunning);
    setSaveMessage('');
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setSaveMessage('');
  };

  const handleLap = () => {
    if (!isRunning) return;

    const previousLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
    const splitTime = time - previousLapTime;

    const newLap = {
      lapNumber: laps.length + 1,
      splitTime: splitTime,
      totalTime: time
    };

    setLaps([...laps, newLap]);
  };

  const handleSave = async () => {
    if (time === 0) {
      setSaveMessage('Cannot save empty session');
      return;
    }

    if (!isAuthenticated) {
      setSaveMessage('Please login to save sessions');
      return;
    }

    try {
      await sessionAPI.create({
        duration: time,
        laps: laps
      });
      setSaveMessage('Session saved successfully! ✓');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save session');
    }
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch">
        <div className="time-display">
          <span className="time-segment">{hours}</span>
          <span className="time-separator">:</span>
          <span className="time-segment">{minutes}</span>
          <span className="time-separator">:</span>
          <span className="time-segment">{seconds}</span>
          <span className="time-separator">:</span>
          <span className="time-segment milliseconds">{milliseconds}</span>
        </div>

        <div className="controls">
          <button 
            className={`btn btn-primary ${isRunning ? 'btn-pause' : 'btn-start'}`}
            onClick={toggleStartPause}
          >
            {isRunning ? 'Pause' : time === 0 ? 'Start' : 'Resume'}
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={handleLap}
            disabled={!isRunning}
          >
            Lap
          </button>
          
          <button 
            className="btn btn-reset"
            onClick={handleReset}
          >
            Reset
          </button>

          {isAuthenticated && (
            <button 
              className="btn btn-save"
              onClick={handleSave}
              disabled={time === 0}
            >
              Save
            </button>
          )}
        </div>

        {saveMessage && (
          <div className={`save-message ${saveMessage.includes('✓') ? 'success' : 'error'}`}>
            {saveMessage}
          </div>
        )}

        <div className="keyboard-hints">
          <span>Space: Start/Pause</span>
          <span>L: Lap</span>
          <span>R: Reset</span>
        </div>
      </div>

      <LapList laps={laps} />
    </div>
  );
};

export default Stopwatch;
