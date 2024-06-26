import { useState } from "react";
import axios from "axios";

const buttonStyles = {
  backgroundColor: "#0074d9", // Note the single quotes around the color value
  border: "none",
  color: "white",
  padding: "10px 20px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "10px",
  cursor: "pointer",
  borderRadius: "5px",
};

import { useColorMode } from "@chakra-ui/system";

function RankPredictor() {
  const theme = useColorMode();
  const [form, setForm] = useState({
    ss: 0,
    fsr: 0,
    fqe: 0,
    fru: 0,
    pu: 0,
    qp: 0,
    ipr: 0,
    fppp: 0,
    gph: 0,
    gue: 0,
    gms: 0,
    gphd: 0,
    rd: 0,
    wd: 0,
    escs: 0,
    pcs: 0,
    pr: 0,
  });
  const handle = (e) => {
    const tmp = { ...form };
    tmp[e.target.name] = e.target.value;

    setForm(tmp);
  };

  const predict = async () => {
    const features = { TLR: 0, RPC: 0, GO: 0, OI: 0, PR: 0 };
    features["TLR"] = form.ss + form.fsr + form.fqe + form.fru;
    features["RPC"] = form.pu + form.qp + form.ipr + form.fppp;
    features["GO"] = form.gph + form.gue + form.gms + form.gphd;
    features["OI"] = form.rd + form.wd + form.escs + form.pcs;
    features["PR"] = form.pr;

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:8000/api/predict_rank",
      { token: token, features: features },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    console.log(response);
  };
  return (
    <>
      <center>
        <div
          style={{
            marginTop: "105px",
            backgroundColor: "#ffffff",
            height: "550px",
            width: "65%",
            position: "relative",
            fontFamily: "poppins",
            zIndex: "-5",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "25px",
              marginBottom: "5px",
            }}
          >
            Predict Your Rank
          </div>
          <div
            style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}
          >
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                TLR(100)
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  width: "calc(100% - 20px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ flex: "1", marginBottom: "5px" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      SS(20)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="ss"
                    />
                  </div>
                  <div style={{ flex: "1", marginBottom: "5px" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      FSR(30)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="fsr"
                    />
                  </div>
                  <div style={{ flex: "1", marginBottom: "5px" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      FQE(20)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="fqe"
                    />
                  </div>
                  <div style={{ flex: "1", marginBottom: "5px" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      FRU(30)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="fru"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}
          >
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                RPC(100)
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  width: "calc(100% - 20px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      PU(35)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="pu"
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      QP(40)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="qp"
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      IPR(15)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="ipr"
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      FPPP(10)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="fppp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}
          >
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                GO(100)
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  width: "calc(100% - 20px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      GPH(40)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="gph"
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      GUE(15)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="gue"
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      GMS(25)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "100%",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="gphd"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}
          >
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                OI(100)
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  width: "calc(100% - 20px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      RD(30)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="ss"
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      WD(30)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="ss"
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      ESCS(20)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="ss"
                    />
                  </div>
                  <div style={{ flex: "1" }}>
                    <label
                      style={{
                        fontWeight: "bold",
                        fontSize: "10px",
                        display: "block",
                      }}
                    >
                      PCS(20)
                    </label>
                    <input
                      type="text"
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "5px",
                        width: "160px",
                      }}
                      onChange={(e) => handle(e)}
                      name="ss"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              left: "0",
              top: "50px",
              bottom: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "calc(100% - 20px)",
              }}
            >
              <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  PR(100)
                </div>
                <input
                  type="text"
                  style={{
                    backgroundColor: "#eeeeee",
                    padding: "5px",
                    width: "160px",
                  }}
                  onChange={(e) => handle(e)}
                  name="ss"
                />
              </div>
            </div>
          </div>
          <button onClick={predict} style={buttonStyles}>
            Submit
          </button>
        </div>
      </center>
    </>
  );
}
export default RankPredictor;
