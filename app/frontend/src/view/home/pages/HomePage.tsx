'use client';

import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Sleep Diary</h1>
        <p className="home-subtitle">Who are you?</p>
        <div className="home-buttons">
          <button
            className="home-button patient-button"
            onClick={() => navigate('/patient')}
          >
            I'm a Patient
          </button>
          <button
            className="home-button doctor-button"
            onClick={() => navigate('/doctor')}
          >
            I'm a Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
