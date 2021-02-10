import React from 'react';

const CalendarHeader = ({ onNext, onBack, dateDisplay }) => (
  <div id="header">
    <div id="monthDisplay">{dateDisplay}</div>
    <div>
      <button className="buttonCalendar" type="button" onClick={onBack} id="backButton">Back</button>
      <button className="buttonCalendar" type="button" onClick={onNext} id="nextButton">Next</button>
    </div>
  </div>
);

export default CalendarHeader;
