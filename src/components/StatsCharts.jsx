import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function StatsCharts({ players }) {
  // Prepare win rate distribution data
  const winRateRanges = [
    { range: '0-20%', min: 0, max: 0.2, count: 0 },
    { range: '20-40%', min: 0.2, max: 0.4, count: 0 },
    { range: '40-60%', min: 0.4, max: 0.6, count: 0 },
    { range: '60-80%', min: 0.6, max: 0.8, count: 0 },
    { range: '80-100%', min: 0.8, max: 1.0, count: 0 },
  ];

  players.forEach(player => {
    const winRate = player.Win_Rate;
    for (const range of winRateRanges) {
      if (winRate >= range.min && winRate < range.max) {
        range.count++;
        break;
      }
    }
    // Handle exactly 1.0
    if (winRate === 1.0) {
      winRateRanges[4].count++;
    }
  });

  // Prepare rating distribution data (top 10 for clarity)
  const sortedByRating = [...players]
    .sort((a, b) => b.Rating_Mu - a.Rating_Mu)
    .slice(0, 10)
    .map(player => ({
      name: player.Player,
      mu: player.Rating_Mu,
      sigma: player.Rating_Sigma,
    }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Tournament Statistics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Win Rate Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Win Rate Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={winRateRanges}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Top 10 Ratings (μ)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedByRating}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mu" fill="#8b5cf6" name="Rating (μ)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StatsCharts;

