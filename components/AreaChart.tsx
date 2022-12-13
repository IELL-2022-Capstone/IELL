import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";
import { AreaClosed, Circle, LinePath } from "@visx/shape";
import { LEVEL } from "../config";
import { ChartProps, LineProps } from "../types";

export const AreaAxis = (props: ChartProps & LineProps) => {
    const { width, height, margin, data } = props;

    const xScale = scaleLinear({
        domain: [0, data.length - 1],
        range: [0, width - margin.right - margin.left],
        nice: true,
    });

    const yScale = scaleLinear({
        domain: [0, LEVEL],
        range: [height - margin.bottom - margin.top, 0],
        nice: true,
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
    const { data, width, height, margin, color } = props;
    const xScale = scaleLinear({
        domain: [0, data.length - 1],
        range: [0, width - margin.right - margin.left],
        nice: true,
    });

    const yScale = scaleLinear({
        domain: [0, LEVEL],
        range: [height - margin.bottom - margin.top, 0],
        nice: true,
    });

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
            {data.map((d, i) => {
                const x = (xScale(i) ?? 0) + margin.left;
                const y = (yScale(d) ?? 0) + margin.top;
                return (
                    <Circle
                        key={`line-point-${i}`}
                        cx={x}
                        cy={y}
                        r={4}
                        fill={color}
                        stroke={color}
                    />
                );
            })}
        </>
    );
};