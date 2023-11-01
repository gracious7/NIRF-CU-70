import React, { useState } from "react";

function CalculateScores({ formState }) {
  // Extract data from formState
  const {
    TLR: { SS, FSR, FQE, FRU },
    RPC: {},
    GO: { GMS, GPH, GPHD, GUE },
    OI: { ESCS, PCS, RD, WD },
    PR: { PU },

    collegeName,
  } = formState;

  // Calculate SS
  const SS =
    (parseInt(SS.NT) / parseInt(SS.totalUGPG)) * 15 +
    (parseInt(SS.NP) / parseInt(SS.totPhd)) * 5;

  // Calculate FSR
  const FSR = 30 * ((10 * parseInt(FSR.F)) / parseInt(FSR.N));

  // Calculate FQE
  const FQE =
    (10 * parseInt(FQE.F)) / 95 +
    3 * Math.min(3 * parseInt(FQE.F1), 1) +
    3 * Math.min(3 * parseInt(FQE.F2), 1) +
    4 * Math.min(3 * parseInt(FQE.F3), 1);

  // Calculate FRU
  const FRU =
    7.5 * (parseInt(FRU.BC) / (parseInt(FRU.BO) + parseInt(FRU.BC))) +
    22.5 * (parseInt(FRU.BO) / (parseInt(FRU.BO) + parseInt(FRU.BC)));

  // Calculate RPC
  const PU = (35 * parseInt(PU.Perception)) / parseInt(PU.FRQ);
  const QP =
    (20 * parseInt(PU.CC)) / parseInt(PU.FRQ) +
    (20 * parseInt(PU.TOP25P)) / parseInt(PU.P);
  const IPR = 10 * parseInt(PU.PG) + 5 * parseInt(PU.PP);
  const FPPP = 7.5 * parseInt(PU.FPPP.RF) + 2.5 * parseInt(PU.FPPP.CF);
  const RPC = PU + QP + IPR + FPPP;

  // Calculate GO
  const GPH = (parseInt(GPH.NP) / 100 + parseInt(GPH.NHS) / 100) * 40;
  const GUE = 15 * Math.min(parseInt(GUE.NG) / 80, 1);
  const GMS = 25 * parseInt(GMS.MS);
  const GPHD = 20 * parseInt(GPHD.NPHD);
  const GO = GPH + GUE + GMS + GPHD;

  // Calculate OI
  const RD =
    (25 * parseInt(RD.OS)) / parseInt(RD.N) +
    (5 * parseInt(RD.OC)) / parseInt(RD.N);
  const WD =
    30 * (parseInt(WD.NWS) / parseInt(WD.N)) +
    75 * (parseInt(WD.NWF) / parseInt(WD.N));
  const ESCS = (20 * parseInt(ESCS.NCSC)) / parseInt(ESCS.N);
  const PCS = parseInt(PCS.totPCS);
  const OI = RD + WD + ESCS + PCS;

  // Calculate TLR
  const TLR = SS + FSR + FQE + FRU;

  // Calculate PR
  const PR = PU;

  return (
    <div>
      <p>TLR: {TLR}</p>
      <p>RPC: {RPC}</p>
      <p>GO: {GO}</p>
      <p>OI: {OI}</p>
      <p>PR: {PR}</p>
      <p>College Name: {collegeName}</p>
    </div>
  );
}

function Calculate() {
  // Replace the sampleData with your actual formState
  const sampleData = {
    // Insert your formState data here
  };

  return (
    <div>
      <h1>Calculate Scores</h1>
      <CalculateScores formState={sampleData} />
    </div>
  );
}

export default Calculate;
