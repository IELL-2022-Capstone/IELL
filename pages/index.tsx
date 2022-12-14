import { Box, Text } from "@chakra-ui/react";
import { Group } from "@visx/group";
import { Line } from "@visx/shape";
import axios from "axios";
import { useEffect, useState } from "react";
import { AreaAxis, AreaMark } from "../components/AreaChart";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import InputBox from "../components/InputBox";
import { RadarAxis, RadarMark } from "../components/RadarChart";
import { TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { useRecoilState } from "recoil";
import { historyState, tooltipState } from "../recoil/index";

const VALUE = [
  "Cohesion",
  "Syntax",
  "Vocabulary",
  "Phraseology",
  "Grammer",
  "Conventions"
];
const AREA_WIDTH = 350;
const AREA_HEIGHT = 220;
const COLOR = [
  "GoldenRod",
  "orange",
  "DarkOrange",
  "DarkSalmon",
  "SandyBrown",
  "LightSalmon"
];
const AREA_MARGIN = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 30
};
const RADER_LENGTH = 250;
const RADER_MARGIN = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white"
};
export default function Home() {
  const [data, setData] = useState<number[]>([]);
  const [history, setHistory] = useRecoilState(historyState);
  const [tooltipOver, setTooltipOver] = useRecoilState(tooltipState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const text = {
        text: "I think that students would benefit from learning at home,because they wont have to change and get up early in the morning to shower and do there hair. taking only classes helps them because at there house they'll be pay more attention. they will be comfortable at home.The hardest part of school is getting ready. you wake up go brush your teeth and go to your closet and look at your cloths. after you think you picked a outfit u go look in the mirror and youll either not like it or you look and see a stain. Then you'll have to change. with the online classes you can wear anything and stay home and you wont need to stress about what to wear.most students usually take showers before school. they either take it before they sleep or when they wake up. some students do both to smell good. that causes them do miss the bus and effects on there lesson time cause they come late to school. when u have online classes u wont need to miss lessons cause you can get everything set up and go take a shower and when u get out your ready to go.when your home your comfortable and you pay attention. it gives then an advantage to be smarter and even pass there classmates on class work. public schools are difficult even if you try. some teacher dont know how to teach it in then way that students understand it. that causes students to fail and they may repeat the class."
      };
      const predict = (await axios.post("http://127.0.0.1:8000/predict", text))
        .data;
      const predictData: number[] = [
        predict.conventions,
        predict.syntax,
        predict.vocabulary,
        predict.phraseology,
        predict.grammar,
        predict.conventions
      ];
      console.log(history);
      const newHistory = {
        text: [...history.text, predict.text],
        cohesion: [...history.conventions, predict.conventions],
        syntax: [...history.syntax, predict.syntax],
        vocabulary: [...history.vocabulary, predict.vocabulary],
        phraseology: [...history.phraseology, predict.phraseology],
        grammar: [...history.grammar, predict.grammar],
        conventions: [...history.conventions, predict.conventions]
      };
      setData(predictData);
      setHistory(newHistory);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      {isLoading === false ? (
        <Box display="grid" gridTemplateAreas={`'i r' 'e e'`}>
          <Box gridArea="i" minH={400} ml={300}>
            <Box minH={100} />
            <InputBox />
          </Box>
          <Box
            mt="90"
            mr="300"
            gridArea="r"
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <svg width={RADER_LENGTH} height={RADER_LENGTH}>
              <Group top={RADER_LENGTH / 2} left={RADER_LENGTH / 2}>
                <RadarAxis
                  width={RADER_LENGTH}
                  height={RADER_LENGTH}
                  margin={RADER_MARGIN}
                />
                <RadarMark
                  data={data}
                  color={"orange"}
                  width={RADER_LENGTH}
                  height={RADER_LENGTH}
                  margin={RADER_MARGIN}
                />
                <RadarMark
                  data={[3.13, 3.03, 3.24, 3.12, 3.03, 3.08]}
                  color={"blue"}
                  width={RADER_LENGTH}
                  height={RADER_LENGTH}
                  margin={RADER_MARGIN}
                />
              </Group>
            </svg>
          </Box>
          <Box
            mt={"20px"}
            display="grid"
            gridTemplateColumns={"repeat(3,400px)"}
            gridGap="50px"
            gridArea="e"
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Box>
              <Text align={"center"} fontWeight="bold">
                {VALUE[0]}
              </Text>
              <svg width={AREA_WIDTH} height={AREA_HEIGHT}>
                <AreaAxis
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={[0.5, 1, 1.5, 5, 2.5, 3]}
                  color={COLOR[0]}
                />
                <AreaMark
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={history.cohesion}
                  color={COLOR[0]}
                />{" "}
                {/* {tooltipOver && (
                  <g>
                    <Line
                      from={{ x: tooltipLeft - margin.left, y: 0 }}
                      to={{ x: tooltipLeft - margin.left, y: innerHeight }}
                      stroke={"#EDF2F7"}
                      strokeWidth={2}
                      pointerEvents="none"
                      strokeDasharray="4,2"
                    />
                  </g>
                )}{" "} */}
                {/* <rect
                  x={0}
                  y={0}
                  width={innerWidth}
                  height={innerHeight}
                  fill={"transparent"}
                  onMouseOver={handleTooltip}
                /> */}
              </svg>{" "}
              {/* {tooltipOver ? (
                <TooltipWithBounds
                  key={Math.random()}
                  // top={tooltipTop}
                  // left={tooltipLeft}
                  // style={tooltipStyles}
                  top={0}
                  left={0}
                  style={tooltipStyles}
                >
                  <p>{`Total Spend: $${getRD(tooltipOver[1])}`}</p>
                  <p>{`Renewable Spend: $${getRD(tooltipOver[0])}`}</p>
                  <p>{`Year: ${getDate(tooltipOver[1])}`}</p>
                </TooltipWithBounds>
              ) : null} */}
            </Box>
            <Box>
              <Text align={"center"} fontWeight="bold">
                {VALUE[1]}
              </Text>
              <svg width={AREA_WIDTH} height={AREA_HEIGHT}>
                <AreaAxis
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={[0.5, 1, 1.5, 5, 2.5, 3]}
                  color={COLOR[1]}
                />
                <AreaMark
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={history.syntax}
                  color={COLOR[1]}
                />
              </svg>
            </Box>
            <Box>
              <Text align={"center"} fontWeight="bold">
                {VALUE[2]}
              </Text>
              <svg width={AREA_WIDTH} height={AREA_HEIGHT}>
                <AreaAxis
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={[0.5, 1, 1.5, 5, 2.5, 3]}
                  color={COLOR[2]}
                />
                <AreaMark
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={history.vocabulary}
                  color={COLOR[2]}
                />
              </svg>
            </Box>
            <Box>
              <Text align={"center"} fontWeight="bold">
                {VALUE[3]}
              </Text>
              <svg width={AREA_WIDTH} height={AREA_HEIGHT}>
                <AreaAxis
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={[0.5, 1, 1.5, 5, 2.5, 3]}
                  color={COLOR[2]}
                />
                <AreaMark
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={history.phraseology}
                  color={COLOR[3]}
                />
              </svg>
            </Box>
            <Box>
              <Text align={"center"} fontWeight="bold">
                {VALUE[4]}
              </Text>
              <svg width={AREA_WIDTH} height={AREA_HEIGHT}>
                <AreaAxis
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={[0.5, 1, 1.5, 5, 2.5, 3]}
                  color={COLOR[4]}
                />
                <AreaMark
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={history.grammar}
                  color={COLOR[4]}
                />
              </svg>
            </Box>
            <Box>
              <Text align={"center"} fontWeight="bold">
                {VALUE[5]}
              </Text>
              <svg width={AREA_WIDTH} height={AREA_HEIGHT}>
                <AreaAxis
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={[0.5, 1, 1.5, 5, 2.5, 3]}
                  color={COLOR[5]}
                />
                <AreaMark
                  width={AREA_WIDTH}
                  height={AREA_HEIGHT}
                  margin={AREA_MARGIN}
                  data={history.conventions}
                  color={COLOR[5]}
                />
              </svg>
            </Box>
          </Box>
        </Box>
      ) : null}

      <Footer />
    </>
  );
}
