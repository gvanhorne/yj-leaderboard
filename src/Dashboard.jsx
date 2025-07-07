import React from 'npm:react';
import BumpChart from './BumpChart.js';
import TimeSeries from './TimeSeries.js';
import LeaderboardTable from './Table.js';

export default function Dashboard({ data, width = 800 }) {
  // Filter data to show only one entry per month (earliest entry)
  const monthlyData = [];
  const monthGroups = new Map();

  // Group data by player and month
  data.forEach(d => {
    const monthKey = `${d.date.getFullYear()}-${d.date.getMonth()}-${d.player}`;
    if (!monthGroups.has(monthKey)) {
      monthGroups.set(monthKey, []);
    }
    monthGroups.get(monthKey).push(d);
  });

  // For each group, take the entry with the earliest date
  monthGroups.forEach(group => {
    const earliest = group.reduce((min, current) => 
      current.date < min.date ? current : min
    );
    monthlyData.push(earliest);
  });

  // Filter data to show only the latest date for the table
  const latestDate = new Date(Math.max(...data.map(d => d.date)));
  const latestData = data
    .filter(d => d.date.getTime() === latestDate.getTime())
    .sort((a, b) => {
      // First sort by qualifying_points (descending)
      if (a.qualifying_points !== b.qualifying_points) {
        return b.qualifying_points - a.qualifying_points;
      }
      // Then sort by tiebreaker_points (descending)
      return b.tiebreaker_points - a.tiebreaker_points;
    });

  return (
    <div>
      <div className="grid grid-cols-4">
        <LeaderboardTable data={latestData} />
        <TimeSeries data={monthlyData} z="player" />
        <BumpChart data={monthlyData} />
      </div>
    </div>
  );
}
