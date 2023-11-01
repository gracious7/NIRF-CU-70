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
import React, { useState } from "react";
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
import "./Survey.css";

const colleges = [
  { id: 1, name: "Harvard University" },
  { id: 2, name: "Stanford University" },
  { id: 3, name: "MIT" },
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    maxWidth: "300px", // Set a maximum width for the input   field
  };

  const searchIconStyles = {
    position: "absolute",
    left: "10px", // Adjust the left position of the search icon
  };

  const inputStyles = {
    paddingLeft: "30px", // Ensure some space for the search icon
    width: "100%",
  };

  const [tab, setTab] = useState("TLR");

  const handleTab = (opt) => {
    setTab(opt);
  };

  const [formData, setFormData] = useState({
    TLR: {},
    RPC: {},
    GO: {},
    OI: {},
    PR: {},
  });

  const handleInputChange = (category, subCategory, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [subCategory]: {
          ...prevData[category][subCategory],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = () => {
    // You can access the formData object here and do whatever you want with it
    console.log(formData);
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
      <div>
        <CollegeSearch colleges={colleges} />
      </div>
      <div className="toggle-nav">
        <div
          className={`tog-opt ${tab === "TLR" ? "on" : ""}`}
          onClick={() => handleTab("TLR")}
        >
          TLR
        </div>
        <div
          className={`tog-opt ${tab === "RPC" ? "on" : ""}`}
          onClick={() => handleTab("RPC")}
        >
          RPC
        </div>
        <div
          className={`tog-opt ${tab === "GO" ? "on" : ""}`}
          onClick={() => handleTab("GO")}
        >
          GO
        </div>
        <div
          className={`tog-opt ${tab === "OI" ? "on" : ""}`}
          onClick={() => handleTab("OI")}
        >
          OI
        </div>
        <div
          className={`tog-opt ${tab === "PR" ? "on" : ""}`}
          onClick={() => handleTab("PR")}
        >
          PR
        </div>
      </div>

      {tab === "TLR" ? (
        <Grid templateColumns={{ sm: "1fr", xl: " 1fr" }} gap="22px">
          <Card p="16px">
            <div className="form">
              <div className="opt-name">Teaching, Learining & Resources</div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">SS</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">
                      N<sub>T</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "SS", "NT", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      N<sub>P</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "SS", "NP", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">FSR</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">F</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "FSR", "F", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">N</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "FSR", "N", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">FQE</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">F1</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "FQE", "F1", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">F2</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "FQE", "F2", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">F3</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "FQE", "F3", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">FRU</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">BC</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "FRU", "BC", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">BO</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "FRU", "BO", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      ) : (
        ""
      )}
      {tab === "RPC" ? (
        <Grid templateColumns={{ sm: "1fr", xl: " 1fr" }} gap="22px">
          <Card p="16px">
            <div className="form">
              <div className="opt-name">Research and Professional Practice</div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">PU</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">P</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("RPC", "PU", "P", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      F<sub>RQ</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("RPC", "PU", "FRQ", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">QP</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">CC</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("RPC", "QP", "CC", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      F<sub>RQ</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("RPC", "QP", "FRQ", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">TOP25P/P</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange(
                          "RPC",
                          "QP",
                          "TOP25P/P",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">IPR</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">PG</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("RPC", "IPR", "PG", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">PP</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("RPC", "IPR", "PP", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">FPPP</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">RF</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("RPC", "FPPP", "RF", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">CF</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("RPC", "FPPP", "CF", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      ) : (
        ""
      )}
      {tab === "GO" ? (
        <Grid templateColumns={{ sm: "1fr", xl: " 1fr" }} gap="22px">
          <Card p="16px">
            <div className="form">
              <div className="opt-name">Graduation Outcome</div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">GPH</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">NP</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("GO", "GPH", "NP", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      N<sub>p</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("GO", "GPH", "NP2", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      N<sub>hs</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("GO", "GPH", "NHS", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">GUE</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">
                      N<sub>g</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("GO", "GUE", "NG", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">GMS</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">MS</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("GO", "GMS", "MS", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">GPHD</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">
                      N<sub>phd</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("GO", "GPHD", "NPHD", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      ) : (
        ""
      )}
      {tab === "OI" ? (
        <Grid templateColumns={{ sm: "1fr", xl: " 1fr" }} gap="22px">
          <Card p="16px">
            <div className="form">
              <div className="opt-name">Outreach and Inclusivity</div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">RD</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">To calculate</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "RD", "TOCAL", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      F<sub>RQ</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "RD", "FRQ", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">WD</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">
                      N<sub>WS</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "WD", "NWS", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      N<sub>WF</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "WD", "NWF", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">ESCS</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">
                      N<sub>esc</sub>
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "ESCS", "NWS", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">PCS</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">F</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "PCS", "F", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      ) : (
        ""
      )}
      {tab === "PR" ? (
        <Grid templateColumns={{ sm: "1fr", xl: " 1fr" }} gap="22px">
          <Card p="16px">
            <div className="form">
              <div className="opt-name">Research and Professional Practice</div>
              <div>
                <div className="subopt">
                  <div className="subopt-txt">PU</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">Perception</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange(
                          "PR",
                          "PU",
                          "Perception",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </Card>
        </Grid>
      ) : (
        ""
      )}
    </Flex>
  );
}

export default Survey;
