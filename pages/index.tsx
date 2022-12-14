import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";
import { Group } from "@visx/group";
import { ScaleSVG } from "@visx/responsive";
import Text from "@visx/text/lib/Text";
import { schemeCategory10 as COLOR } from "d3-scale-chromatic";
import { useRecoilState } from "recoil";
import { AreaAxis, AreaMark } from "../components/AreaChart";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import InputBox from "../components/InputBox";
import { RadarAxis, RadarMark } from "../components/RadarChart";
import {
  AREA_HEIGHT,
  AREA_MARGIN,
  AREA_WIDTH,
  AVERAGE,
  RADAR_HEIGHT,
  RADAR_WIDTH,
  RADER_MARGIN,
  VALUE
} from "../config";
import { dataState, historyState } from "../recoil/index";
import { Attribute, getScores, History, Instance } from "../types";

const mean = (arr: number[]) => arr.reduce((a, b) => a + b) / arr.length;

function HistoryAreaChart(history: History, attribute: Attribute) {
  return (
    <Box>
      <ScaleSVG width={AREA_WIDTH} height={AREA_HEIGHT}>
        <Text
          textAnchor="middle"
          x={AREA_WIDTH / 2}
          y={3}
          verticalAnchor="start"
          fontWeight="bold"
        >
          {attribute[0].toUpperCase() + attribute.slice(1)}
        </Text>
        <AreaAxis
          width={AREA_WIDTH}
          height={AREA_HEIGHT}
          margin={AREA_MARGIN}
          data={
            attribute !== "average"
              ? history.map((d) => d[attribute])
              : history.map((d) => mean(getScores(d)))
          }
          color={COLOR[0]}
        />
        <AreaMark
          width={AREA_WIDTH}
          height={AREA_HEIGHT}
          margin={AREA_MARGIN}
          data={
            attribute !== "average"
              ? history.map((d) => d[attribute])
              : history.map((d) => mean(getScores(d)))
          }
          color={attribute !== "average" ? COLOR[0] : COLOR[1]}
        />
      </ScaleSVG>
    </Box>
  );
}

export default function Home() {
  const [data, setData] = useRecoilState(dataState);
  const [history, setHistory] = useRecoilState(historyState);

  return (
    <>
      <Container maxW="container.xl" pt="20" pb="5">
        <Grid
          templateRows="repeat(2,1fr)"
          templateColumns={"repeat(2,1fr)"}
          gap={4}
        >
          <GridItem w={"full"}>
            <Heading size="lg" mb={4}>
              English
            </Heading>
            <InputBox />
          </GridItem>
          <GridItem w={"full"}>
            <Heading size="lg" mb={4}>
              Score
            </Heading>

            <ScaleSVG width={RADAR_WIDTH} height={RADAR_HEIGHT}>
              <Group top={RADAR_HEIGHT / 2} left={RADAR_WIDTH / 2}>
                <RadarAxis
                  width={RADAR_WIDTH}
                  height={RADAR_HEIGHT}
                  margin={RADER_MARGIN}
                />
                <RadarMark
                  data={data}
                  color={COLOR[0]}
                  width={RADAR_WIDTH}
                  height={RADAR_HEIGHT}
                  margin={RADER_MARGIN}
                />
                <RadarMark
                  data={AVERAGE}
                  color={COLOR[1]}
                  width={RADAR_WIDTH}
                  height={RADAR_HEIGHT}
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
              {VALUE.map((v) => HistoryAreaChart(history, v))}

              <Center bgColor={"gray.100"} m={5} borderRadius={10} p={5}>
                마우스 올리기랑 마우스 클릭을 해보세요 메롱
              </Center>
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
      <Header />
      <Footer />
    </>
  );
}
