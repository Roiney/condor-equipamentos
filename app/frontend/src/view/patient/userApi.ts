import api from 'api/api';

interface SleepFormData {
  patient_id: string;
  sleep_duration: string;
  bedtime: string;
  awakenings: string;
  medication: boolean;
}

export const registerPatientEntry = async (formData: SleepFormData) => {
  const payload = {
    ...formData,
    patient_id: parseInt(formData.patient_id),
    sleep_duration: parseFloat(formData.sleep_duration),
    awakenings: parseInt(formData.awakenings),
  };

  const response = await api.post('/patient', payload);
  return response.data;
};
