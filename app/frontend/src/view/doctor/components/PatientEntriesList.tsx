'use client';

import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import './PatientEntriesList.css';

const PatientEntriesList = () => {
  const entries = useSelector((state: RootState) => state.doctor.entries);
  const loading = useSelector((state: RootState) => state.doctor.loading);

  if (loading) {
    return (
      <div className="entries-loading">
        <div className="loading-spinner"></div>
        <p>Loading entries...</p>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="entries-empty">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
        <p>No entries found for this patient.</p>
      </div>
    );
  }

  return (
    <div className="patient-entries-container">
      <h3 className="section-title">Sleep Diary Entries</h3>
      <div className="table-responsive">
        <table className="entries-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Sleep Duration</th>
              <th>Bedtime</th>
              <th>Awakenings</th>
              <th>Medication</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{new Date(entry.created_at).toLocaleDateString()}</td>
                <td>{entry.sleep_duration}h</td>
                <td>{entry.bedtime}</td>
                <td>{entry.awakenings}</td>
                <td>
                  <span
                    className={`medication-badge ${entry.medication ? 'yes' : 'no'}`}
                  >
                    {entry.medication ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientEntriesList;
