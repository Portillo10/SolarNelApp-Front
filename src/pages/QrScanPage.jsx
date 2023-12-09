import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

import { ArrowBackRounded } from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";

import { useRepair } from "../hooks/UseRepair";

function QRscanner() {
  const { findDevice, setCurrentDevice, setNewDeviceId } = useRepair();
  const navigate = useNavigate();

  const [fetchLoading, setFetchLoading] = useState(false);

  const config = {
    fps: 30,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1,
  };

  let qrScanner;

  useEffect(() => {
    qrScanner = new Html5Qrcode("reader");

    const onScanSuccess = async (decodedText, decodedResult) => {
      try {
        setFetchLoading(true);
        const deviceObj = JSON.parse(decodedText);
        const device = await findDevice(deviceObj.id);
        if (device == false) {
          qrScanner.stop();
          setNewDeviceId(deviceObj);
          navigate("/add_device");
        } else if (device) {
          setFetchLoading(false);
          qrScanner.stop();
          setCurrentDevice(device);
          navigate("/repairs");
        }
      } catch (error) {
        console.log(error);
      }
      qrScanner.stop();
    };

    const onScanError = (e) => {
      console.log(e.message)
    };

    qrScanner.start(
      { facingMode: "environment" },
      config,
      onScanSuccess,
      onScanError
    );
  }, []);

  return (
    <div  className="dark:text-white w-full flex flex-col gap-2 py-3 items-center h-screen overflow-auto bg-[#f0f3f8] dark:bg-[#222222] pt-5">
      <div className="flex gap-4 items-center py-4 px-6 w-full">
        <Link to="/">
          <figure
            onClick={() => qrScanner.stop()}
            className="rounded-full w-[50px] h-[50px] bg-[#204c7c] flex items-center justify-center text-white"
          >
            <ArrowBackRounded sx={{ fontSize: 38 }} />
          </figure>
        </Link>
        <span className="text-3xl font-bold">Volver al inicio</span>
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
      {/* <span className="flex justify-center mt-6">
        <button className="text-2xl font-bold bg-[#]">
          {" "}
          Escanear una imagen{" "}
        </button>
      </span> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fetchLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default QRscanner;
