import { table } from 'npm:@observablehq/inputs';

export default function leaderboardTable(data) {
    return table(data, {
      columns: [
        "player",
        "date",
        "qualifying_points",
        "tiebreaker_points",
      ],
      header: {
        player: "Player Name",
        date: "Date",
        qualifying_points: "Qualifying Points",
        tiebreaker_points: "Tiebreaker Points",
      }
    })
}
