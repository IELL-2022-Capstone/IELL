import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useRef } from "react";
import { useRecoilState } from "recoil";

import { inputState, valueState } from "../recoil/index";
export default function InputBox() {
  const [value, setValue] = useRecoilState(valueState);
  const [input, setInput] = useRecoilState(inputState);

  const ref = useRef(null);
  const handleClick = () => {
    setInput(ref.current.value);
  };
  const handleOnChange = () => {
    setValue(ref.current.value);
  };

  return (
    <InputGroup size="md">
      <Input
        ref={ref}
        value={value}
        placeholder="Basic usage"
        w={500}
        h={260}
        onChange={handleOnChange}
      />
      <InputRightElement width="4.5rem" display="flex" alignItems="center">
        <Button
          onClick={handleClick}
          h="1.75rem"
          size="sm"
          colorScheme="gray"
          mt="440"
          mr="1"
        >
          Submit
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
