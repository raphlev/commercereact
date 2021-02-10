import React from 'react';

const DeleteEventModal = ({ onDelete, eventText, onClose }) => (
  <>
    <div id="deleteEventModal">
      <h2>Event</h2>

      <p id="eventText">{eventText}</p>

      <button className="buttonCalendar" type="button" onClick={onDelete} id="deleteButton">Delete</button>
      <button className="buttonCalendar" type="button" onClick={onClose} id="closeButton">Close</button>
    </div>

    <div id="modalBackDrop" />
  </>
);

export default DeleteEventModal;
