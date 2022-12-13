import React from "react";
import { Group } from "@visx/group";
import { curveBasis } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { Threshold } from "@visx/threshold";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import cityTemperature, {
  CityTemperature
} from "@visx/mock-data/lib/mocks/cityTemperature";

export const background = "#ffffff";
const MONTH: number = 1000 * 60 * 60 * 24 * 30;
// accessors
const day: Date = new Date();
const date = (d: CityTemperature) => new Date(d.date).valueOf();
const ny = (d: CityTemperature) => Number(d["New York"]);
const sf = (d: CityTemperature) => Number(d["San Francisco"]);
// scales
const timeScale = scaleTime<number>({
  domain: [day - MONTH, day]
});
const scoreScale = scaleLinear<number>({
  domain: [0, 5],
  nice: true
});

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type ThresholdProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function LineChart({
  width,
  height,
  margin = defaultMargin
}: ThresholdProps) {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  timeScale.range([0, xMax]);
  scoreScale.range([yMax, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={scoreScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
          />
          <GridColumns
            scale={timeScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
          />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <AxisBottom
            top={yMax}
            scale={timeScale}
            numTicks={width > 520 ? 10 : 5}
          />
          <AxisLeft scale={scoreScale} />
          <text x="-30" y="15" transform="rotate(-90)" fontSize={10}>
            Score
          </text>
          <Threshold<CityTemperature>
            id={`${Math.random()}`}
            data={cityTemperature}
            x={(d) => timeScale(date(d)) ?? 0}
            y0={(d) => scoreScale(ny(d)) ?? 0}
            y1={(d) => scoreScale(sf(d)) ?? 0}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: "violet",
              fillOpacity: 0.4
            }}
            aboveAreaProps={{
              fill: "blue",
              fillOpacity: 0.4
            }}
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => scoreScale(sf(d)) ?? 0}
            stroke="gray"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => scoreScale(ny(d)) ?? 0}
            stroke="gray"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    </div>
  );
}
