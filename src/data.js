const players = ['John Doe', 'Jane Smith', 'Alice Brown', 'Bob Johnson'];
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

let currentData = players.map(player => ({
    player: player,
    qualifying_points: 0,
    tiebreaker_points: 0
}));

mondays.forEach((date, i) => {
    let currentMondayData = [];

    let qualifyingPlayerIndex = Math.floor(Math.random() * players.length);
    let tiebreakerPlayerIndex;
    do {
        tiebreakerPlayerIndex = Math.floor(Math.random() * players.length);
    } while (tiebreakerPlayerIndex === qualifyingPlayerIndex);

    currentData[qualifyingPlayerIndex].qualifying_points += 1;
    currentData[tiebreakerPlayerIndex].tiebreaker_points += 1;

    currentData.forEach(playerData => {
        currentMondayData.push({
            player: playerData.player,
            qualifying_points: playerData.qualifying_points,
            tiebreaker_points: playerData.tiebreaker_points
        });
    });

    data.push({
        [date]: currentMondayData
    });
});

export default data;
