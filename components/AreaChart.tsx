import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { AreaClosed, Bar, Circle, Line, LinePath } from "@visx/shape";
import { Text } from "@visx/text";
import { useRecoilState } from "recoil";
import { LEVEL } from "../config";
import {
  currentIdState,
  dataState,
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
        stroke={"gray"}
        tickFormat={(d, i) => d.toString()}
        tickLabelProps={() => ({
          fill: "gray",
          fontSize: 11,
          textAnchor: "middle"
        })}
        tickLineProps={{
          stroke: "gray"
        }}
        top={height - margin.bottom}
        left={margin.left}
        numTicks={data.length}
      />
      <AxisLeft
        stroke="gray"
        scale={yScale}
        hideZero={true}
        top={margin.top}
        left={margin.left}
        numTicks={LEVEL}
        tickFormat={(d, i) => d.toString()}
        tickLabelProps={() => ({
          fill: "gray",
          fontSize: 11,
          textAnchor: "end",
          verticalAnchor: "middle"
        })}
        tickLineProps={{
          stroke: "gray"
        }}
      />
    </>
  );
};

export const AreaMark = (props: ChartProps & LineProps) => {
  const [tooltipOver, setTooltipOver] = useRecoilState(tooltipState);
  const [currentId, setCurrentId] = useRecoilState(currentIdState);
  const [value, setValue] = useRecoilState(valueState);
  const [history, setHistory] = useRecoilState(historyState);
  const [currentDataState, setCurrentDataState] = useRecoilState(dataState);
  const { data, width, height, margin, color } = props;

  const handleOnclick = (i: number) => {
    setCurrentDataState(history[i]);
    setValue(history[i].fullText);
  };
  const handleOnMouseOver = (id: number) => {
    setTooltipOver(true);
    setCurrentId(id);
  };

  const handleOnMouseLeave = () => {
    setTooltipOver(false);
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
    <Group left={margin.left} top={margin.top}>
      <LinearGradient
        id={`area-gradien-${color}`}
        from={color}
        to={color}
        fromOpacity={0.6}
        toOpacity={0}
      />
      <AreaClosed
        data={data}
        x={(d, i) => xScale(i) ?? 0}
        y={(d) => yScale(d) ?? 0}
        yScale={yScale}
        strokeWidth={1}
        fill={`url(#area-gradien-${color})`}
        curve={curveNatural}
      />
      <LinePath
        data={data}
        x={(d, i) => xScale(i) ?? 0}
        y={(d) => yScale(d) ?? 0}
        strokeWidth={2}
        stroke={color}
        curve={curveNatural}
      />
      {data.map((d, i) => (
        <>
          <Line
            key={`tooltipline${i}`}
            from={{
              x: xScale(i) ?? 0,
              y: height - margin.bottom - margin.top
            }}
            to={{
              x: xScale(i) ?? 0,
              y: yScale(data[currentId])
            }}
            stroke={"#d9d9d9"}
            strokeWidth={
              i === currentId && tooltipOver
                ? 2
                : (width - margin.left - margin.right) / data.length
            }
            opacity={i === currentId && tooltipOver ? 1 : 0}
            onMouseOver={() => handleOnMouseOver(i)}
            onMouseLeave={() => handleOnMouseLeave()}
            onClick={() => handleOnclick(i)}
          />
          <Bar
            key={`tooltip${i}`}
            fill="#d9d9d9"
            x={xScale(currentId) - 30 ?? 0}
            y={yScale(data[currentId]) - 40 ?? 0}
            width={60}
            height={30}
            fillOpacity={i === currentId && tooltipOver ? 1 : 0}
            rx={5}
          />
          <Text
            x={xScale(currentId) ?? 0}
            y={yScale(data[currentId]) - 25 ?? 0}
            color="black"
            verticalAnchor="middle"
            textAnchor="middle"
            opacity={i === currentId && tooltipOver ? 1 : 0}
          >
            {data[currentId].toFixed(2)}
          </Text>
          <Circle
            key={`line${i}`}
            onClick={() => handleOnclick(i)}
            onMouseOver={() => handleOnMouseOver(i)}
            onMouseLeave={() => handleOnMouseLeave()}
            cx={xScale(i) ?? 0}
            cy={yScale(d) ?? 0}
            r={4}
            fill={color}
            stroke={color}
          />
        </>
      ))}
    </Group>
  );
};
