import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
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

  const [formData, setFormData] = useState({
    patient_id: '',
    sleep_duration: '',
    bedtime: '',
    awakenings: '',
    medication: false,
  });

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

  useEffect(() => {
    if (success && onSuccess) onSuccess();
  }, [success, onSuccess]);

  return (
    <form onSubmit={handleSubmit}>
      <label>Patient ID</label>
      <input
        type="number"
        name="patient_id"
        value={formData.patient_id}
        onChange={handleChange}
        required
      />
      <label>Sleep Duration (hours)</label>
      <input
        type="number"
        name="sleep_duration"
        step="0.1"
        value={formData.sleep_duration}
        onChange={handleChange}
        required
      />
      <label>Bedtime (HH:MM)</label>
      <input
        type="time"
        name="bedtime"
        value={formData.bedtime}
        onChange={handleChange}
        required
      />
      <label>Awakenings</label>
      <input
        type="number"
        name="awakenings"
        value={formData.awakenings}
        onChange={handleChange}
        required
      />
      <label>
        <input
          type="checkbox"
          name="medication"
          checked={formData.medication}
          onChange={handleChange}
        />
        Medication Taken
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {success && (
        <p style={{ color: 'green' }}>Entry registered successfully!</p>
      )}

      {error && typeof error === 'string' && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {error &&
        typeof error === 'object' &&
        Object.entries(error).map(([field, messages]) => (
          <p key={field} style={{ color: 'red' }}>
            {messages.join(', ')}
          </p>
        ))}
    </form>
  );
};

export default SleepForm;
