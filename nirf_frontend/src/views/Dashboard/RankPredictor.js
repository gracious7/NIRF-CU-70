import { useState } from "react";
import axios from 'axios';
import { useColorMode } from "@chakra-ui/system";

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
	const theme = useColorMode();
	const [predicted_rank, setPredictedRank] = useState(null);

	const handle = (e) => {
		const tmp = { ...form };
		tmp[e.target.name] = e.target.value;

		setForm(tmp);
	}

	const predict = async () => {
		const features = {'TLR': 0, 'RPC': 0, 'GO': 0, 'OI': 0, 'PR': 0}
		features['TLR'] = parseFloat(form.ss) + parseFloat(form.fsr) + parseFloat(form.fqe) + parseFloat(form.fru);
		features['RPC'] = parseFloat(form.pu) + parseFloat(form.qp) + parseFloat(form.ipr) + parseFloat(form.fppp);
		features['GO'] = parseFloat(form.gph) + parseFloat(form.gue) + parseFloat(form.gms) + parseFloat(form.gphd);
		features['OI'] = parseFloat(form.rd) + parseFloat(form.wd) + parseFloat(form.escs) + parseFloat(form.pcs);
		features['PR'] = parseFloat(form.pr);

		const token = localStorage.getItem('token');

		const response = await axios.post('http://localhost:8000/api/predict_rank', {token: token, features: features}, {
			headers: {
				"Content-type": "application/json"
			}
		});
		console.log(response);
		setPredictedRank(response.data.message);
	}
	return (
		<>
			<center>
				<div style={{ marginTop: "140px", height: "550px", width: "800px", position: "relative", marginRight: "150px", backgroundColor: theme.colorMode === "light" ? "#ffffff" : "#0f183c" }} >
					<div style={{ fontWeight: "bold", fontSize: "25px" }}>
						Predict Your Rank
					</div>
					<div style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}>
						<div style={{ marginBottom: "10px" }}>
							<div style={{ fontWeight: "bold", fontSize: "15px" }}>
								TLR(100)
							</div>
							<div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
								<div style={{ display: "flex" }}>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>SS(20)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="ss" />
									</div>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>FSR(30)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="fsr" />
									</div>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>FQE(20)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="fqe" />
									</div>
									<div style={{ flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>FRU(30)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="fru" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}>
						<div style={{ marginBottom: "10px" }}>
							<div style={{ fontWeight: "bold", fontSize: "15px" }}>
								RPC(100)
							</div>
							<div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
								<div style={{ display: "flex" }}>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>PU(35)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="pu" />
									</div>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>QP(40)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="qp" />
									</div>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>IPR(15)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="ipr" />
									</div>
									<div style={{ flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>FPPP(10)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="fppp" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}>
						<div style={{ marginBottom: "10px" }}>
							<div style={{ fontWeight: "bold", fontSize: "15px" }}>
								GO(100)
							</div>
							<div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
								<div style={{ display: "flex" }}>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>GPH(40)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="gph" />
									</div>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>GUE(15)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="gue" />
									</div>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>GMS(25)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="gms" />
									</div>
									<div style={{ flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>GPHD(20)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="gphd" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style={{ left: "0", top: "50px", bottom: "20px", width: "100%" }}>
						<div style={{ marginBottom: "10px" }}>
							<div style={{ fontWeight: "bold", fontSize: "15px" }}>
								OI(100)
							</div>
							<div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
								<div style={{ display: "flex" }}>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>RD(30)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="rd" />
									</div>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>WD(30)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="wd" />
									</div>
									<div style={{ marginRight: "10px", flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>ESCS(20)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="escs" />
									</div>
									<div style={{ flex: "1" }}>
										<label style={{ fontWeight: "bold", fontSize: "10px", display: "block" }}>PCS(20)</label>
										<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "100%", color: 'black' }} onChange={(e) => handle(e)} name="pcs" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style={{ left: "0", top: "50px", bottom: "20px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
						<div style={{ border: "1px solid #ccc", padding: "10px", width: "calc(100% - 20px)" }}>
							<div style={{ marginBottom: "10px", textAlign: "center" }}>
								<div style={{ fontWeight: "bold", fontSize: "15px" }}>
									PR(100)
								</div>
								<input type="text" style={{ backgroundColor: "#eeeeee", padding: "5px", width: "25%", color: 'black' }} onChange={(e) => handle(e)} name="pr" />
							</div>
						</div>
					</div>
					<button onClick={predict} style={buttonStyles}>
						Submit
					</button>
					{predicted_rank !== null && <div>
						Your predicted rank: {predicted_rank}
					</div>}
				</div>
			</center>
		</>
	);
}
export default RankPredictor;