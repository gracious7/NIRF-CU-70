function RankPredictor() {
    return (
        <>
            <center>
                <form style={{ marginTop: "140px", backgroundColor: "#ffffff", height: "200px", width: "800px", position: "relative", marginRight: "160px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                        Predict Your Rank
                    </div>
                    <div style={{ position: "absolute", left: "0", top: "50px", bottom: "20px" }}>
                        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                TLR
                            </div>
                            <div style={{ display: "flex", marginTop: "10px" }}>
                                <div style={{ position: "relative", marginRight: "10px" }}>
                                    <label style={{ position: "absolute", top: "-15px", fontWeight: "bold", fontSize: "10px" }}>SS</label>
                                    <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px" }} />
                                </div>
                                <div style={{ position: "relative", marginRight: "10px" }}>
                                    <label style={{ position: "absolute", top: "-15px", fontWeight: "bold", fontSize: "10px" }}>FSR</label>
                                    <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px" }} />
                                </div>
                                <div style={{ position: "relative", marginRight: "10px" }}>
                                    <label style={{ position: "absolute", top: "-15px", fontWeight: "bold", fontSize: "10px" }}>FQE</label>
                                    <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px" }} />
                                </div>
                                <div style={{ position: "relative" }}>
                                    <label style={{ position: "absolute", top: "-15px", fontWeight: "bold", fontSize: "10px" }}>FRU</label>
                                    <input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>


            </center>
        </>
    );
}
export default RankPredictor;