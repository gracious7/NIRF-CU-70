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

function LandingPage() {
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
          <div style={{ textAlign: "center", marginLeft: "500px" }}>
            <div style={searchBoxStyles}>
              {/* <img  alt="Search Icon" style={searchIconStyles} /> */}
              <input
                type="text"
                placeholder="Institute Name"
                style={inputStyles}
              />
            </div>
          </div>
        </Flex>
        <Flex
          direction={{ sm: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}
        ></Flex>
      </Flex>

      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap="22px">
        <Card p="16px">
        <div  >About Us</div>
          <div></div>
        </Card>
      </Grid>
    </Flex>
  );
}

export default LandingPage;
