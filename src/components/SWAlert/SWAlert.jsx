import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './SWAlert.css';

const SWAlert = ({ text, buttonText, typeAlert, onClick }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!onClick) {
      const timer = setTimeout(() => {
        dispatch({ typeAlert });
      }, 6000);
      return () => clearTimeout(timer);
    }
    return true;
  }, []);

  return (
    <div className="alert">
      {text} {buttonText && <button type="button" onClick={onClick}>{buttonText}</button>}
    </div>
  );
};

export default SWAlert;
