import { Box } from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import RadarChart from "../components/RadarChart";
import { useEffect, useState } from "react";
import axios from "axios";
import History from "../components/History";
import InputBox from "../components/InputBox";

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
        <Box gridArea="i" minH={200} ml={50}>
          <Box minH={100} />
          <InputBox />
        </Box>
        <Box
          mt="100"
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
        <Box gridArea="e" />
        <Box overflowY="scroll" gridArea="h" h={300} mt={10}>
          <History {...history} />
        </Box>
      </Box>

      <Footer />
    </>
  );
}
