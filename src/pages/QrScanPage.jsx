import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowBackRounded, QrCodeRounded } from "@mui/icons-material";

import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useRepair } from "../hooks/UseRepair";

function QRscanner() {

  const {findDevice} = useRepair()

  const hiddenLink = useRef(null)

  const config = {
    fps: 30,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1,
  };

  let qrScanner;

  useEffect(() => {
    qrScanner = new Html5Qrcode("reader");

    const onScanSuccess = (decodedText, decodedResult) => {
      const device = findDevice(decodedText)
      if(device){
        qrScanner.stop();
        hiddenLink.current.click()
      }else{
        alert("todo mal")
      }  
    };

    const onScanError = (e) => {

    };

    qrScanner.start(
      { facingMode: "environment" },
      config,
      onScanSuccess,
      onScanError
    );
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center py-4 px-6">
        <Link onClick={() => qrScanner.stop()} to="/">
          <figure className="rounded-full w-[50px] h-[50px] bg-[#204c7c] flex items-center justify-center text-white">
            <ArrowBackRounded sx={{ fontSize: 38 }} />
          </figure>
        </Link>
        <span className="text-3xl font-bold">QR Scanner</span>
        <QrCodeRounded sx={{ fontSize: 50 }} />
        <Link ref={hiddenLink} hidden to="/repairs"></Link>
      </div>

      <center>
        <div className="relative inline-block p-2 mt-14">
          <div className="w-[250px] h-[250px] flex flex-col">
            <div className="w-full flex justify-center" id="reader"></div>
          </div>
          <span className="w-[70px] h-[70px] absolute left-0 top-0 rounded-lg border-[#006633] border-t-8 border-l-8" />
          <span className="w-[70px] h-[70px] absolute right-0 top-0 rounded-lg border-[#006633] border-t-8 border-r-8" />
          <span className="w-[70px] h-[70px] absolute left-0 bottom-0 rounded-lg border-[#006633] border-b-8 border-l-8" />
          <span className="w-[70px] h-[70px] absolute right-0 bottom-0 rounded-lg border-[#006633] border-b-8 border-r-8" />
        </div>
      </center>
      <span className="flex justify-center mt-6">
        <button className="text-2xl font-bold bg-[#]"> Escanear una imagen </button>
      </span>
    </div>
  );
}

export default QRscanner;
