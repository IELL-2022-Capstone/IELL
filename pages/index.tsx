import {
    Box,
    Center,
    Container,
    Grid,
    GridItem,
    Heading,
    SimpleGrid,
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
import { dataState, historyState, inputState, valueState } from "../recoil/index";
import { schemeCategory10 as COLOR } from "d3-scale-chromatic";
import { ScaleSVG } from "@visx/responsive";
import {
    AREA_HEIGHT,
    AREA_MARGIN,
    AREA_WIDTH,
    AVERAGE,
    RADER_LENGTH,
    RADER_MARGIN,
    VALUE,
} from "../config";
import Text from "@visx/text/lib/Text";
import { Instance, Scores } from "../types";

export default function Home() {
    const [data, setData] = useRecoilState(dataState);
    const [history, setHistory] = useRecoilState(historyState);
    const [value, setValue] = useRecoilState(valueState);
    const [input, setInput] = useRecoilState(inputState);

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
                            <Group
                                top={RADER_LENGTH / 2}
                                left={RADER_LENGTH / 2}
                            >
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
                                    data={AVERAGE}
                                    //수정해야함 Average는 어디에?
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
                                <ScaleSVG
                                    width={AREA_WIDTH}
                                    height={AREA_HEIGHT}
                                >
                                    <Text
                                        textAnchor="middle"
                                        x={AREA_WIDTH / 2}
                                        y={3}
                                        verticalAnchor="start"
                                        fontWeight="bold"
                                    >
                                        {VALUE[0]}
                                    </Text>
                                    <AreaAxis
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.cohesion)}
                                        color={COLOR[0]}
                                    />
                                    <AreaMark
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.cohesion)}
                                        color={COLOR[0]}
                                    />
                                </ScaleSVG>
                            </Box>
                            <Box>
                                <ScaleSVG
                                    width={AREA_WIDTH}
                                    height={AREA_HEIGHT}
                                >
                                    <Text
                                        textAnchor="middle"
                                        y={3}
                                        x={AREA_WIDTH / 2}
                                        verticalAnchor="start"
                                        fontWeight="bold"
                                    >
                                        {VALUE[1]}
                                    </Text>
                                    <AreaAxis
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.syntax)}
                                        color={COLOR[1]}
                                    />
                                    <AreaMark
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.syntax)}
                                        color={COLOR[1]}
                                    />
                                </ScaleSVG>
                            </Box>
                            <Box>
                                <ScaleSVG
                                    width={AREA_WIDTH}
                                    height={AREA_HEIGHT}
                                >
                                    <Text
                                        textAnchor="middle"
                                        x={AREA_WIDTH / 2}
                                        y={3}
                                        verticalAnchor="start"
                                        fontWeight="bold"
                                    >
                                        {VALUE[2]}
                                    </Text>
                                    <AreaAxis
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.vocabulary)}
                                        color={COLOR[2]}
                                    />
                                    <AreaMark
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.vocabulary)}
                                        color={COLOR[2]}
                                    />
                                </ScaleSVG>
                            </Box>
                            <Box>
                                <ScaleSVG
                                    width={AREA_WIDTH}
                                    height={AREA_HEIGHT}
                                >
                                    <Text
                                        textAnchor="middle"
                                        x={AREA_WIDTH / 2}
                                        y={3}
                                        verticalAnchor="start"
                                        fontWeight="bold"
                                    >
                                        {VALUE[3]}
                                    </Text>
                                    <AreaAxis
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.phraseology)}
                                        color={COLOR[2]}
                                    />
                                    <AreaMark
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.phraseology)}
                                        color={COLOR[3]}
                                    />
                                </ScaleSVG>
                            </Box>
                            <Box>
                                <ScaleSVG
                                    width={AREA_WIDTH}
                                    height={AREA_HEIGHT}
                                >
                                    <Text
                                        verticalAnchor="start"
                                        textAnchor="middle"
                                        x={AREA_WIDTH / 2}
                                        y={3}
                                        fontWeight="bold"
                                    >
                                        {VALUE[4]}
                                    </Text>
                                    <AreaAxis
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.grammar)}
                                        color={COLOR[4]}
                                    />
                                    <AreaMark
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.grammar)}
                                        color={COLOR[4]}
                                    />
                                </ScaleSVG>
                            </Box>
                            <Box>
                                <ScaleSVG
                                    width={AREA_WIDTH}
                                    height={AREA_HEIGHT}
                                >
                                    <Text
                                        verticalAnchor="start"
                                        y={3}
                                        textAnchor="middle"
                                        x={AREA_WIDTH / 2}
                                        fontWeight="bold"
                                    >
                                        {VALUE[5]}
                                    </Text>
                                    <AreaAxis
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.conventions)}
                                        color={COLOR[5]}
                                    />
                                    <AreaMark
                                        width={AREA_WIDTH}
                                        height={AREA_HEIGHT}
                                        margin={AREA_MARGIN}
                                        data={history.map((d) => d.conventions)}
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
