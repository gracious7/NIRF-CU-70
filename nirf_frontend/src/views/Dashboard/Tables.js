// Chakra imports
import {
  Box,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  useColorModeValue
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { tablesProjectData, tablesTableData } from "variables/general";
import axios from 'axios';

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const history = useHistory();

  const token = localStorage.getItem('token');
  const rank = localStorage.getItem('rank');
  const score = localStorage.getItem('score');
  const [graphs, setGraphs] = useState({});
  const [reqFeatures, setReqFeatures] = useState({'TLR': 0, 'RPC': 0, 'GO': 0, 'OI': 0, 'PR': 0})

  const notAuth = !token || !rank || !score;

  if (notAuth) {
    history.push('/auth/signin');
  }

  const get_overall_performance = async (features) => {
    const response = await axios.post('http://localhost:8000/api/get_overall_performance', { token: token, reqFeatures: features});
    setGraphs(response.data.graphs);
  }

  useEffect(() => {
    get_overall_performance({'TLR': 1, 'RPC': 1, 'GO': 1, 'OI': 1, 'PR': 1});
  }, []);

  const handle = (e) => {
    reqFeatures[e.target.value] = e.target.checked ? 1 : 0;
  }

  const plot = () => {
    get_overall_performance(reqFeatures);
  }

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <div style={{ display: "flex", gap: '100px' }}>
            <div>
              <input type="checkbox" onChange={(e) => handle(e)} name="features" value="TLR" /> TLR
            </div>
            <div>
              <input type="checkbox" onChange={(e) => handle(e)} name="features" value="RPC" /> RPC
            </div>
            <div>
              <input type="checkbox" onChange={(e) => handle(e)} name="features" value="GO" /> GO
            </div>
            <div>
              <input type="checkbox" onChange={(e) => handle(e)} name="features" value="OI" /> OI
            </div>
            <div>
              <input type="checkbox" onChange={(e) => handle(e)} name="features" value="PR" /> PR
            </div>
          </div>
          <div>
            <Button onClick={plot}>Plot</Button>
          </div>
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Scores
          </Text>
        </CardHeader>
        <CardBody>
          <Box minH="300px">
            {graphs.all_features !== "" && <img src={`data:image/png;base64,${graphs.all_features}`} />}
            {/* <LineChart
              chartData={lineChartData}
              chartOptions={lineChartOptions}
            /> */}
          </Box>
          {/* <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400" >
                <Th pl="0px" borderColor={borderColor} color="gray.400" >
                  Author
                </Th>
                <Th borderColor={borderColor} color="gray.400" >Function</Th>
                <Th borderColor={borderColor} color="gray.400" >Status</Th>
                <Th borderColor={borderColor} color="gray.400" >Employed</Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesTableData.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    name={row.name}
                    logo={row.logo}
                    email={row.email}
                    subdomain={row.subdomain}
                    domain={row.domain}
                    status={row.status}
                    date={row.date}
                    isLast={index === arr.length - 1 ? true : false}
                    key={index}
                  />
                );
              })}
            </Tbody>
          </Table> */}

        </CardBody>
      </Card>
      <Card
        my="22px"
        overflowX={{ sm: "scroll", xl: "hidden" }}
        pb="0px"
      >
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Projects Table
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                <Th pl="0px" color="gray.400" borderColor={borderColor}>
                  Companies
                </Th>
                <Th color="gray.400" borderColor={borderColor}>Budget</Th>
                <Th color="gray.400" borderColor={borderColor}>Status</Th>
                <Th color="gray.400" borderColor={borderColor}>Completion</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesProjectData.map((row, index, arr) => {
                return (
                  <TablesProjectRow
                    name={row.name}
                    logo={row.logo}
                    status={row.status}
                    budget={row.budget}
                    progression={row.progression}
                    isLast={index === arr.length - 1 ? true : false}
                    key={index}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
