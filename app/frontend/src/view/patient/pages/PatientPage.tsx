import SleepForm from '../components/SleepForm';

const PatientPage = () => {
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Sleep Diary Entry</h2>
      <SleepForm />
    </div>
  );
};

export default PatientPage;
