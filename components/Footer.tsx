import { Center, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export const Footer = () => (
    <Center
        as="footer"
        role="footerinfo"
        px={4}
        py={4}
        position="relative"
        backgroundColor={"gray.50"}
        boxShadow="xs"
    >
        <Stack
            direction={"row"}
            w={{ base: "full", xl: "container.xl" }}
            justifyContent={"space-between"}
        >
            <Stack
                direction={"column"}
                justify="left"
                alignContent="left"
                spacing={1}
            >
                <Text color="gray.500" fontSize={"sm"} fontWeight={600}>
                    2022 AI-SW Capston Design Contest
                </Text>
                <Link href="https://skku.edu">
                    <Text color="gray.500" fontSize={"xs"}>
                        Sungkyunkwan University
                    </Text>
                </Link>
                <Link href="https://coe.skku.edu">
                    <Text color="gray.500" fontSize={"xs"}>
                        College of Education
                    </Text>
                </Link>
                <Link href="https://comedu.skku.edu">
                    <Text color="gray.500" fontSize={"xs"}>
                        Department of Computer Education
                    </Text>
                </Link>
            </Stack>
            <Stack direction={"column"} align="end" spacing={1}>
                <Text color="gray.500" fontSize={"sm"} fontWeight={600}>
                    Developed by
                </Text>
                <Stack direction={"row"}>
                    <Link href="https://github.com/jason-choi">
                        <Text color="gray.500" fontSize={"xs"}>
                            Eunji Jeon
                        </Text>
                    </Link>
                    <Link href="https://github.com/jason-choi">
                        <Text color="gray.500" fontSize={"xs"}>
                            Yujin Ha
                        </Text>
                    </Link>
                    <Link href="https://github.com/jason-choi">
                        <Text color="gray.500" fontSize={"xs"}>
                            Bomin Kim
                        </Text>
                    </Link>
                </Stack>
                <Text color="gray.500" fontSize={"sm"} fontWeight={600}>
                    Designed by
                </Text>
                <Link href="https://github.com/jason-choi">
                    <Text color="gray.500" fontSize={"xs"}>
                        Jiwon Choi
                    </Text>
                </Link>
            </Stack>
        </Stack>
    </Center>
);
