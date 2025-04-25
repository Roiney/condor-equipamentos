import { useNavigate } from 'react-router-dom';
import SleepForm from '../components/SleepForm';
import './PatientPage.css';

const PatientPage = () => {
  const navigate = useNavigate();

  return (
    <div className="patient-page-container">
      <div className="back-button-container">
        <button onClick={() => navigate('/')} className="back-button">
          ← Home
        </button>
      </div>

      <h2 className="page-title">Sleep Diary Entry</h2>

      <SleepForm />
    </div>
  );
};

export default PatientPage;
