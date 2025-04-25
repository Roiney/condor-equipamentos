'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from 'store';
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
    <div className="doctor-page-container">
      <div className="back-button-container">
        <button onClick={() => navigate('/')} className="back-button">
          ← Home
        </button>
      </div>

      <h2 className="page-title">Patients</h2>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading patients...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          {typeof error === 'string' ? (
            <div className="error-message">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          ) : (
            Object.entries(error).map(([key, messages]) => (
              <div key={key} className="error-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{(messages as string[]).join(', ')}</span>
              </div>
            ))
          )}
        </div>
      )}

      {!loading && patient_ids.length === 0 && !error && (
        <div className="empty-state">
          <p>No patients found</p>
        </div>
      )}

      {patient_ids.length > 0 && (
        <ul className="patient-list">
          {patient_ids.map((id) =>
            typeof id === 'number' ? (
              <li
                key={id}
                className={`patient-item ${selectedId === id ? 'selected' : ''}`}
                onClick={() => handleSelect(id)}
              >
                <div className="patient-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className="patient-text">Patient ID: {id}</span>
                <div className="patient-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </li>
            ) : null,
          )}
        </ul>
      )}

      {patient_ids.length > 0 && (
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {Math.ceil(total / page_size)}
          </span>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={page * page_size >= total}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorPatientListPage;
