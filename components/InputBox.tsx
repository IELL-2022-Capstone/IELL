import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react'
import React from "react";

export default function InputBox() {
  return (
    <InputGroup size='md'>
      <Input placeholder="Basic usage" w={500} h={260} />
      <InputRightElement width='4.5rem' display='flex' alignItems='center'>
        <Button h='1.75rem' size='sm' colorScheme='gray' mt="440" mr="1">Commit</Button>
      </InputRightElement>
    </InputGroup>
    
    

  )
}

