import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { Group } from "@visx/group";
import axios from "axios";
import { useEffect, useState } from "react";
import { AreaAxis, AreaMark } from "../components/AreaChart";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import InputBox from "../components/InputBox";
import { RadarAxis, RadarMark } from "../components/RadarChart";
import { useRecoilState } from "recoil";
import { historyState, inputState, valueState } from "../recoil/index";
import { schemeCategory10 as COLOR } from "d3-scale-chromatic";
import { ScaleSVG } from "@visx/responsive";
import {
  AREA_HEIGHT,
  AREA_MARGIN,
  AREA_WIDTH,
  RADER_LENGTH,
  RADER_MARGIN,
  VALUE
} from "../config";

export default function Home() {
  const [data, setData] = useState<number[]>([]);
  const [history, setHistory] = useRecoilState(historyState);
  const [value, setValue] = useRecoilState(valueState);
  const [input, setInput] = useRecoilState(inputState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (input) {
        console.log("text", input);
        const text = {
          text: input
        };
        const predict = (
          await axios.post("http://127.0.0.1:8000/predict", text)
        ).data;
        const predictData: number[] = [
          predict.conventions,
          predict.syntax,
          predict.vocabulary,
          predict.phraseology,
          predict.grammar,
          predict.conventions
        ];
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
        setValue("");
        setInput("");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [input]);

  // return (
  //     <>
  //         <Header />
  //         {isLoading === false ? (
  //             <Box display="grid" gridTemplateAreas={`'i r' 'e e'`}>
  //                 <Box gridArea="i" minH={400} ml={300}>
  //                     <Box minH={100} />
  //
  //                 </Box>
  //                 <Box mt="90" mr="300" gridArea="r" display="flex" justifyContent="center" alignContent="center">

  //                 </Box>
  //                 <Box mt={"20px"} display="grid" gridTemplateColumns={"repeat(3,400px)"} gridGap="50px" gridArea="e" justifyContent={"center"} alignContent={"center"}>
  //
  //                         {/* {tooltipOver ? (
  //             <TooltipWithBounds
  //               key={Math.random()}
  //               // top={tooltipTop}
  //               // left={tooltipLeft}
  //               // style={tooltipStyles}
  //               top={0}
  //               left={0}
  //               style={tooltipStyles}
  //             >
  //               <p>{`Total Spend: $${getRD(tooltipOver[1])}`}</p>
  //               <p>{`Renewable Spend: $${getRD(tooltipOver[0])}`}</p>
  //               <p>{`Year: ${getDate(tooltipOver[1])}`}</p>
  //             </TooltipWithBounds>
  //           ) : null} */}

  //                 </Box>
  //             </Box>
  //         ) : null}

  //         <Footer />
  //     </>
  // )

  return (
    <>
      <Header />

      <Container maxW="container.xl" py="20">
        <Grid
          templateRows="repeat(2,1fr)"
          templateColumns={"repeat(4,1fr)"}
          gap={4}
        >
          <GridItem w={"full"} colSpan={3}>
            <Heading size="lg" mb={4}>
              English
            </Heading>
            <InputBox />
          </GridItem>
          <GridItem w={"full"}>
            <Heading size="lg" mb={4}>
              Score
            </Heading>

            <ScaleSVG width={RADER_LENGTH} height={RADER_LENGTH}>
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
            </ScaleSVG>
          </GridItem>
          <GridItem colSpan={4} w="full">
            <Heading size="lg" mb={4}>
              History
            </Heading>
            <SimpleGrid w="full" columns={4} spacing={4}>
              <Box>
                <Text align={"center"} fontWeight="bold">
                  {VALUE[0]}
                </Text>
                <ScaleSVG width={AREA_WIDTH} height={AREA_HEIGHT}>
                  <AreaAxis
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.cohesion}
                    color={COLOR[0]}
                  />
                  <AreaMark
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.cohesion}
                    color={COLOR[0]}
                  />
                </ScaleSVG>
              </Box>
              <Box>
                <Text align={"center"} fontWeight="bold">
                  {VALUE[1]}
                </Text>
                <ScaleSVG width={AREA_WIDTH} height={AREA_HEIGHT}>
                  <AreaAxis
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.syntax}
                    color={COLOR[1]}
                  />
                  <AreaMark
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.syntax}
                    color={COLOR[1]}
                  />
                </ScaleSVG>
              </Box>
              <Box>
                <Text align={"center"} fontWeight="bold">
                  {VALUE[2]}
                </Text>
                <ScaleSVG width={AREA_WIDTH} height={AREA_HEIGHT}>
                  <AreaAxis
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.vocabulary}
                    color={COLOR[2]}
                  />
                  <AreaMark
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.vocabulary}
                    color={COLOR[2]}
                  />
                </ScaleSVG>
              </Box>
              <Box>
                <Text align={"center"} fontWeight="bold">
                  {VALUE[3]}
                </Text>
                <ScaleSVG width={AREA_WIDTH} height={AREA_HEIGHT}>
                  <AreaAxis
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.phraseology}
                    color={COLOR[2]}
                  />
                  <AreaMark
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.phraseology}
                    color={COLOR[3]}
                  />
                </ScaleSVG>
              </Box>
              <Box>
                <Text align={"center"} fontWeight="bold">
                  {VALUE[4]}
                </Text>
                <ScaleSVG width={AREA_WIDTH} height={AREA_HEIGHT}>
                  <AreaAxis
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.grammar}
                    color={COLOR[4]}
                  />
                  <AreaMark
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.grammar}
                    color={COLOR[4]}
                  />
                </ScaleSVG>
              </Box>
              <Box>
                <Text align={"center"} fontWeight="bold">
                  {VALUE[5]}
                </Text>
                <ScaleSVG width={AREA_WIDTH} height={AREA_HEIGHT}>
                  <AreaAxis
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.conventions}
                    color={COLOR[5]}
                  />
                  <AreaMark
                    width={AREA_WIDTH}
                    height={AREA_HEIGHT}
                    margin={AREA_MARGIN}
                    data={history.conventions}
                    color={COLOR[5]}
                  />
                </ScaleSVG>
              </Box>
              <Center bgColor={"gray.100"}>
                마우스 올리기랑 마우스 클릭을 해보세요 메롱
              </Center>
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
