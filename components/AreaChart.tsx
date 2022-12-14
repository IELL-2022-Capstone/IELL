import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";
import { AreaClosed, Circle, Line, LinePath } from "@visx/shape";
import { LEVEL } from "../config";
import { ChartProps, LineProps } from "../types";
import { Tooltip, WrapItem } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import {
  currentIdState,
  historyState,
  tooltipState,
  valueState
} from "../recoil/index";
import {
  defaultStyles,
  TooltipWithBounds,
  useTooltip
} from "@visx/tooltip/lib";
import { useCallback, useEffect, useState } from "react";

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
    console.log(i, x, y, d);
    setValue(history.text[i]);
  };
  const handleOnMouseOver = (id: number) => {
    setTooltipOver(true);
    setCurrentId(id);
    console.log(
      yScale(data[currentId]),
      yScale(5 - data[currentId]),
      margin.top,
      margin.bottom
    );
  };
  // const {
  //   tooltipData,
  //   tooltipLeft = 0,
  //   tooltipTop = 0,
  //   showTooltip,
  //   hideTooltip
  // } = useTooltip();

  // const handleTooltip = useCallback((data) => {
  //   // const { x } = localPoint(event) || { x: 0 };
  //   // const x0 = timeScale.invert(x - margin.left); // get Date from the scale

  //   // const index = bisectDate(data, x0, 1);
  //   // const d0 = data[index - 1];
  //   // const d1 = data[index];
  //   // let d = d0;

  //   // if (d1 && getDate(d1)) {
  //   //   d =
  //   //     x0.valueOf() - getDate(d0).valueOf() >
  //   //     getDate(d1).valueOf() - x0.valueOf()
  //   //       ? d1
  //   //       : d0;
  //   // }

  // });
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

  // const tooltipStyles = {
  //   ...defaultStyles,
  //   minWidth: 60,
  //   backgroundColor: "rgba(0,0,0,0.9)",
  //   color: "white"
  // };
  return (
    <>
      <LinearGradient
        id={`area-gradien-${color}`}
        from={color}
        to={color}
        fromOpacity={1}
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
          <Tooltip key={`line-point-${i}`} label={`${d}`} placement="top">
            <Circle
              onClick={() => handleOnclick(i, x, y, d)}
              onMouseOver={() => handleOnMouseOver(i)}
              onMouseLeave={() => handleOnMouseLeave}
              cx={x}
              cy={y}
              r={4}
              fill={color}
              stroke={color}
            />
          </Tooltip>
        );
      })}
      {/* {tooltipOver ? (
        <TooltipWithBounds
          key={Math.random()}
          top={(yScale(data[currentId]) ?? 0) + margin.top}
          left={(xScale(currentId) ?? 0) + margin.left}
          style={tooltipStyles}
        >
          <p>{`data: ${data[currentId]}`}</p>
        </TooltipWithBounds>
      ) : null} */}
    </>
  );
};
