export interface RadarProps {
    data: number[];
    color: string;
}

export interface LineProps {
    data: number[];
    color: string;
}

export interface ChartProps {
    width: number;
    height: number;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    }
}

