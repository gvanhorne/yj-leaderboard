import * as Plot from 'npm:@observablehq/plot';
import React, { useRef, useEffect } from 'npm:react';
import * as d3 from 'npm:d3';
import { getPlayerColorScheme } from './colors.js';

function bumpMarks(data, { r = 3, curve = "bump-x", tip, ...options }) {
  options = Plot.stackY2(options);
  return Plot.marks(
    Plot.line(data, { ...options, tip, stroke: options.z, curve, fill: null }),
    Plot.dot(data, { ...options, fill: options.z, r }),
    Plot.text(data, { fill: options.z, dy: -9, ...options, text: options.y }),
    Plot.text(
      data,
      Plot.selectFirst({
        ...options,
        text: options.z,
        dx: -(5 + (r || options.strokeWidth / 2)),
        textAnchor: "end",
        fill: "currentColor"
      })
    ),
    Plot.text(
      data,
      Plot.selectLast({
        ...options,
        text: options.z,
        dx: 5 + (r || options.strokeWidth / 2),
        textAnchor: "start",
        fill: "currentColor"
      })
    )
  );
}

export default function BumpChart({data, width, height, ...options}) {
    const mondays = new Set(data.map((d) => { return d.date; }))
    const players = new Set(data.map((d) => { return d.player; }))
    const colorScheme = getPlayerColorScheme(data);
    const containerRef = useRef();

    useEffect(() => {
        if (data === undefined) { return; }
    
        const plot = Plot.plot({
            width,
            height,
            marginTop: 20,
            marginBottom: 35,
            marginLeft: 75,
            marginRight: 80,
            x: {
                domain: mondays,
                label: null
            },
            y: {
                domain: [players.size, 1],
                axis: null,
            },
            color: {
                domain: colorScheme.domain,
                range: colorScheme.range
            },
            marks: [
                bumpMarks(data, {
                    x: "date",
                    z: "player",
                    order: (d, v) => (d.qualifying_points === v.qualifying_points) ? (d.tiebreaker_points - v.tiebreaker_points) : (d.qualifying_points - v.qualifying_points),
                    reverse: true
                })
            ]
          });
           containerRef.current.append(plot);
          // eslint-disable-next-line consistent-return
          return () => {
            plot.remove();
          };
        }, [data, options]);

        return (
          <div ref={containerRef} className="card grid-colspan-2" />
        );
      }