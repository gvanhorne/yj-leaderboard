function generateRandomData() {

}
const players = [
  'John Doe', 'Jane Smith', 'Alice Brown', 'Bob Johnson',
  'Charlie Wilson', 'Diana Prince', 'Edward Miller', 'Fiona Davis',
  'George Taylor', 'Helen Clark', 'Ian Thompson', 'Julia Roberts'
];
let data = [];

const mondays = [
    '2025-01-06', '2025-01-13', '2025-01-20', '2025-01-27', '2025-02-03', '2025-02-10',
    '2025-02-17', '2025-02-24', '2025-03-03', '2025-03-10', '2025-03-17', '2025-03-24',
    '2025-03-31', '2025-04-07', '2025-04-14', '2025-04-21', '2025-04-28', '2025-05-05',
    '2025-05-12', '2025-05-19', '2025-05-26', '2025-06-02', '2025-06-09', '2025-06-16',
    '2025-06-23', '2025-06-30', '2025-07-07', '2025-07-14', '2025-07-21', '2025-07-28',
    '2025-08-04', '2025-08-11', '2025-08-18', '2025-08-25', '2025-09-01', '2025-09-08',
    '2025-09-15', '2025-09-22', '2025-09-29', '2025-10-06', '2025-10-13', '2025-10-20',
    '2025-10-27', '2025-11-03', '2025-11-10', '2025-11-17', '2025-11-24', '2025-12-01',
    '2025-12-08', '2025-12-15', '2025-12-22', '2025-12-29'
];
// Convert the Monday dates to Date objects
let points = {
  'John Doe': { qualifying_points: 0, tiebreaker_points: 0 },
  'Jane Smith': { qualifying_points: 0, tiebreaker_points: 0 },
  'Alice Brown': { qualifying_points: 0, tiebreaker_points: 0 },
  'Bob Johnson': { qualifying_points: 0, tiebreaker_points: 0 },
  'Charlie Wilson': { qualifying_points: 0, tiebreaker_points: 0 },
  'Diana Prince': { qualifying_points: 0, tiebreaker_points: 0 },
  'Edward Miller': { qualifying_points: 0, tiebreaker_points: 0 },
  'Fiona Davis': { qualifying_points: 0, tiebreaker_points: 0 },
  'George Taylor': { qualifying_points: 0, tiebreaker_points: 0 },
  'Helen Clark': { qualifying_points: 0, tiebreaker_points: 0 },
  'Ian Thompson': { qualifying_points: 0, tiebreaker_points: 0 },
  'Julia Roberts': { qualifying_points: 0, tiebreaker_points: 0 }
};

mondays.forEach(date => {
    // Shuffle the players array to ensure randomness in who gets the points
    const shuffledPlayers = [...players];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // Assign qualifying and tiebreaker points to different players
    const qualifyingPlayer = shuffledPlayers[0]; // First player gets qualifying points
    const tiebreakerPlayer = shuffledPlayers[1]; // Second player gets tiebreaker points

    // Increment points for players who got points
    points[qualifyingPlayer].qualifying_points += 1;
    points[tiebreakerPlayer].tiebreaker_points += 1;

    // Push the results for the players who got points
    data.push({
        date: new Date(date),
        player: qualifyingPlayer,
        qualifying_points: points[qualifyingPlayer].qualifying_points,
        tiebreaker_points: points[qualifyingPlayer].tiebreaker_points
    });

    data.push({
        date: new Date(date),
        player: tiebreakerPlayer,
        qualifying_points: points[tiebreakerPlayer].qualifying_points,
        tiebreaker_points: points[tiebreakerPlayer].tiebreaker_points
    });

    // Push an entry for each other player who didn't receive points
    shuffledPlayers.forEach(player => {
        if (player !== qualifyingPlayer && player !== tiebreakerPlayer) {
            data.push({
                date: new Date(date),
                player: player,
                qualifying_points: points[player].qualifying_points,
                tiebreaker_points: points[player].tiebreaker_points
            });
        }
    });
});


export default data;
