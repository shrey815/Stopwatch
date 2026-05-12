import React from 'react';
import { formatTimeString, formatDate } from '../utils/formatTime';

const SessionCard = ({ session, onDelete }) => {
  return (
    <div className="session-card">
      <div className="session-header">
        <div className="session-date">{formatDate(session.date)}</div>
        <button 
          className="btn-delete"
          onClick={() => onDelete(session._id)}
          title="Delete session"
        >
          🗑️
        </button>
      </div>
      
      <div className="session-stats">
        <div className="stat">
          <span className="stat-label">Duration</span>
          <span className="stat-value">{formatTimeString(session.duration)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Laps</span>
          <span className="stat-value">{session.laps.length}</span>
        </div>
      </div>

      {session.laps.length > 0 && (
        <div className="session-laps">
          <div className="session-laps-header">Lap Times</div>
          {session.laps.map((lap, index) => (
            <div key={index} className="session-lap-item">
              <span>Lap {lap.lapNumber}</span>
              <span>{formatTimeString(lap.splitTime)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionCard;
