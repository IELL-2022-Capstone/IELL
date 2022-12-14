import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";
import { AreaClosed, Circle, Line, LinePath } from "@visx/shape";
import { useRecoilState } from "recoil";
import { LEVEL } from "../config";
import {
  currentIdState,
  historyState,
  tooltipState,
  valueState
} from "../recoil/index";
import { ChartProps, LineProps } from "../types";

export const AreaAxis = (props: ChartProps & LineProps) => {
  const { width, height, margin, data } = props;

  const xScale = scaleLinear({
    domain: [0, data.length - 1],
    range: [0, width - margin.right - margin.left],
    nice: true
  });

  const yScale = scaleLinear({
    domain: [0, LEVEL],
    range: [height - margin.bottom - margin.top, 0],
    nice: true
  });

  return (
    <>
      <AxisBottom
        scale={xScale}
        stroke={"#d9d9d9"}
        tickFormat={(d, i) => d.toString()}
        top={height - margin.bottom}
        left={margin.left}
        numTicks={data.length}
      />
      <AxisLeft
        stroke="#d9d9d9"
        scale={yScale}
        hideZero={true}
        top={margin.top}
        left={margin.left}
        numTicks={LEVEL}
        tickFormat={(d, i) => d.toString()}
      />
    </>
  );
};

export const AreaMark = (props: ChartProps & LineProps) => {
  const [tooltipOver, setTooltipOver] = useRecoilState(tooltipState);
  const [currentId, setCurrentId] = useRecoilState(currentIdState);
  const [value, setValue] = useRecoilState(valueState);
  const [history, setHistory] = useRecoilState(historyState);

  const { data, width, height, margin, color } = props;

  const handleOnclick = (i: number, x: number, y: number, d: number) => {
    setValue(history.full_text[i]);
  };
  const handleOnMouseOver = (id: number) => {
    setTooltipOver(true);
    setCurrentId(id);
  };

  const handleOnMouseLeave = () => {
    setTooltipOver(false);
    setCurrentId(-1);
  };

  const xScale = scaleLinear({
    domain: [0, data.length - 1],
    range: [0, width - margin.right - margin.left],
    nice: true
  });

  const yScale = scaleLinear({
    domain: [0, LEVEL],
    range: [height - margin.bottom - margin.top, 0],
    nice: true
  });

  return (
    <>
      <LinearGradient
        id={`area-gradien-${color}`}
        from={color}
        to={color}
        fromOpacity={0.6}
        toOpacity={0}
      />
      <AreaClosed
        data={data}
        x={(d, i) => (xScale(i) ?? 0) + margin.left}
        y={(d) => (yScale(d) ?? 0) + margin.top}
        yScale={yScale}
        strokeWidth={1}
        fill={`url(#area-gradien-${color})`}
        curve={curveNatural}
      />
      <LinePath
        data={data}
        x={(d, i) => (xScale(i) ?? 0) + margin.left}
        y={(d) => (yScale(d) ?? 0) + margin.top}
        strokeWidth={2}
        stroke={color}
        curve={curveNatural}
      />
      {tooltipOver && (
        <g>
          <Line
            from={{
              x: (xScale(currentId) ?? 0) + margin.left,
              y: height - margin.bottom - margin.top + 20
            }}
            to={{
              x: (xScale(currentId) ?? 0) + margin.left,
              y: yScale(data[currentId]) + 20 //-yScale(5) - margin.top - margin.bottom
            }}
            stroke={"#d9d9d9"}
            strokeWidth={1}
            pointerEvents="none"
          />
        </g>
      )}
      {data.map((d, i) => {
        const x = (xScale(i) ?? 0) + margin.left;
        const y = (yScale(d) ?? 0) + margin.top;
        return (
          <>
            {currentId == i && (
              <svg key={`Svg${i}`} overflow="visible">
                <rect
                  fill="lightGray"
                  x={x - 30}
                  y={y - 40}
                  width="60px"
                  height="30px"
                  fillOpacity="0.7"
                  rx="5px"
                />
                <text x={x - 12} y={y - 19} fill="black">
                  {data[currentId].toFixed(1)}
                </text>
              </svg>
            )}
            <Circle
              key={`line${i}`}
              onClick={() => handleOnclick(i, x, y, d)}
              onMouseOver={() => handleOnMouseOver(i)}
              onMouseLeave={() => handleOnMouseLeave()}
              cx={x}
              cy={y}
              r={4}
              fill={color}
              stroke={color}
            />
          </>
        );
      })}
    </>
  );
};
