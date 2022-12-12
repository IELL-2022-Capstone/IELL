import { Box, Flex } from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import RadarChart from "../components/RadarChart";
import InputBox from "../components/InputBox";
import History from "../components/History";

export default function Home() {
    return (
        <>
            <Header />
            <Box minH={800}>
              <Box minH={200} />
              <InputBox />
              <RadarChart
                data={[0,1,2,3,4,5]}
                color={"orange"}
                width={500}
                height={500}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              />
                <History />
            </Box>
            <Footer />
        </>
    );
}
