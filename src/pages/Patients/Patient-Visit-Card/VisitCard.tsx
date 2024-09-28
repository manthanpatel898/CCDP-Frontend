import React from 'react';

interface VisitCardProps {
  date: string;
  visitId: string;
  signal?: string;
}

const VisitCard: React.FC<VisitCardProps> = ({ date, visitId, signal }) => {
  return (
    <div className="visit-card">
      {/* Date and Visit ID */}
      <div className="visit-card-header">
        <span className="visit-date">{date}</span>
        <span className="visit-id">Visit ID: <strong>{visitId}</strong></span>
        <span className="visit-arrow">→</span> {/* Arrow icon */}
      </div>
      
      {/* Signal Alert (if present) */}
      {signal && (
        <div className="visit-signal">
          <button className="signal-button">{signal}</button>
        </div>
      )}
    </div>
  );
};

export default VisitCard;
