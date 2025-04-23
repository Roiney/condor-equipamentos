import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Sleep Diary</h1>
      <p>Who are you?</p>
      <div className="buttons">
        <button onClick={() => navigate('/patient')}>I'm a Patient</button>
        <button onClick={() => navigate('/doctor')}>I'm a Doctor</button>
      </div>
    </div>
  );
};

export default HomePage;
