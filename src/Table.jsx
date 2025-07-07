import { table } from 'npm:@observablehq/inputs';
import React, { useRef, useEffect } from 'npm:react';

export default function leaderboardTable({data}) {
    const containerRef = useRef();

    useEffect(() => {
        const leaderboardTable = table(data, {
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
