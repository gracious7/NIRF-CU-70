// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import ImageArchitect1 from "assets/img/ImageArchitect1.png";
import ImageArchitect2 from "assets/img/ImageArchitect2.png";
import ImageArchitect3 from "assets/img/ImageArchitect3.png";
import GraphImage from "assets/img/graph-img.png";
import "../LandingPage/LandingPage.css"
import nirflogo from "../../assets/img/avatars/nirf_logo.png"
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import "../../styles.css";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import SearchBar from "./LandingSb";
import colleges from "../../assets/data/colleges.json"

function LandingPage() {
  const { colorMode } = useColorMode();
  let cardColor = "#ffffff";

  if (colorMode === "dark") {
    cardColor = "#0f183c";
  }

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");
  

  //College Array


  //Academic Years for NIRF Ranking 
  const dateAndLink = [
    {
      date: "2016",
      link: "#"
    },
    {
      date: "2017",
      link: "#"
    },
    {
      date: "2018",
      link: "#"
    },
    {
      date: "2019",
      link: "#"
    },
    {
      date: "2020",
      link: "#"
    },
    {
      date: "2021",
      link: "#"
    },
    {
      date: "2022",
      link: "#"
    },
    {
      date: "2023",
      link: "#"
    },
  ];

  const history = useHistory();
  const getRank = async (year) => {
    console.log(year);
    const response = await axios.get(`http://localhost:8000/api/get_ranks?year=${year}`);
    const rows = response.data.message;
    history.push('/table', { rows: rows, name: year });
  }

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
      <Flex
        mb="24px"
        maxH="330px"
        justifyContent={{ sm: "center", md: "space-between" }}
        align="center"
        backdropFilter="blur(21px)"
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
        border="1.5px solid"
        borderColor={borderProfileColor}
        bg={bgProfile}
        p="24px"
        borderRadius="20px"
      >
        <SearchBar colleges={colleges} />
        <button>Search</button>
      </Flex>
      <div style={{ marginTop: "20px" }}>
      <Card p="4">
        <Flex alignItems="center">
          <Image src={nirflogo} alt="About NIRF" boxSize="200px" objectFit="contain" mr="8" ml="4"  />

          <Box>
            <Text fontSize="lg" color={textColor} fontWeight="bold" fontSize="25px">
              ABOUT NIRF
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="400">
              Education Excellence Index
            </Text>

            <Text mt="4">
            The National Institutional Ranking Framework (NIRF) is an initiative by the Government of India to rank higher education institutions in the country. Launched in 2015, NIRF evaluates institutions based on parameters like teaching, learning, research, and overall excellence. It aims to provide valuable insights to students, parents, and policymakers, helping them make informed decisions about educational institutions. NIRF rankings cover various categories such as universities, engineering, management, pharmacy, and overall institutions. By promoting healthy competition among institutions, NIRF encourages academic excellence, fosters innovation, and contributes to the overall growth and quality enhancement of higher education in India.
            </Text>
          </Box>
        </Flex>
      </Card>
    </div>
      <div className="year-heading" style={{paddingTop:"20px"}}>NIRF Rankings by Academic Year</div>
      <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap="22px">
        {dateAndLink.map((el, key) => {
          return (
            <a key={key} style={{ cursor: 'pointer' }}>
              <Card
                p="16px"
                bg={`url(${GraphImage}), ${cardColor}`}
                zIndex={-10}

                backgroundSize="contain" // Set the background size to contain
                backgroundRepeat="no-repeat" // Prevent background image from repeating
                // You can also set a fixed height for the Card to control its size
                minHeight="20px"
                transition="transform 0.2s, box-shadow 0.2s" // Add a transition effect

                _hover={{
                  transform: "scale(1.05)", // Increase size on hover
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Increase shadow on hover
                }}
                onClick={() => getRank(el.date)}
              >
                <CardHeader p="12px 5px">
                  <div className="year">
                    <Text fontSize="2xl" color={colorMode === "light" ? "#555555" : "#ffffff"} fontWeight="bold">
                      {el.date}
                    </Text>
                  </div>
                </CardHeader>
                {/* <CardBody px="5px">
                
            </CardBody> */}
              </Card>
            </a>
          )

        })}

      </Grid>
     
      <Card p="16px" my="24px">
        <CardHeader p="12px 5px" mb="12px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              ABOUT NIRF
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="400">
              Education Excellence Index
            </Text>
          </Flex>
        </CardHeader>
        <CardBody px="5px">
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap="24px"
          >
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={ImageArchitect1} borderRadius="15px" />
                <Box
                  w="100%"
                  h="100%"
                  position="absolute"
                  top="0"
                  borderRadius="15px"
                  bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                ></Box>
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.400" fontWeight="600" mb="10px">
                  Project #1
                </Text>
                <Text
                  fontSize="xl"
                  color={textColor}
                  fontWeight="bold"
                  mb="10px"
                >
                  Modern
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400" mb="20px">
                  As Uber works through a huge amount of internal management
                  turmoil.
                </Text>
                <Flex justifyContent="space-between">
                  <Button variant="dark" minW="110px" h="36px">
                    VIEW ALL
                  </Button>
                  <AvatarGroup size="xs">
                    <Avatar name="Ryan Florence" src={avatar6} />
                    <Avatar name="Segun Adebayo" src={avatar2} />
                    <Avatar name="Kent Dodds" src={avatar3} />
                    <Avatar name="Prosper Otemuyiwa" src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={ImageArchitect2} borderRadius="15px" />
                <Box
                  w="100%"
                  h="100%"
                  position="absolute"
                  top="0"
                  borderRadius="15px"
                  bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                ></Box>
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.400" fontWeight="600" mb="10px">
                  Project #2
                </Text>
                <Text
                  fontSize="xl"
                  color={textColor}
                  fontWeight="bold"
                  mb="10px"
                >
                  Scandinavian
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400" mb="20px">
                  Music is something that every person has his or her own
                  specific opinion about.
                </Text>
                <Flex justifyContent="space-between">
                  <Button variant="dark" minW="110px" h="36px">
                    VIEW ALL
                  </Button>
                  <AvatarGroup size="xs">
                    <Avatar name="Ryan Florence" src={avatar6} />
                    <Avatar name="Segun Adebayo" src={avatar2} />
                    <Avatar name="Kent Dodds" src={avatar3} />
                    <Avatar name="Prosper Otemuyiwa" src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={ImageArchitect3} borderRadius="15px" />
                <Box
                  w="100%"
                  h="100%"
                  position="absolute"
                  top="0"
                  borderRadius="15px"
                  bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                ></Box>
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.400" fontWeight="600" mb="10px">
                  Project #3
                </Text>
                <Text
                  fontSize="xl"
                  color={textColor}
                  fontWeight="bold"
                  mb="10px"
                >
                  Minimalist
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400" mb="20px">
                  Different people have different taste, especially various
                  types of music.
                </Text>
                <Flex justifyContent="space-between">
                  <Button variant="dark" minW="110px" h="36px">
                    VIEW ALL
                  </Button>
                  <AvatarGroup size="xs">
                    <Avatar name="Ryan Florence" src={avatar6} />
                    <Avatar name="Segun Adebayo" src={avatar2} />
                    <Avatar name="Kent Dodds" src={avatar3} />
                    <Avatar name="Prosper Otemuyiwa" src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Button
              p="0px"
              bg="transparent"
              border="1px solid lightgray"
              borderRadius="15px"
              minHeight={{ sm: "200px", md: "100%" }}
            >
              <Flex direction="column" justifyContent="center" align="center">
                <Icon as={FaPlus} color={textColor} fontSize="lg" mb="12px" />
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Create a New Project
                </Text>
              </Flex>
            </Button>
          </Grid>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default LandingPage;