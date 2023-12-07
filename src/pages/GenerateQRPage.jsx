import {
  Alert,
  CircularProgress,
  FormControl,
  Snackbar,
  TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import QRCode from "qrcode";

import { getDeviceIds, getLastNumberCode } from "../services/device.services";
import { statusEnum } from "../utils/request.utils";

import QrDocument from "../components/QrDocument";
import GoBackArrow from "../components/GoBackArrow";
import LoadingComponent from "../components/LoadingComponent";
import ThemeProviderComponent from "../components/ThemeProviderComponent";

export default function GenerateQRPage() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: { quantity: 49 },
  });

  const [qrList, setQrList] = useState([]);
  const [documentCreated, setDocumentCreated] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(false);
  const [number, setNumber] = useState();

  const onSubmit = handleSubmit(async (data) => {
    setFetchLoading(true);
    try {
      let numberCode;
      if (watch().numberCode === "") {
        numberCode = (await getLastNumberCode()).data.numberCode;
      } else {
        numberCode = watch().numberCode;
      }
      setNumber(numberCode);
      const response = await getDeviceIds(data.quantity, numberCode);
      const devList = [];
      await response.data.idList.forEach(async (dev) => {
        const image = await QRCode.toDataURL(JSON.stringify(dev));
        devList.push({ image, numberCode: dev.numberCode });
      });
      setQrList(devList);
      setDocumentCreated(true);
      setFetchLoading(false);
    } catch (error) {
      console.log(error);

      if (error.response.status === statusEnum.BAD_REQUEST) {
        setError(true);
      }
      setFetchLoading(false);
    }
  });

  return (
    <div className="dark:text-white w-full flex flex-col py-5 items-center h-screen overflow-auto bg-[#f0f3f8] dark:bg-[#222222] px-3 gap-2">
      <GoBackArrow />
      <ThemeProviderComponent>
        <form
          action=""
          onSubmit={onSubmit}
          className="m-2 w-[260px] flex flex-col items-center shadow-container bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none px-5 py-8 rounded-[20px] gap-6"
        >
          <p>Generador de QR</p>
          <FormControl>
            <TextField
              {...register("numberCode")}
              label="Numero inicial"
              autoComplete="off"
            />
          </FormControl>
          <button className="rounded-lg w-[200px] py-1.5 text-xl text-white bg-[#8B0000] dark:bg-[#204C7C] dark:hover:bg-[#001f3f] hover:bg-[#ff0000] font-semibold m-auto">
            Generar
          </button>
        </form>
        <PDFDownloadLink
          fileName={"Codigos QR desde #" + number}
          document={<QrDocument deviceList={qrList} />}
        >
          <button
            disabled={fetchLoading}
            className="rounded-lg w-[200px] py-1.5 text-xl text-white bg-[#006633] hover:bg-[#ff0000] font-semibold m-auto"
            hidden={!documentCreated}
          >
            {fetchLoading ? <CircularProgress size={20} /> : "Descargar pdf"}
          </button>
        </PDFDownloadLink>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={() => setError(false)}
        >
          <Alert
            onClose={() => setError(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            El número inicial debe ser mayor al último número registrado
          </Alert>
        </Snackbar>
        <LoadingComponent fetchLoading={fetchLoading}></LoadingComponent>
      </ThemeProviderComponent>
    </div>
  );
}
