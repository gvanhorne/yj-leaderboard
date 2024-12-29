import { table } from 'npm:@observablehq/inputs';

export default function leaderboardTable(data) {
    return table(data, {
      columns: [
        "name",
        "qualifying_points",
        "tiebreaker_points",
      ],
      header: {
        name: "Player Name",
        qualifying_points: "Qualifying Points",
        tiebreaker_points: "Tiebreaker Points",
      }
    })
}
