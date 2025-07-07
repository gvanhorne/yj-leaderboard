import React from 'npm:react';
import BumpChart from './BumpChart.js';
import TimeSeries from './TimeSeries.js';
import leaderboardTable from './Table.js';

export default function Dashboard({ data }) {
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
  const latestData = data.filter(d => d.date.getTime() === latestDate.getTime());

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <TimeSeries data={monthlyData} z="player" />
        <BumpChart data={monthlyData} />
      </div>
      
      {/* <div className="card">
        {leaderboardTable(latestData)}
      </div> */}
    </div>
  );
}
