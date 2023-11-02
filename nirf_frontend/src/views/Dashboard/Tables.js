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
  useColorModeValue,
  useColorMode
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
import CollegeSearch from "views/Form/CollegeSearch";

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const history = useHistory();
  const theme = useColorMode();

  const token = localStorage.getItem('token');
  const rank = localStorage.getItem('rank');
  const score = localStorage.getItem('score');
  const [graphs, setGraphs] = useState({});
  const [reqFeatures, setReqFeatures] = useState({ 'TLR': 0, 'RPC': 0, 'GO': 0, 'OI': 0, 'PR': 0 })
  const [compare, setCompare] = useState("");
  const [comparisonResult, setComparisonResult] = useState([]);
  const [comparisonGraph, setComparisonGraph] = useState();

  const notAuth = !token || !rank || !score;

  if (notAuth) {
    history.push('/auth/signin');
  }

  const type_required = ['SS', 'FSR', 'FQE', 'FRU', 'PU', 'QP', 'IPR', 'FPPP', 'GPH', 'GUE', 'GMS', 'GPHD', 'RD', 'WD', 'ESCS', 'PCS', 'PR']

  const get_overall_performance = async (features) => {
    const response = await axios.post('http://localhost:8000/api/get_overall_performance', { token: token, reqFeatures: features });
    setGraphs(response.data.graphs);
  }

  useEffect(() => {
    get_overall_performance({ 'TLR': 1, 'RPC': 1, 'GO': 1, 'OI': 1, 'PR': 1 });
  }, []);

  const handle = (e) => {
    reqFeatures[e.target.value] = e.target.checked ? 1 : 0;
  }

  const plot = () => {
    get_overall_performance(reqFeatures);
  }

  const compare_college = async () => {
    const response = await axios.post('http://localhost:8000/api/compare_college', { token: token, compare: compare }, {
      headers: {
        'Content-type': 'application/json'
      }
    });
    console.log(response.data.message);
    setComparisonResult(response.data.message);
    console.log(response.data.graphs);
    setComparisonGraph(response.data.graphs);
  }

  const [reqRank, setReqRank] = useState();
  const [recommendations, setRecommendation] = useState([]);
  const handlerecommend = (e) => {
    setReqRank(e.target.value);
  }

  const recommend = async () => {
    setRecommendation([]);
    const response = await axios.post('http://localhost:8000/api/recommend', { token: token, rank: reqRank }, {
      headers: {
        "Content-type": "application/json"
      }
    });
    console.log(response.data.message);
    setRecommendation(response.data.message)
  }

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card
        my="22px"
        // overflowX={{ sm: "scroll", xl: "hidden" }}
        pb="0px"
      >
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Get Recommendation
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction="row">
            <div>
              <input style={{ backgroundColor: theme.colorMode === "light" ? 'white' : '#0f183c', color: theme.colorMode === "light" ? 'black' : 'white' }} type="text" onChange={(e) => handlerecommend(e)} placeholder="Required Rank" />
            </div>
            <div>
              <Button onClick={recommend}>Get Recommendation</Button>
            </div>
          </Flex>
          <h2>{recommendations.length !== 0 && "Your recommendations in priority order: "}</h2>
          <p />
          <ul style={{ listStyle: 'circle' }}>
            {recommendations.map(result => (
              <>
                <li style={{ marginBottom: '10px' }}>
                  <span style={{textDecoration: 'underline'}}>{result[0]}</span>
                  <p />
                  -&gt; Solution: {result[1]}
                </li>
              </>
            ))}
          </ul>
        </CardBody>
      </Card>
      <Card
        my="22px"
        // overflowX={{ sm: "scroll", xl: "hidden" }}
        pb="0px"
      >
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Compare your college
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction="row">
            <div>
              Your College VS
              <CollegeSearch setClgName={setCompare} />
            </div>
            <div>
              <Button onClick={compare_college}>Compare</Button>
            </div>
          </Flex>
          <Flex direction="column">
            <div>
              <ul style={{ listStyle: 'circle' }}>
                {comparisonResult.map(result => (
                  <li>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {comparisonGraph && <img src={`data:image/png;base64,${comparisonGraph}`} />}
            </div>
          </Flex>
        </CardBody>
      </Card>
      <Card pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
              Overall Performance
            </Text>
          </Flex>
        </CardHeader>
        <CardHeader p="6px 0px 22px 0px">
          <div style={{ display: "flex", gap: '50px', flexWrap: 'wrap' }}>
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
            {type_required.map(type => (
              <div>
                <input type="checkbox" onChange={(e) => handle(e)} name="features" value={type} /> {type}
              </div>
            ))}
          </div>
          <div>
            <Button onClick={plot}>Plot</Button>
          </div>
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Scores
          </Text>
        </CardHeader>
        <CardBody>
          <Box minH="300px" width='fit-content'>
            {graphs.all_features !== "" && <img src={`data:image/png;base64,${graphs.all_features}`} />}
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
