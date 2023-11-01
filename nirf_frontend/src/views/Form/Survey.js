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
// Custom components
import Card from "components/Card/Card";
// import searchicon from ".../assets/img/avatars/searchicon.png";
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

import CollegeSearch from "./CollegeSearch";

const colleges = [
  { id: 1, name: 'Harvard University' },
  { id: 2, name: 'Stanford University' },
  { id: 3, name: 'MIT' },
  // Add more colleges to the array
];

function Survey() {
  const { colorMode } = useColorMode();

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const searchBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    maxWidth: '300px', // Set a maximum width for the input field
  };

  const searchIconStyles = {
    position: 'absolute',
    left: '10px', // Adjust the left position of the search icon
  };

  const inputStyles = {
    paddingLeft: '30px', // Ensure some space for the search icon
    width: '100%',
  };
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
      {/* <div className="text-[red] font-bold texth1">Hello </div> */}
      <div>
        <CollegeSearch colleges={colleges} />
      </div>

      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap="22px">
        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              TLR
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="sm" color="gray.400" fontWeight="600" mb="20px">
                SS
              </Text>

              <Flex align="center" mb="20px">
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.400"
                  fontWeight="400"
                  w={500}
                >
                  NT: Total number of UG and PG students.
                </Text>

                <input />
                <input />
              </Flex>
              <Text
                fontSize="sm"
                color="gray.400"
                fontWeight="600"
                m="6px 0px 20px 0px"
              >
                APPLICATION
              </Text>
              <Flex align="center" mb="20px">
                <Switch colorScheme="blue" me="10px" />
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="blue" me="10px" />
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.400"
                  fontWeight="400"
                >
                  Monthly product changes
                </Text>
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="blue" me="10px" />
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.400"
                  fontWeight="400"
                >
                  Subscribe to newsletter
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="md" color="gray.400" fontWeight="400" mb="30px">
                Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the
                answer is no. If two equally difficult paths, choose the one
                more painful in the short term (pain avoidance is creating an
                illusion of equality).
              </Text>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Full Name:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  Esthera Jackson
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Mobile:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  (44) 123 1234 123
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Email:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  esthera@simmmple.com
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Location:{" "}
                </Text>
                <Text fontSize="md" color="gray.400" fontWeight="400">
                  United States
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Social Media:{" "}
                </Text>
                <Flex>
                  <Link
                    href="#"
                    color={iconColor}
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "blue.500" }}
                  >
                    <Icon as={FaFacebook} />
                  </Link>
                  <Link
                    href="#"
                    color={iconColor}
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "blue.500" }}
                  >
                    <Icon as={FaInstagram} />
                  </Link>
                  <Link
                    href="#"
                    color={iconColor}
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "blue.500" }}
                  >
                    <Icon as={FaTwitter} />
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Conversations
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column" w="100%">
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src={avatar2}
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="400">
                      Hi! I need more information...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-effects">
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color={iconColor}
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src={avatar3}
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="400">
                      Awesome work, can you change...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-effects">
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color={iconColor}
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src={avatar4}
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="400">
                      Have a great afternoon...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-effects">
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color={iconColor}
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src={avatar5}
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="400">
                      About files I can...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-effects">
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color={iconColor}
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src={avatar6}
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="400">
                      About files I can...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-effects">
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color={iconColor}
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>

    </Flex>
  );
}

export default Survey;
