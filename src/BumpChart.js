import * as Plot from 'npm:@observablehq/plot';
import * as d3 from 'npm:d3';

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

export default function BumpChart(data, { width, height } = {}) {
    const mondays = new Set(data.map((d) => { return d.date; }))
    return Plot.plot({
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
            axis: null,
        },
        color: {
            domain: d3
            .groupSort(
                data,
                (v) => v[0].qualifying_points,
                (d) => d.player
            )
            .reverse()
        },
        marks: [
            bumpMarks(data, {
                x: "date",
                z: "player",
                order: "qualifying_points",
                reverse: true
            })
        ]
    })
}
