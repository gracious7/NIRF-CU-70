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

import colleges from "../../assets/data/colleges.json";

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

  const [clgname, setClgName] = useState("");

  const [formData, setFormData] = useState({
    TLR: {
      SS: { NT: 0, totalUGPG: 0, NP: 0, totPhd: 0 },
      FSR: { F: 0, N: 0 },
      FQE: { FRA: 0, F1: 0, F2: 0, F3: 0 },
      FRU: { BC: 0, BO: 0 },
    },
    RPC: {
      PU: { P: 0, FRQ: 0 },
      QP: { CC: 0, TOP25P: 0 },
      IPR: { PG: 0, PP: 0 },
      FPPP: { RF: 0, CF: 0 },
    },
    GO: {
      GPH: { NP: 0, NHS: 0 },
      GUE: { NG: 0 },
      GMS: { MS: 0 },
      GPHD: { NPHD: 0 },
    },
    OI: {
      RD: { OS: 0, OC: 0 },
      WD: { NWS: 0, NWF: 0 },
      ESCS: { NESC: 0 },
      PCS: { totPCS: 0 },
    },
    PR: { PU: { Perception: 0 } },
  });

  const handleInputChange = (category, subCategory, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      collegeName: clgname,
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
    const computedMetrics = calculateMetrics(formData);
    console.log("Matrices are: ");
    console.log(computedMetrics);
  };

  function calculateMetrics(formData) {
    const TLR = {};
    const RPC = {};
    const GO = {};
    const OI = {};
    const PR = {};
    const result = {};

    // Extract the necessary data from formData
    const {
      TLR: TLRData,
      RPC: RPCData,
      GO: GOData,
      OI: OIData,
      PR: PRData,
      collegeName,
    } = formData;

    // TLR calculations
    const SS =
      (parseFloat(TLRData.SS.NT) / parseFloat(TLRData.SS.totalUGPG)) * 15 +
      (parseFloat(TLRData.SS.NP) / parseFloat(TLRData.SS.totPhd)) * 5;
    const FSR =
      30 * ((10 * parseFloat(TLRData.FSR.F)) / parseFloat(TLRData.FSR.N));
    const FQE =
      10 * (parseFloat(TLRData.FQE.FRA) / 95) +
      3 * Math.min(3 * parseFloat(TLRData.FQE.F1), 1) +
      3 * Math.min(3 * parseFloat(TLRData.FQE.F2), 1) +
      4 * Math.min(3 * parseFloat(TLRData.FQE.F3), 1);
    const FRU =
      7.5 *
        (parseFloat(TLRData.FRU.BC) /
          (parseFloat(TLRData.FRU.BO) + parseFloat(TLRData.FRU.BC))) +
      22.5 *
        (parseFloat(TLRData.FRU.BO) /
          (parseFloat(TLRData.FRU.BO) + parseFloat(TLRData.FRU.BC)));
    TLR.TLR = SS + FSR + FQE + FRU;

    // RPC calculations
    const PU = 35 * (parseFloat(RPCData.PU.P) / parseFloat(RPCData.PU.FRQ));
    const QP =
      20 * (parseFloat(RPCData.QP.CC) / parseFloat(RPCData.PU.FRQ)) +
      (20 * parseFloat(RPCData.QP.TOP25P)) / parseFloat(RPCData.PU.P);
    const IPR =
      10 * parseFloat(RPCData.IPR.PG) + 5 * parseFloat(RPCData.IPR.PP);
    const FPPP =
      7.5 * parseFloat(RPCData.FPPP.RF) + 2.5 * parseFloat(RPCData.FPPP.CF);
    RPC.RPC = PU + QP + IPR + FPPP;

    // GO calculations
    const GPH =
      (parseFloat(GOData.GPH.NP) / 100 + parseFloat(GOData.GPH.NHS) / 100) * 40;
    const GUE = 15 * Math.min(parseFloat(GOData.GUE.NG) / 80, 1);
    const GMS = 25 * parseFloat(GOData.GMS.MS);
    const GPHD = 20 * parseFloat(GOData.GPHD.NPHD);
    GO.GO = GPH + GUE + GMS + GPHD;

    // OI calculations
    const RD =
      25 * (parseFloat(OIData.RD.OS) / parseFloat(TLRData.FSR.N)) +
      5 * (parseFloat(OIData.RD.OC) / parseFloat(TLRData.FSR.N));
    const WD =
      30 * (parseFloat(OIData.WD.NWS) / parseFloat(TLRData.FSR.N)) +
      75 * (parseFloat(OIData.WD.NWF) / parseFloat(TLRData.FSR.N));
    const ESCS =
      20 * (parseFloat(OIData.ESCS.NESC) / parseFloat(TLRData.FSR.N));
    const PCS = parseFloat(OIData.PCS.totPCS);
    OI.OI = RD + WD + ESCS + PCS;

    // PR calculations
    PR.PR = parseFloat(PRData.PU.Perception);

    result.TLR = TLR;
    result.RPC = RPC;
    result.GO = GO;
    result.OI = OI;
    result.PR = PR;
    result.collegeName = collegeName;

    return result;
  }

  // Example usage:

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
      <div>
        <CollegeSearch setClgName={setClgName} />
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
              <div className="main-container">
                <div className="subopt">
                  <div className="subopt-txt">SS</div>
                </div>
                <div className="ip-section">
                  <div>
                    <div className="label-txt">
                      Total UG&PG student enrolled (
                      <div>
                        N<sub>T</sub>
                      </div>
                      )
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
                      Sanctioned approved intake in UG & PG
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange(
                          "TLR",
                          "SS",
                          "totalUGPG",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      Total students enrolled in PhD (
                      <div>
                        N<sub>P</sub>
                      </div>
                      )
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
                  <div>
                    <div className="label-txt">
                      Sanctioned approved intake in PhD
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "SS", "totPhd", e.target.value)
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
                    <div className="label-txt">Fulltime Faculty (F)</div>
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
                    <div className="label-txt">Total students (N)</div>
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
                    <div className="label-txt">
                      Total PhD Faculty (
                      <div>
                        F<sub>RA</sub>
                      </div>
                      )
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("TLR", "FQE", "FRA", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      Faculty Exp upto 8 yrs. (F1)
                    </div>
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
                    <div className="label-txt">
                      Faculty Exp b/w 8-15 yrs. (F2)
                    </div>
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
                    <div className="label-txt">
                      Faculty Exp more than 15 yrs. (F3)
                    </div>
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
                    <div className="label-txt">
                      Weighted no. of publications (P)
                    </div>
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
                      Maximum of nominal no. of Faculty (
                      <div>
                        F<sub>RQ</sub>
                      </div>
                      )
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
                    <div className="label-txt">
                      Total Citation Count prev. 3 yrs (CC)
                    </div>
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
                      Citation in top 25%ile avg. over past 3 yrs. (TOP25P)
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("RPC", "QP", "TOP25P", e.target.value)
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
                    <div className="label-txt">
                      No of patents granted in prev 3yrs. (PG)
                    </div>
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
                    <div className="label-txt">
                      Patents published in past 3yrs. (PP)
                    </div>
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
                    <div className="label-txt">
                      Avg. annual Research Funding earining (RF)
                    </div>
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
                    <div className="label-txt">
                      Avg. annual consultensy amount/faculty (CF)
                    </div>
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
                    <div className="label-txt">
                      % UG&PG students placed past 3yrs.(NP)
                    </div>
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
                      % UG&PG opted higher studies past 3yrs. (
                      <div>
                        N<sub>hs</sub>
                      </div>
                      )
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
                      <div>
                        N<sub>g</sub>
                      </div>
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
                    <div className="label-txt">
                      Median salary grads.(UG/PG) past 3yrs. (MS)
                    </div>
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
                      Avg. no of PhD grads. past 3 yrs. (
                      <div>
                        N<sub>phd</sub>
                      </div>
                      )
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
                    <div className="label-txt">Students from other states.</div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "RD", "OS", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="label-txt">
                      Students from other countries.
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "RD", "OC", e.target.value)
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
                      No of women students (
                      <div>
                        N<sub>WS</sub>
                      </div>
                      )
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
                      No of women faculty.
                      <div>
                        N<sub>WF</sub>
                      </div>
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
                      UG students with full fee rembursement. (
                      <div>
                        N<sub>esc</sub>
                      </div>
                      )
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "ESCS", "NESC", e.target.value)
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
                    <div className="label-txt">
                      Facilities for physically challenged st. (PCS)
                    </div>
                    <input
                      className="ip"
                      type="number"
                      placeholder="Enter value..."
                      onChange={(e) =>
                        handleInputChange("OI", "PCS", "totPCS", e.target.value)
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
                    <div className="label-txt">
                      Perception (based on survey)
                    </div>
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
                <button className="submit-btn" onClick={handleSubmit}>
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
