import { Input, InputGroup, InputRightElement, Stack, Textarea } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"

import { historyState, inputState, valueState } from "../recoil/index"
export default function InputBox() {
    const [value, setValue] = useRecoilState(valueState)
    const [input, setInput] = useRecoilState(inputState)

    const ref = useRef(null)
    const handleClick = () => {
        // console.log("onclick", ref.current.value);
        setInput(ref.current.value)
    }
    const handleOnChange = () => {
        // console.log("onclick", ref.current.value);
        setValue(ref.current.value)
    }

    return (
        <Stack direction={"column"}>
            <Textarea minH={350} resize={"none"} fontSize={14} ref={ref} value={value} placeholder="Basic usage" width={"full"} height="full" onChange={handleOnChange} />
            <Button onClick={handleClick} colorScheme="gray">
                Submit
            </Button>
        </Stack>
    )
}
