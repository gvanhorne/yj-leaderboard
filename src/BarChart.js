import * as Plot from 'npm:@observablehq/plot';

export default function BumpChart(data, { width, height } = {}) {
    console.log(data);

    return Plot.plot({
        width,
        height,
        marginLeft: 90,
        marginRight: 70,
        x: { axis: null },
        y: { label: null },
        marks: [
            Plot.barX(data, {
                x: "qualifying_points",
                y: "name",
                sort: { y: "x", reverse: true, limit: 10 }
            }),

            Plot.text(data, {
                text: d => d.qualifying_points,
                y: "name",
                x: "qualifying_points",
                textAnchor: "start",
                dx: 3,
                fill: "white"
            })
        ]
    })
}
