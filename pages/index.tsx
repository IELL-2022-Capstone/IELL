import { Box } from "@chakra-ui/react";
import { Group } from "@visx/group";
import axios from "axios";
import { useEffect, useState } from "react";
import { AreaAxis, AreaChart, AreaMark } from "../components/AreaChart";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import History from "../components/History";
import InputBox from "../components/InputBox";
import { RadarAxis, RadarMark } from "../components/RadarChart";

export default function Home() {
    const [data, setData] = useState([]);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:3000/api/rader");
            setData(result.data);
            const histories = await axios.get(
                "http://localhost:3000/api/history"
            );
            setHistory(JSON.parse(histories.data));
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            <Header />
            {isLoading === false ? (
                <Box display="grid" gridTemplateAreas={`'i r' 'e h'`}>
                    <Box gridArea="i" minH={200} ml={300}>
                        <Box minH={100} />
                        <InputBox />
                    </Box>
                    <Box
                        mt="90"
                        mr="270"
                        gridArea="r"
                        minH={150}
                        display="flex"
                        justifyContent="center"
                        alignContent="center"
                    >
                        <Box minH={200} />
                        <svg width={300} height={300}>
                            <Group top={150} left={150}>
                                <RadarAxis
                                    width={300}
                                    height={300}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                    }}
                                />
                                <RadarMark
                                    data={data[0]}
                                    color={"orange"}
                                    width={300}
                                    height={300}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                    }}
                                />
                                <RadarMark
                                    data={data[1]}
                                    color={"blue"}
                                    width={300}
                                    height={300}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                    }}
                                />
                            </Group>
                        </svg>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignContent="center"
                        ml={150}
                        mb={10}
                        gridArea="e"
                    >
                        <svg width={600} height={300}>
                            <AreaAxis
                                width={600}
                                height={300}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 30,
                                    left: 30,
                                }}
                                data={[0.5, 1, 1.5, 5, 2.5, 3]}
                                color={"orange"}
                            />
                            <AreaMark
                                width={600}
                                height={300}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 30,
                                    left: 30,
                                }}
                                data={[0.5, 1, 1.5, 5, 2.5, 3]}
                                color={"orange"}
                            />
                            <AreaMark
                                width={600}
                                height={300}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 30,
                                    left: 30,
                                }}
                                data={[0.5, 1, 1.5, 5, 2.5, 3].reverse()}
                                color={"green"}
                            />
                        </svg>
                    </Box>
                    <Box
                        overflowY="scroll"
                        gridArea="h"
                        w={600}
                        h={300}
                        mt={10}
                        mr={150}
                    >
                        <History {...history} />
                    </Box>
                </Box>
            ) : null}

            <Footer />
        </>
    );
}
