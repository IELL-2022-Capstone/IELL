import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
  Text
} from "@chakra-ui/react";
import RadarChart from "./RadarChart";
import { useEffect, useState } from "react";
type Data = [string, ...number[]];
export default function History(data: any) {
  return (
    <SimpleGrid spacing={4} templateColumns="repeat(10000, 400px)">
      <Card>
        <CardHeader>
          <Heading size="md">1/32 </Heading>
        </CardHeader>
        <CardBody>
          <Text>hi</Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
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
          <Button>View here</Button>
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
          <Button>View here</Button>
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
          <Button>View here</Button>
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
          <Button>View here</Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}
