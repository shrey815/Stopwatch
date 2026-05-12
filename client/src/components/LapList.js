import React from 'react';
import { formatTimeString } from '../utils/formatTime';

const LapList = ({ laps }) => {
  if (laps.length === 0) return null;

  // Find fastest and slowest laps
  const lapTimes = laps.map(lap => lap.splitTime);
  const fastest = Math.min(...lapTimes);
  const slowest = Math.max(...lapTimes);

  return (
    <div className="lap-list">
      <h3>Laps</h3>
      <div className="lap-list-container">
        {laps.map((lap, index) => {
          const isFastest = laps.length > 1 && lap.splitTime === fastest;
          const isSlowest = laps.length > 1 && lap.splitTime === slowest;
          
          return (
            <div 
              key={index} 
              className={`lap-item ${isFastest ? 'fastest' : ''} ${isSlowest ? 'slowest' : ''}`}
            >
              <span className="lap-number">Lap {lap.lapNumber}</span>
              <div className="lap-times">
                <span className="lap-split">{formatTimeString(lap.splitTime)}</span>
                <span className="lap-total">{formatTimeString(lap.totalTime)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LapList;
