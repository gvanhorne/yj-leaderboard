# YellowjacketCanlander

```js
import data from './data.js';
import BumpChart from './BumpChart.js';
import leaderboardTable from './Table.js';
```

```js
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

monthGroups.forEach(group => {
  const earliest = group.reduce((min, current) => 
    current.date < min.date ? current : min
  );
  monthlyData.push(earliest);
});

view(BumpChart(monthlyData, {width, height: 300}));
```

```js
// Filter data to show only the latest date
const latestDate = new Date(Math.max(...data.map(d => d.date)));
const latestData = data.filter(d => d.date.getTime() === latestDate.getTime());

view(leaderboardTable(latestData));
```
