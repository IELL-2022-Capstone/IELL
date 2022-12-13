import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { Group } from "@visx/group";
import { RadarAxis, RadarMark } from "./RadarChart";
type Data = [string, ...number[]];
export default function History(data: any) {
    const history = [
        [1, 2, 3, 4, 5, 4.3],
        [0, 2, 3.6, 4, 5, 3],
    ];

    return (
        <SimpleGrid
            spacing={4}
            templateRows="repeat(1,250px)"
            templateColumns="repeat(10000, 400px)"
        >
            <Card overflow={"hidden"} bgColor="gray">
                <CardHeader>
                    <Heading size="sm" h={0}>
                        1/31
                    </Heading>
                </CardHeader>
                <CardBody
                    display="grid"
                    gridTemplateColumns={"repeat(2, 200px)"}
                    h={120}
                    w={60}
                >
                    <Text
                        fontSize={12}
                        textAlign="left"
                        textOverflow="ellipsis"
                    >
                        I think that students would benefit from learning at
                        home,because they wont have to change and get up early
                        in the morning to shower and do there hair. taking only
                        classes helps them because at there house theyll be pay
                        more attention. they will be comfortable at home.\n\nThe
                        hardest part of school is getting ready. you wake up go
                        brush your teeth and go to your closet and look at your
                        cloths. after you think you picked a outfit u go look in
                        the mirror and youll either not like it or you look and
                        see a stain. Then youll have to change. with the online
                        classes you can wear anything and stay home and you wont
                        need to stress about what to wear.\n\nmost students
                        usually take showers before school. they either take it
                        before they sleep or when they wake up. some students do
                        both to smell good. that causes them do miss the bus and
                        effects on there lesson time cause they come late to
                        school. when u have online classes u wont need to miss
                        lessons cause you can get everything set up and go take
                        a shower and when u get out your ready to go.\n\nwhen
                        your home your comfortable and you pay attention. it
                        gives then an advantage to be smarter and even pass
                        there classmates on class work. public schools are
                        difficult even if you try. some teacher dont know how to
                        teach it in then way that students understand it. that
                        causes students to fail and they may repeat the class.
                    </Text>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignContent="center"
                    >
                        <svg width={100} height={100}>
                            <Group top={50} left={50}>
                                <RadarAxis
                                    width={100}
                                    height={100}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                    }}
                                />
                                <RadarMark
                                    data={history[0]}
                                    color={"orange"}
                                    width={100}
                                    height={100}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                    }}
                                />
                            </Group>
                        </svg>
                    </Box>
                </CardBody>
                <CardFooter ml="250">
                    <Button mb={0} w={70} h={8}>
                        More
                    </Button>
                </CardFooter>
            </Card>
            <Card overflow={"hidden"} bgColor="lightgray">
                <CardHeader>
                    <Heading size="sm" h={0}>
                        1/31
                    </Heading>
                </CardHeader>
                <CardBody
                    display="grid"
                    gridTemplateColumns={"repeat(2, 200px)"}
                    h={120}
                    w={60}
                >
                    <Text
                        fontSize={12}
                        textAlign="left"
                        textOverflow="ellipsis"
                    >
                        I think that students would benefit from learning at
                        home,because they wont have to change and get up early
                        in the morning to shower and do there hair. taking only
                        classes helps them because at there house theyll be pay
                        more attention. they will be comfortable at home.\n\nThe
                        hardest part of school is getting ready. you wake up go
                        brush your teeth and go to your closet and look at your
                        cloths. after you think you picked a outfit u go look in
                        the mirror and youll either not like it or you look and
                        see a stain. Then youll have to change. with the online
                        classes you can wear anything and stay home and you wont
                        need to stress about what to wear.\n\nmost students
                        usually take showers before school. they either take it
                        before they sleep or when they wake up. some students do
                        both to smell good. that causes them do miss the bus and
                        effects on there lesson time cause they come late to
                        school. when u have online classes u wont need to miss
                        lessons cause you can get everything set up and go take
                        a shower and when u get out your ready to go.\n\nwhen
                        your home your comfortable and you pay attention. it
                        gives then an advantage to be smarter and even pass
                        there classmates on class work. public schools are
                        difficult even if you try. some teacher dont know how to
                        teach it in then way that students understand it. that
                        causes students to fail and they may repeat the class.
                    </Text>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignContent="center"
                    >
                        <svg width={100} height={100}>
                            <Group top={50} left={50}>
                                <RadarAxis
                                    width={100}
                                    height={100}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                    }}
                                />
                                <RadarMark
                                    data={history[0]}
                                    color={"orange"}
                                    width={100}
                                    height={100}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                    }}
                                />
                            </Group>
                        </svg>
                    </Box>
                </CardBody>
                <CardFooter ml="250">
                    <Button mb={0} w={70} h={8}>
                        More
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size="md">1/32 </Heading>
                </CardHeader>
                <CardBody mb={10}>
                    <Text>hi</Text>
                </CardBody>
                <CardFooter>
                    <Button>More</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size="md">1/32 </Heading>
                </CardHeader>
                <CardBody>
                    <Text>hi</Text>
                </CardBody>
                <CardFooter>
                    <Button>More</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size="md">1/32 </Heading>
                </CardHeader>
                <CardBody>
                    <Text>hi</Text>
                </CardBody>
                <CardFooter>
                    <Button>More</Button>
                </CardFooter>
            </Card>
        </SimpleGrid>
    );
}
