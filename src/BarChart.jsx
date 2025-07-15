import React, { useEffect, useRef } from 'npm:react';
import * as Plot from 'npm:@observablehq/plot';
import { getPlayerColorScheme } from './colors.js';
/**
 * Renders a time series plot for caseload breakdown.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.data - An array of objects representing the data to be plotted.
 * Each object should include:
 *   - `ym` {number|string} - The time period, typically in YYYYMM format.
 *   - `cases` {number} - The number of cases for the corresponding time period and assistance type.
 *   - `assistance` {string} - The type of assistance, used to distinguish between different categories in the plot.
 * @param {Array<Object>} props.annotations - An array of objects representing the event/annotation data.
 * @param {Object} [props.options] - Optional configuration options for the plot.
 *                                    These are passed directly to `Plot.plot`.
 *
 * @returns {JSX.Element} A `div` element that contains the rendered plot.
 *
 * @example
 * const data = [
 *   { ym: 199801, cases: 123, assistance: "Disability Assistance" },
 *   { ym: 199801, cases: 456, assistance: "Income Assistance" },
 *   { ym: 199802, cases: 234, assistance: "Disability Assistance" },
 *   { ym: 199802, cases: 345, assistance: "Income Assistance" }
 * ];
 *
 * <ProgramTimeSeries data={data} windowSize={6} />
 */
export default function BarChart({
  data, dimension = 'qualifying_points', annotations = [], ...options
}) {
  const colorScheme = getPlayerColorScheme(data);
  const color = {
    type: 'categorical',
    legend: true,
    domain: colorScheme.domain,
    range: colorScheme.range
  };
  const containerRef = useRef();

  useEffect(() => {
    if (data === undefined) { return; }
    const plot = Plot.plot({
      color,
      ...options,
      x: {
        interval: "month",
      },
      y: {
        grid: true,
        label: dimension,
      },
      marks: [
        Plot.barY(
          data,
          Plot.groupX(
            { y: "sum" },
            {
              x: 'date',
              y: dimension,
              fill: "player",
            }
          )
        ),
        Plot.ruleY([0]),
      ],
    });
    containerRef.current.append(plot);
    // eslint-disable-next-line consistent-return
    return () => {
      plot.remove();
    };
  }, [data, options]);

  return (
    <div ref={containerRef} className="card grid-colspan-2">
      <h2><b>Player Standings Evolution</b></h2>
    </div>
  );
}
