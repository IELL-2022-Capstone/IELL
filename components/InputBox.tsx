import { Button, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useRecoilState } from "recoil";

import { dataState, historyState, valueState } from "../recoil/index";
import { Instance } from "../types";
export default function InputBox() {
  const [data, setData] = useRecoilState(dataState);
  const [history, setHistory] = useRecoilState(historyState);
  const [value, setValue] = useRecoilState(valueState);

  const fetchData = async (text: string) => {
    if (text == "") return;
    console.log(text);
    const predict: Instance = (
      await axios.post("http://127.0.0.1:8000/predict", { text })
    ).data;
    setData(predict);
    setHistory([...history, predict]);
    setValue("");
  };

  return (
    <Stack direction={"column"}>
      <Textarea
        minH={350}
        resize={"none"}
        size="md"
        fontSize={24}
        value={value}
        _placeholder={{ fontSize: 24, padding: 4 }}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write English Paragraph Here!"
        width={"full"}
        height="full"
      />
      <Button
        onClick={() => {
          fetchData(value);
        }}
        colorScheme="gray"
      >
        Submit
      </Button>
    </Stack>
  );
}
