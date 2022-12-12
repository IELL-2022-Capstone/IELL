import { Box } from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Box minH={800} />
      <Footer />
    </>
  )
}
