import { Button, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { dataState, historyState } from "../recoil/index";
import { Instance } from "../types";
export default function InputBox() {
    const [data, setData] = useRecoilState(dataState);
    const [history, setHistory] = useRecoilState(historyState);
    const [text, setText] = useState<string>("");

    const fetchData = async (text: string) => {
        if (text == "") return;
        const predict: Instance = (
            await axios.post("http://127.0.0.1:8000/predict", { text })
        ).data;

        setData(predict);
        setHistory([...history, predict]);
    };

    return (
        <Stack direction={"column"}>
            <Textarea
                minH={350}
                resize={"none"}
                fontSize={14}
                onChange={(e) => setText(e.target.value)}
                placeholder="Basic usage"
                width={"full"}
                height="full"
            />
            <Button
                onClick={() => {
                    fetchData;
                }}
                colorScheme="gray"
            >
                Submit
            </Button>
        </Stack>
    );
}
