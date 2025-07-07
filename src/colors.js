import * as d3 from 'npm:d3';

// Define a consistent color scheme for players
export function getPlayerColorScheme(data) {
  // Get unique players and sort them consistently
  const players = Array.from(new Set(data.map(d => d.player))).sort();
  
  // Create a color scale with a nice categorical color scheme
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
  // Return domain and range for consistent coloring
  return {
    domain: players,
    range: players.map(player => colorScale(player))
  };
}
