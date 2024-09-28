import React from 'react';
import './PatientOnboarding.css';
import VisitCard from '../Patient-Visit-Card/VisitCard';

const PatientOnboarding: React.FC = () => {
  const visitsData = [
    { id: 102934, date: 'March 17, 2024; 10:40 AM', signal: 'Signal alert for G8-Questionnaire' },
    { id: 9130, date: 'Nov 15, 2023; 10:40 AM', signal: null },
    { id: 3948, date: 'Nov 01, 2023; 10:40 AM', signal: 'Signal alert for Sarc-F Assessment' },
    { id: 3948, date: 'Nov 01, 2023; 10:40 AM', signal: 'Signal alert for G8-Questionnaire, and Distress Screening' }
  ];

  return (
    <div className="patient-onboarding">
      {visitsData.map((visit, index) => (
        <VisitCard
          key={index}
          date={visit.date}
          visitId={visit.id.toString()}
          signal={visit.signal || undefined}
        />
      ))}
    </div>
  );
};

export default PatientOnboarding;
