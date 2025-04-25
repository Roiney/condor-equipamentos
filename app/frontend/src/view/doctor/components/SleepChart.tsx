'use client';

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
import type { RootState } from 'store';
import './SleepChart.css';

const SleepChart = () => {
  const entries = useSelector((state: RootState) => state.doctor.entries);
  const loading = useSelector((state: RootState) => state.doctor.loading);

  if (loading) {
    return (
      <div className="chart-loading">
        <div className="loading-spinner"></div>
        <p>Loading chart data...</p>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="chart-empty">
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
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
        <p>No chart data available for this patient.</p>
      </div>
    );
  }

  const data = entries
    .map((e) => ({
      date: new Date(e.created_at).toLocaleDateString(),
      sleep: e.sleep_duration,
    }))
    .reverse(); // opcional: mostrar do mais antigo para o mais novo

  return (
    <div className="chart-container">
      <h3 className="section-title">Sleep Duration Over Time</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 12 }} />
            <YAxis
              unit="h"
              stroke="#666"
              tick={{ fontSize: 12 }}
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="#5c6bc0"
              strokeWidth={2}
              dot={{ stroke: '#5c6bc0', strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{
                stroke: '#5c6bc0',
                strokeWidth: 2,
                r: 6,
                fill: '#5c6bc0',
              }}
              name="Sleep Duration"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SleepChart;
