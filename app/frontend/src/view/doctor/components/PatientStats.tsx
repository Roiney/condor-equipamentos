'use client';

import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import './PatientStats.css';

const PatientStats = () => {
  const stats = useSelector((state: RootState) => state.doctor.stats);
  const loading = useSelector((state: RootState) => state.doctor.loading);

  const format = (val?: number, decimals = 2) =>
    typeof val === 'number' ? val.toFixed(decimals) : '–';

  if (loading) {
    return (
      <div className="stats-loading">
        <div className="loading-spinner"></div>
        <p>Loading statistics...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="stats-empty">
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
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </svg>
        <p>No statistics available for this patient.</p>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <h3 className="section-title">Sleep Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Avg. Sleep Duration</div>
          <div className="stat-value">
            {format(stats?.sleep_duration?.mean)}{' '}
            <span className="stat-unit">hours</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Min Sleep</div>
          <div className="stat-value">
            {format(stats?.sleep_duration?.min)}{' '}
            <span className="stat-unit">hours</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Max Sleep</div>
          <div className="stat-value">
            {format(stats?.sleep_duration?.max)}{' '}
            <span className="stat-unit">hours</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Std. Deviation</div>
          <div className="stat-value">
            {format(stats?.sleep_duration?.std)}{' '}
            <span className="stat-unit">hours</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Max Awakenings</div>
          <div className="stat-value">{format(stats?.awakenings?.max, 0)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Min Awakenings</div>
          <div className="stat-value">{format(stats?.awakenings?.min, 0)}</div>
        </div>
      </div>
    </div>
  );
};

export default PatientStats;
