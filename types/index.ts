export interface RadarProps {
    data: Instance;
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
    };
}

export interface Scores {
    cohesion: number;
    conventions: number;
    syntax: number;
    vocabulary: number;
    phraseology: number;
    grammar: number;
}

export type Instance = Scores & {
    resultId: number;
    fullText: string;
};

export const getScores = (instance: Instance): number[] => {
    const { cohesion, conventions, syntax, vocabulary, phraseology, grammar } =
        instance;
    return [cohesion, conventions, syntax, vocabulary, phraseology, grammar];
};

export type History = Instance[];

export type Attribute =
    | "cohesion"
    | "syntax"
    | "vocabulary"
    | "phraseology"
    | "grammar"
    | "conventions"
    | "average";
