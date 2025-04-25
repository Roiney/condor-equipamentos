'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { AppDispatch } from 'store';

import PatientEntriesList from '../components/PatientEntriesList';
import PatientStatsChart from '../components/PatientStats';
import SleepChart from '../components/SleepChart';
import { fetchPatientEntries, fetchPatientStats } from '../reducer';
import './DoctorPatientDetailsPage.css';

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
    <div className="patient-details-container">
      <div className="back-button-container">
        <button onClick={() => navigate('/doctor')} className="back-button">
          ← Back to list
        </button>
      </div>

      <h2 className="page-title">Patient Details - ID {id}</h2>

      <div className="patient-dashboard">
        <PatientStatsChart />
        <SleepChart />
        <PatientEntriesList />
      </div>
    </div>
  );
};

export default DoctorPatientDetailsPage;
