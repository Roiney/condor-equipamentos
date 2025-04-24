import { useSelector } from 'react-redux';
import { RootState } from 'store';
import './PatientEntriesList.css';

const PatientEntriesList = () => {
  const entries = useSelector((state: RootState) => state.doctor.entries);

  if (!entries || entries.length === 0) return <p>No entries found.</p>;

  return (
    <div className="patient-entries-container">
      <h3>Sleep Diary Entries</h3>
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
              <td>{entry.medication ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientEntriesList;
