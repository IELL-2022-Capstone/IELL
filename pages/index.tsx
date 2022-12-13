import { Box } from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import RadarChart from "../components/RadarChart";
import { useEffect, useState } from "react";
import axios from "axios";
import History from "../components/History";
import InputBox from "../components/InputBox";
import LineChart from "../components/LineChart";

export default function Home() {
  const [data, setData] = useState([]);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    try {
      const result = axios.get("http://localhost:3000/api/rader");
      result.then(function (r) {
        setData(r.data);
      });
      const histories = axios.get("http://localhost:3000/api/history");
      histories.then(function (h) {
        setHistory(JSON.parse(h.data));
      });
    } catch (e) {}
  }, []);

  return (
    <>
      <Header />
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
          <RadarChart
            data={data}
            color={"orange"}
            width={300}
            height={300}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          ml={150}
          mb={10}
          gridArea="e"
        >
          <LineChart width={500} height={350} />
        </Box>
        <Box overflowY="scroll" gridArea="h" w={600} h={300} mt={10} mr={150}>
          <History {...history} />
        </Box>
      </Box>

      <Footer />
    </>
  );
}
