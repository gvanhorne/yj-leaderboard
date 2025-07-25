import { table } from 'npm:@observablehq/inputs';
import React, { useRef, useEffect } from 'npm:react';

export default function leaderboardTable({data}) {
    const containerRef = useRef();

    useEffect(() => {
        // Add rank to each player based on their position in the sorted array
        const dataWithRank = data.map((player, index) => ({
            ...player,
            rank: index + 1
        }));

        const leaderboardTable = table(dataWithRank, {
          select: false,
          maxHeight: Infinity,
          columns: [
            "rank",
            "player",
            "qualifying_points",
          ],
          header: {
            rank: "Rank",
            player: "Player Name",
            qualifying_points: "Points",
          },
          align: {
            rank: "left",
            player: "left",
            qualifying_points: "left",
          },
          width: {
            rank: 50,
            qualifying_points: 50
          }
        });
        containerRef.current.append(leaderboardTable);
        // eslint-disable-next-line consistent-return
        return () => {
            leaderboardTable.remove();
        };
    }, [data]);

    return (
        <div ref={containerRef} className="card grid-rowspan-2" style={{ padding: "0px" }} />
    );
}
