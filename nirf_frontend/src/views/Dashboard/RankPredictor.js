import { useState } from "react";

const buttonStyles = {
    backgroundColor: '#0074d9', // Note the single quotes around the color value
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '10px',
    cursor: 'pointer',
    borderRadius: '5px'
  };
  
function RankPredictor() {

    const [form,setForm]=useState({
        ss:"0",
        fsr:"0",
        fqe:"0",
        fru:"0",
        pu:"0",
        qp:"0",
        ipr:"0",
        fppp:"0",
        gph:"0",
        gue:"0",
        gms:"0",
        gphd:"0",
        rd:"0",
        wd:"0",
        escs:"0",
        pcs:"0",
        pr:"0",
        
    })
    const handle = (e) =>{
       const tmp={...form};
       tmp[e.target.name]=e.target.value;
      
       setForm(tmp);
    }
    return (

        <>
            <center>
                <form style={{ marginTop: "140px", backgroundColor: "#ffffff", height: "550px", width: "800px", position: "relative", marginRight: "150px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                        Predict Your Rank
                    </div>
                    <div style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                TLR
                            </div>
                            <div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>SS</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="ss" />
                                    </div>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>FSR</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="fsr"/>
                                    </div>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>FQE</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }}onChange={(e)=>handle(e)} name="fqe" />
                                    </div>
                                    <div style={{ flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>FRU</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }}onChange={(e)=>handle(e)} name="fru" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                RPC
                            </div>
                            <div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>PU</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="pu"/>
                                    </div>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>QP</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="qp"/>
                                    </div>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>IPR</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="ipr"/>
                                    </div>
                                    <div style={{ flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>FPPP</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="fppp"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                GO
                            </div>
                            <div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>GPH</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }}onChange={(e)=>handle(e)} name="gph" />
                                    </div>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>GUE</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="gue"/>
                                    </div>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>GMS</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="gms"/>
                                    </div>
                                    <div style={{ flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>GPHD</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="gphd"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}>
                        <div style={{ marginBottom: "10px" }}>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                OI
                            </div>
                            <div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>RD</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }}onChange={(e)=>handle(e)} name="ss" />
                                    </div>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>WD</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }}onChange={(e)=>handle(e)} name="ss" />
                                    </div>
                                    <div style={{ marginRight: "10px", flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>ESCS</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }} onChange={(e)=>handle(e)} name="ss"/>
                                    </div>
                                    <div style={{ flex: "1" }}>
                                        <label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>PCS</label>
                                        <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%" }}onChange={(e)=>handle(e)} name="ss" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ left: "0", top: "50px", bottom: "20px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
                            <div style={{ marginBottom: "10px", textAlign: "center" }}>
                                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                    PR
                                </div>
                                <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "25%" }}onChange={(e)=>handle(e)} name="ss" />
                            </div>
                        </div>
                    </div>
                    <button style={buttonStyles}>
                        Submit
                    </button>
                </form>

            </center>
        </>
    );
}
export default RankPredictor;