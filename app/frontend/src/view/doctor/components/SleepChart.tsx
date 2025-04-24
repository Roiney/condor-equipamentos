import { useSelector } from 'react-redux';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { RootState } from 'store';

const SleepChart = () => {
  const entries = useSelector((state: RootState) => state.doctor.entries);

  if (!entries || entries.length === 0) return null;

  const data = entries
    .map((e) => ({
      date: new Date(e.created_at).toLocaleDateString(),
      sleep: e.sleep_duration,
    }))
    .reverse(); // opcional: mostrar do mais antigo para o mais novo

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Sleep Duration Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="h" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sleep"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SleepChart;
