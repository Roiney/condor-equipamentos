import { useNavigate } from 'react-router-dom';
import SleepForm from '../components/SleepForm';

const PatientPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      {/* Botão de voltar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '1rem',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ← Home
        </button>
      </div>

      {/* Título centralizado */}
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Sleep Diary Entry
      </h2>

      <SleepForm />
    </div>
  );
};

export default PatientPage;
