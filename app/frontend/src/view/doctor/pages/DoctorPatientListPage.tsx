import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { fetchPatients } from '../reducer';
import './DoctorPatientListPage.css';

const DoctorPatientListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, patient_ids, total, page, page_size, error } = useSelector(
    (state: RootState) => state.doctor,
  );

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchPatients({ page, page_size }));
  }, [dispatch, page, page_size]);

  const handleNextPage = () => {
    if (page * page_size < total) {
      dispatch(fetchPatients({ page: page + 1, page_size }));
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(fetchPatients({ page: page - 1, page_size }));
    }
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
    navigate(`/doctor/patient/${id}`);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
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
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Patients</h2>

      {loading && <p>Loading...</p>}

      {error && typeof error === 'string' && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {error &&
        typeof error === 'object' &&
        Object.entries(error).map(([key, messages]) => (
          <p key={key} style={{ color: 'red' }}>
            {(messages as string[]).join(', ')}
          </p>
        ))}

      <ul className="patient-list">
        {patient_ids.map((id) =>
          typeof id === 'number' ? (
            <li
              key={id}
              className={`patient-item ${selectedId === id ? 'selected' : ''}`}
              onClick={() => handleSelect(id)}
            >
              Patient ID: {id}
            </li>
          ) : null,
        )}
      </ul>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {page} of {Math.ceil(total / page_size)}
        </span>
        <button onClick={handleNextPage} disabled={page * page_size >= total}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorPatientListPage;
