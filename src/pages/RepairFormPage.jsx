import {
  AttachMoneyRounded,
  AddCircle,
  Check,
  DeleteForever,
} from "@mui/icons-material";

import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";

import GoBackArrow from "../components/GoBackArrow";
import ReplacementList from "../components/ReplacementList";
import ModalComponent from "../components/ModalComponent";
import ThemeProviderComponent from "../components/ThemeProviderComponent";
import CardHoles from "../components/CardHoles";

import { useAuth } from "../hooks/useAuth";
import { useRepair } from "../hooks/UseRepair";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { statusEnum } from "../utils/request.utils";
import { repairDevice } from "../services/device.services";
import { getReplacements, getTypes } from "../services/replacement.services";

const vocals = ["a", "e", "i", "o", "u"];

function RepairFormPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [replacements, setReplacements] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [observations, setObservations] = useState("");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [replacementTypes, setReplacementTypes] = useState([]);
  const [replacementList, setReplacementList] = useState([]);
  const [totalReadOnly, setTotalReadOnly] = useState(true);

  const navigate = useNavigate();

  const { user } = useAuth();
  const {
    currentDevice,
    setCurrentDevice,
    setCurrentRepair,
    setUpdateControl,
  } = useRepair();

  const onSubmit = async () => {
    setFetchLoading(true);
    const data = {
      deviceId: currentDevice._id,
      replacements: replacements.map((rep) => {
        return { replacementId: rep._id, quantity: rep.quantity };
      }),
      observations,
    };

    if (!totalReadOnly) {
      data.totalPrice = totalPrice;
    }

    try {
      const response = await repairDevice(data);
      if (response.status === statusEnum.OK) {
        setUpdateControl();
        setFetchLoading(false);
        setCurrentDevice(null);
        console.log(response.data.repair);
        navigate("/repairs");
      }
    } catch (error) {
      setError(error.message);
      setFetchLoading(false);
    }
  };

  const singleToPlural = (word) => {
    if (vocals.includes(word[word.length - 1])) {
      return `${word}s`;
    } else {
      return `${word}es`;
    }
  };

  const pushReplacement = (replacement) => {
    const repeted = replacements.find((rep) => rep._id === replacement._id);
    if (!repeted) {
      setTotalPrice(totalPrice + replacement.quantity * replacement.price);
      setReplacements([...replacements, replacement]);
    }
  };

  const toggleSelection = (id) => {
    if (selectedFields.includes(id)) {
      const newSelectedFields = selectedFields.filter((field) => field !== id);
      setSelectedFields(newSelectedFields);
    } else {
      setSelectedFields([...selectedFields, id]);
    }
  };

  const deleteSelectedFields = () => {
    const newReplacements = replacements.filter(
      (replacement) => !selectedFields.includes(replacement._id)
    );
    setSelectedFields([]);
    setReplacements(newReplacements);
  };

  useEffect(() => {
    if (!currentDevice) {
      navigate("/repairs");
    }
    (async () => {
      try {
        const types = await getTypes();
        setReplacementTypes(types.data);
        const response = await getReplacements();
        setReplacementList(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="dark:text-white w-full flex flex-col gap-2 py-3 items-center h-screen overflow-auto bg-[#f0f3f8] dark:bg-[#222222] pt-5">
        <GoBackArrow to={"/repairs"} text={"Volver a las reparaciones"} />
        <div className="max-w-[500px] w-[90%] bg-[#FFE4B5] dark:bg-[#333333] rounded-[20px] h-[calc(100vh-120px)] border-2 dark:border border-[#b29f7e] dark:border-[#444444] relative">
          <CardHoles px={8} py={5} size={30} />
          <div
            id="RepairDetail"
            className="overflow-y-auto h-[calc(100vh-200px)] px-4 relative"
          >
            <ThemeProviderComponent>
              <div>
                <h1 className="text-center text-3xl font-bold border-b-[3px] pb-2 border-black dark:border-[#898788]">
                  {new Date().toLocaleDateString()}
                </h1>
              </div>
              <span className="flex justify-between w-full items-center border-b-[2px] border-[#747474] dark:border-[#898788]">
                <h3 className="font-bold text-xl py-2">
                  Detalles de la reparación
                </h3>
                {selectedFields.length > 0 && (
                  <DeleteForever
                    color="error"
                    cursor="pointer"
                    onClick={deleteSelectedFields}
                  />
                )}
              </span>
              <section className="flex flex-col">
                {replacements.map((replacement, i) => (
                  <span
                    key={i}
                    onClick={() => toggleSelection(replacement._id)}
                    className={`flex transition-colors justify-between py-1 cursor-pointer border-b-[2px] border-[#747474] gap-1 dark:border-[#898788] max-h-[58px] overflow-hidden ${
                      selectedFields.includes(replacement._id)
                        ? `bg-[#cca37a] dark:bg-[#001F3F]`
                        : ""
                    }`}
                  >
                    <p className="text-base font-bold max-w-[60%] pointer-events-none">
                      {`${replacement.quantity} ${
                        replacement.quantity > 1
                          ? singleToPlural(replacement.replacementType)
                          : replacement.replacementType
                      }`}
                      {` ${
                        replacement?.props
                          ? "(" +
                            replacement.props[
                              Object.keys(replacement?.props)[0]
                            ] +
                            replacement.symbol +
                            ")"
                          : ""
                      }`}
                    </p>
                    <span className="flex text-[#006400] dark:text-green-500 items-center pointer-events-none">
                      <AttachMoneyRounded fontSize="small" />
                      <p className="text-lg font-bold">
                        {replacement.price * replacement.quantity}
                      </p>
                    </span>
                  </span>
                ))}
                <span
                  onClick={() => setOpenModal(true)}
                  className="flex items-center py-1 border-b-[2px] border-[#747474] dark:border-[#898788] gap-1 cursor-pointer"
                >
                  <AddCircle fontSize="medium" color="" />
                  <p>Agregar repuesto</p>
                </span>
                <ModalComponent
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                >
                  <ReplacementList
                    setOpenModal={setOpenModal}
                    setReplacements={pushReplacement}
                    setError={setError}
                    types={replacementTypes}
                    list={replacementList}
                  />
                </ModalComponent>
                <span className="flex justify-between py-1">
                  <p className="text-lg font-bold">Total</p>
                  <span className="flex text-[#006400] items-center dark:text-green-500">
                    <AttachMoneyRounded sx={{ fontSize: 22 }} />
                    <input
                      type="number"
                      value={totalPrice}
                      readOnly={totalReadOnly}
                      onChange={(e) => {
                        setTotalPrice(Number(e.target.value));
                      }}
                      onClick={() => setTotalReadOnly(false)}
                      className="bg-transparent border-b-2 border-[#8B8787] text-center w-24 text-lg font-bold"
                    />
                  </span>
                </span>
              </section>
              <section className="flex py-3">
                <span className="bg-[#e8f5e9] w-full rounded-lg p-2 border-[#8B8787] dark:bg-[#222222] dark:border-[#898788] border-2">
                  <p className="font-bold mb-1">Observaciones:</p>
                  <TextField
                    id="outlined-multiline-flexible"
                    onChange={(e) => setObservations(e.target.value)}
                    multiline
                    maxRows={4}
                    sx={{ width: "100%" }}
                  />
                </span>
              </section>
              <section className="mb-3">
                <p>Reparado por:</p>
                <p className="text-xl py-1 border-b-2 border-black dark:border-[#898788] inline-block px-2 font-['Lobster'] ml-2">
                  {user?.firstname}
                </p>
              </section>

              <Snackbar
                open={error !== ""}
                autoHideDuration={3000}
                onClose={() => setError("")}
              >
                <Alert
                  onClose={() => setError("")}
                  severity="warning"
                  sx={{ width: "100%" }}
                >
                  {error}
                </Alert>
              </Snackbar>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={fetchLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </ThemeProviderComponent>
          </div>
          <button
            onClick={onSubmit}
            className="rounded-full p-2 text-white hover:bg-green-900 transition-colors bg-green-700 absolute right-3 bottom-3"
          >
            <Check fontSize="large" />
          </button>
        </div>
      </div>
    </>
  );
}

export default RepairFormPage;
