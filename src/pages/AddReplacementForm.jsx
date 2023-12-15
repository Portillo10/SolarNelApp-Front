import { AddCircle } from "@mui/icons-material";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Backdrop,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { addReplacement, getTypes } from "../services/replacement.services";
import { statusEnum } from "../utils/request.utils";

import GoBackArrow from "../components/GoBackArrow";
import ThemeProviderComponent from "../components/ThemeProviderComponent";
import ModalComponent from "../components/ModalComponent";
import AddTypeForm from "../components/AddTypeForm";
import { cashFormat } from "../utils/others.utils";

const propsInputText = ["Referencia", "Marca"];

export default function AddReplacementForm() {
  const { handleSubmit, register, watch, unregister, resetField, setValue } =
    useForm({
      defaultValues: {
        replacementType: "",
        price: 0,
      },
    });

  const [pageLoading, setPageLoading] = useState(true);
  const [replacementTypes, setReplacementTypes] = useState([]);
  const [features, setFeatures] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    setFetchLoading(true);
    try {
      const response = await addReplacement(data);
      if (response.status === statusEnum.OK) {
        console.log(response);
        setFetchLoading(false);
        for (let feat of features) {
          resetField("props." + feat.prop);
        }
        setFetchCompleted(true);
        resetField("price");
      }
    } catch (error) {
      console.log(error);
    }
  });

  const pushReplacementTypes = (type) => {
    setReplacementTypes([...replacementTypes, type]);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getTypes();
        setReplacementTypes(response.data);
        setPageLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    features?.map((feat) => {
      unregister("props." + feat.prop);
    });
    const feat = replacementTypes.find(
      (rep) => rep.typeDesc === watch().replacementType
    );
    setFeatures(feat?.replacementProps);
  }, [watch().replacementType]);

  if (pageLoading)
    return (
      <div className="dark:text-white w-full flex flex-col gap-2 py-3 items-center h-screen overflow-auto bg-[#f0f3f8] dark:bg-[#222222] pt-5 px-5">
        <CircularProgress />
      </div>
    );

  return (
    <div className="dark:text-white w-full flex flex-col gap-2 py-3 items-center h-screen overflow-auto bg-[#f0f3f8] dark:bg-[#222222] pt-5 px-5 relative">
      <GoBackArrow />
      <ThemeProviderComponent>
        <form className="flex flex-col items-center" onSubmit={onSubmit}>
          <div className="m-2 max-w-[350px] w-full flex flex-col shadow-container bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none p-5 rounded-[20px] gap-4">
            <FormControl
              onSubmit={onSubmit}
              variant="outlined"
              sx={{ minWidth: "100%", marginTop: 2, display: "flex" }}
            >
              <InputLabel
                sx={{ zIndex: 10 }}
                id="demo-simple-select-standard-label"
              >
                Tipo de repuesto
              </InputLabel>

              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Tipo de aparato"
                value={watch().replacementType}
                {...register("replacementType", {
                  required: true,
                })}
              >
                {replacementTypes.map((replacementType, i) => {
                  return (
                    <MenuItem
                      key={i}
                      selected={i == 0}
                      value={replacementType.typeDesc}
                    >
                      {replacementType.typeDesc}
                    </MenuItem>
                  );
                })}

                <MenuItem value="" disabled>
                  <em>None</em>
                </MenuItem>
              </Select>
            </FormControl>
            {features?.length > 0 ? (
              <p className="text-center">Características</p>
            ) : (
              <></>
            )}

            <FormControl
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 0.6,
                justifyContent: "center",
              }}
            >
              {features?.map((feat, i) => {
                return (
                  <TextField
                    sx={{
                      width: "49%",
                      minWidth: features.length == 1 ? "135px" : "",
                    }}
                    key={i}
                    {...register("props." + feat.prop, { required: true })}
                    type={
                      propsInputText.includes(feat.prop) ? "text" : "number"
                    }
                    label={feat.prop}
                    step="0.01"
                    autoComplete="off"
                    id="outlined-start-adornment"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {feat.symbol}
                        </InputAdornment>
                      ),
                    }}
                  />
                );
              })}
            </FormControl>
            <hr />
            <span className="flex gap-4 items-center mt-3">
              <p className="text-xl">Precio:</p>
              <TextField
                value={cashFormat(watch().price)}
                type="number"
                onChange={(e) => {
                  try {
                    const price = e.target.value.replace(".", "");
                    setValue("price", Number(price));
                  } catch (error) {
                    console.log("errorMSG", error);
                  }
                }}
                // type="number"
                autoComplete="off"
                id="outlined-start-adornment"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </span>
          </div>
          <button className="rounded-lg w-[200px] py-1.5 text-xl text-white bg-[#8B0000] dark:bg-[#204C7C] dark:hover:bg-[#001f3f] hover:bg-[#ff0000] font-semibold m-auto mt-2">
            Agregar
          </button>
        </form>
        <Snackbar
          open={fetchCompleted}
          autoHideDuration={3000}
          onClose={() => setFetchCompleted(false)}
        >
          <Alert
            onClose={() => setFetchCompleted(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Repuesto agregado con éxito
          </Alert>
        </Snackbar>
        <Snackbar
          open={error != ""}
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
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={fetchLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <ModalComponent openModal={openModal} setOpenModal={setOpenModal}>
          <AddTypeForm
            setOpenModal={setOpenModal}
            setReplacementTypes={pushReplacementTypes}
          />
        </ModalComponent>
        <button
          onClick={() => setOpenModal(true)}
          className="p-2 rounded-md justify-center hover:bg-green-900 bg-green-700 flex gap-2 items-center absolute bottom-4 right-4 text-white"
        >
          <AddCircle fontSize="large" />
          <p className="font-bold text-xl">Nuevo</p>
        </button>
      </ThemeProviderComponent>
    </div>
  );
}
