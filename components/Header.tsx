import { Button, Center, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { AiFillGithub, AiFillAliwangwang } from "react-icons/ai";
import { SlGraph } from "react-icons/sl";
export const Header = () => {
  return (
    <Center
      as="nav"
      role={"navigation"}
      minH="16"
      width="full"
      px={4}
      position={"fixed"}
      top={0}
      backgroundColor={"gray.50"}
      boxShadow={"xs"}
    >
      <Stack
        direction={"row"}
        mt={1}
        w={{ base: "full", xl: "container.xl" }}
        justifyContent={"space-between"}
        verticalAlign="center"
      >
        <Center>
          <Icon
            as={SlGraph}
            fontSize={"3xl"}
            color="gray.500"
            ml={"13px"}
            pr="1"
          />
          <Text fontSize={"2xl"} fontWeight={600} color="gray.500">
            ELLmo
          </Text>
        </Center>
        <Center>
          <Stack direction={{ base: "row", sm: "row" }} align="start">
            <Button
              py={4}
              variant={"solid"}
              colorScheme="gray"
              leftIcon={<AiFillGithub />}
              size={{ base: "xs", md: "sm" }}
              px={4}
            >
              Github
            </Button>
          </Stack>
        </Center>
      </Stack>
    </Center>
  );
};
