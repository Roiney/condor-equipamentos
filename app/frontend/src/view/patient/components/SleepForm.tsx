'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { clearPatientStatus, submitPatientEntry } from '../reducer';
import './SleepForm.css';

interface SleepFormProps {
  onSuccess?: () => void;
}

const SleepForm = ({ onSuccess }: SleepFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.patient,
  );

  const [formData, setFormData] = useState({
    patient_id: '',
    sleep_duration: '',
    bedtime: '',
    awakenings: '',
    medication: false,
  });

  // Reset form on success
  useEffect(() => {
    if (success) {
      setFormData({
        patient_id: '',
        sleep_duration: '',
        bedtime: '',
        awakenings: '',
        medication: false,
      });
    }
  }, [success]);

  // Call onSuccess callback if provided
  useEffect(() => {
    if (success && onSuccess) onSuccess();
  }, [success, onSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearPatientStatus());
    dispatch(submitPatientEntry(formData));
  };

  // Helper function to render error messages
  const renderErrors = () => {
    if (!error) return null;

    if (typeof error === 'string') {
      return (
        <div className="alert alert-error">
          <div className="alert-icon">
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div className="alert-content">{error}</div>
        </div>
      );
    }

    if (typeof error === 'object') {
      return Object.entries(error).map(([field, messages]) => (
        <div key={field} className="alert alert-error">
          <div className="alert-icon">
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div className="alert-content">
            {Array.isArray(messages) ? messages.join(', ') : messages}
          </div>
        </div>
      ));
    }

    return null;
  };

  return (
    <div className="sleep-form-card">
      <div className="card-header">
        <h2 className="card-title">Sleep Record</h2>
        <p className="card-description">Enter patient sleep data</p>
      </div>

      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patient_id">Patient ID</label>
            <input
              id="patient_id"
              name="patient_id"
              type="number"
              placeholder="Enter patient ID"
              value={formData.patient_id}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sleep_duration">Sleep Duration (hours)</label>
            <input
              id="sleep_duration"
              name="sleep_duration"
              type="number"
              step="0.1"
              placeholder="Ex: 7.5"
              value={formData.sleep_duration}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bedtime">Bedtime</label>
            <input
              id="bedtime"
              name="bedtime"
              type="time"
              value={formData.bedtime}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="awakenings">Awakenings</label>
            <input
              id="awakenings"
              name="awakenings"
              type="number"
              min="0"
              placeholder="Ex: 2"
              value={formData.awakenings}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <div className="switch-group">
              <label htmlFor="medication" className="switch-label">
                Medication Taken
              </label>
              <div className="toggle-switch">
                <input
                  id="medication"
                  name="medication"
                  type="checkbox"
                  checked={formData.medication}
                  onChange={handleChange}
                  className="toggle-input"
                />
                <label htmlFor="medication" className="toggle-label"></label>
              </div>
            </div>
          </div>

          {renderErrors()}

          {success && (
            <div className="alert alert-success">
              <div className="alert-icon">
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="alert-content">
                Entry registered successfully!
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="card-footer">
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </div>
  );
};

export default SleepForm;
