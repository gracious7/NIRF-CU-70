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

function LandingPage() {
  const { colorMode } = useColorMode();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");

  const dateAndLink = [
    {
      date:"2016",
      link: "#"
    },
    {
      date:"2017",
      link: "#"
    },
    {
      date:"2018",
      link: "#"
    },
    {
      date:"2019",
      link: "#"
    },
    {
      date:"2020",
      link: "#"
    },
    {
      date:"2021",
      link: "#"
    },
    {
      date:"2022",
      link: "#"
    },
    {
      date:"2023",
      link: "#"
    },
  ];

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
      <Flex
        direction={{ sm: "column", md: "row" }}
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
        <Flex
          align="center"
          mb={{ sm: "10px", md: "0px" }}
          direction={{ sm: "column", md: "row" }}
          w={{ sm: "100%" }}
          textAlign={{ sm: "center", md: "start" }}
        >
          <Avatar
            me={{ md: "22px" }}
            src={avatar5}
            w="80px"
            h="80px"
            borderRadius="15px"
          />
          <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color={textColor}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              Alec Thompson
            </Text>
            <Text
              fontSize={{ sm: "sm", md: "md" }}
              color={emailColor}
              fontWeight="semibold"
            >
              alec@simmmple.com
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ sm: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}
        >
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ sm: "100%", lg: "135px" }}
              bg={colorMode === "dark" ? "navy.900" : "#fff"}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
              cursor="pointer"
            >
              <Icon color={textColor} as={FaCube} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                OVERVIEW
              </Text>
            </Flex>
          </Button>
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ lg: "135px" }}
              borderRadius="15px"
              justifyContent="center"
              py="10px"
              mx={{ lg: "1rem" }}
              cursor="pointer"
            >
              <Icon color={textColor} as={IoDocumentsSharp} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                TEAMS
              </Text>
            </Flex>
          </Button>
          <Button p="0px" bg="transparent" variant="no-effects">
            <Flex
              align="center"
              w={{ lg: "135px" }}
              borderRadius="15px"
              justifyContent="center"
              py="10px"
              cursor="pointer"
            >
              <Icon color={textColor} as={FaPenFancy} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                PROJECTS
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
      <div className="year-heading">NIRF Rankings by Academic Year</div>
      <Grid templateColumns={{ sm: "1fr", md:"repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap="22px">
        {dateAndLink.map((el, key)=>{
          return (
            <a key={key} href={`${el.link}`}>
            <Card
              p="16px"
              bg={`url(${GraphImage}), #ffffff`}

              backgroundSize="contain" // Set the background size to contain
              backgroundRepeat="no-repeat" // Prevent background image from repeating
              // You can also set a fixed height for the Card to control its size
              minHeight="20px"
              transition="transform 0.2s, box-shadow 0.2s" // Add a transition effect

                _hover={{
                  transform: "scale(1.05)", // Increase size on hover
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Increase shadow on hover
                }}
             >
            <CardHeader p="12px 5px">
              <div className="year">
                <Text fontSize="2xl" color="#555555" fontWeight="bold">
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
              Projects
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="400">
              Architects design houses
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
