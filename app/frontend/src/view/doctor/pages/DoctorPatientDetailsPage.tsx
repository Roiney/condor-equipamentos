import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from 'store';

import PatientEntriesList from '../components/PatientEntriesList';
import PatientStatsChart from '../components/PatientStats';
import SleepChart from '../components/SleepChart';
import { fetchPatientEntries, fetchPatientStats } from '../reducer';

const DoctorPatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const patientId = parseInt(id);
      dispatch(fetchPatientEntries(patientId));
      dispatch(fetchPatientStats(patientId));
    }
  }, [dispatch, id]);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '1rem',
        }}
      >
        <button
          onClick={() => navigate('/doctor')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ← Back to list
        </button>
      </div>

      {/* Título centralizado */}
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Patient Details - ID {id}
      </h2>

      <PatientStatsChart />
      <SleepChart />
      <PatientEntriesList />
    </div>
  );
};

export default DoctorPatientDetailsPage;
