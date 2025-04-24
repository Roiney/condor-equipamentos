import { useSelector } from 'react-redux';
import { RootState } from 'store';
import './PatientStats.css';

const PatientStats = () => {
  const stats = useSelector((state: RootState) => state.doctor.stats);

  const format = (val?: number, decimals = 2) =>
    typeof val === 'number' ? val.toFixed(decimals) : '–';

  return (
    <div className="stats-container">
      <h3>Statistics</h3>
      <div className="stats-grid">
        <div>
          Avg. Sleep Duration: {format(stats?.sleep_duration?.mean)} hours
        </div>
        <div>Min Sleep: {format(stats?.sleep_duration?.min)} hours</div>
        <div>Max Sleep: {format(stats?.sleep_duration?.max)} hours</div>
        <div>Std. Dev: {format(stats?.sleep_duration?.std)} hours</div>
        <div>Max Awakenings: {format(stats?.awakenings?.max, 0)}</div>
        <div>Min Awakenings: {format(stats?.awakenings?.min, 0)}</div>
      </div>
    </div>
  );
};

export default PatientStats;
