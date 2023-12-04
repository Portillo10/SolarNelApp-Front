import {
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  Autocomplete,
  FormControl,
  InputLabel
} from "@mui/material";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  addDevice,
  getDeviceBrands,
  getLastNumberCode,
} from "../services/device.services";
import { useRepair } from "../hooks/UseRepair";
import { statusEnum } from "../utils/request.utils";

import GoBackArrow from "../components/GoBackArrow";
import ThemeProviderComponent from "../components/ThemeProviderComponent";
import LoadingComponent from "../components/LoadingComponent";

const verJSON = (stringifiedJSON = "") => {
  const newString = stringifiedJSON.split(",");

  return newString;
};

const deviceTypesEnum = {
  IMPULSOR: "impulsor",
  INVERSOR: "inversor",
};

export default function AddDevicePage() {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      deviceType: "impulsor",
      input: 110,
      output: 110,
    },
  });

  const navigate = useNavigate();

  const { newDeviceId, setCurrentDevice } = useRepair();

  const [brandOptions, setBrandOptions] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const onSubmit = handleSubmit(async (device) => {
    setFetchLoading(true);
    let data;
    const { customerOptionalPhone, power, output, input, range, ...rest } =
      device;

    if (device.deviceType === deviceTypesEnum.IMPULSOR) {
      data = { ...rest, deviceProps: { input, range } };
    } else if (device.deviceType === deviceTypesEnum.INVERSOR) {
      data = { ...rest, deviceProps: { input, output, power } };
    }
    try {
      const response = await addDevice({ ...data });
      if (response.status === statusEnum.OK) {
        setFetchLoading(false);
        setCurrentDevice(response.data.newDevice);
        navigate("/repairs");
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (watch().deviceType === deviceTypesEnum.IMPULSOR) {
      setValue("input", "110");
    } else if (watch().deviceType === deviceTypesEnum.INVERSOR) {
      setValue("input", "12");
    }
  }, [watch().deviceType]);

  useEffect(() => {
    (async () => {
      try {
        if (newDeviceId?.numberCode) {
          setValue("numberCode", newDeviceId.numberCode);
        } else {
          const {
            data: { numberCode },
          } = await getLastNumberCode();
          setValue("numberCode", numberCode);
        }

        if (newDeviceId?.id) {
          setValue("id", newDeviceId.id);
        }

        const {
          data: { brands },
        } = await getDeviceBrands();
        setBrandOptions(brands);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="dark:text-white w-full flex flex-col gap-2 py-3 items-center h-screen overflow-auto bg-[#f0f3f8] dark:bg-[#222222] pt-5 ">
      <GoBackArrow />
        <ThemeProviderComponent>
          <form className="flex flex-col items-center" onSubmit={onSubmit}>
            <div className="flex flex-wrap justify-center h-min">
              <section className="m-2 max-w-[320px] flex flex-col shadow-container bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none p-5 rounded-[20px]">
                <p>Información del aparato:</p>
                <span>
                  <FormControl
                    onSubmit={onSubmit}
                    variant="outlined"
                    sx={{ minWidth: "100%", marginTop: 2 }}
                  >
                    <InputLabel
                      sx={{ zIndex: 10 }}
                      id="demo-simple-select-standard-label"
                    >
                      Tipo de aparato
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Tipo de aparato"
                      value={watch().deviceType}
                      {...register("deviceType")}
                    >
                      <MenuItem value="impulsor">Impulsor</MenuItem>
                      <MenuItem value="inversor">Inversor</MenuItem>
                    </Select>
                  </FormControl>
                  <span className="flex gap-2">
                    <FormControl
                      onSubmit={onSubmit}
                      variant="outlined"
                      sx={{ minWidth: 90, marginTop: 2 }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Entrada
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Entrada"
                        value={watch().input}
                        {...register("input")}
                      >
                        <MenuItem
                          disabled={
                            watch().deviceType !== deviceTypesEnum.IMPULSOR
                          }
                          value="110"
                        >
                          110 v
                        </MenuItem>
                        <MenuItem
                          disabled={
                            watch().deviceType !== deviceTypesEnum.INVERSOR
                          }
                          value="48"
                        >
                          48 v
                        </MenuItem>
                        <MenuItem
                          disabled={
                            watch().deviceType !== deviceTypesEnum.INVERSOR
                          }
                          value="24"
                        >
                          24 v
                        </MenuItem>
                        <MenuItem value="12">12 v</MenuItem>
                      </Select>
                    </FormControl>
                    {watch().deviceType === deviceTypesEnum.IMPULSOR ? (
                      <FormControl sx={{ marginTop: 2, width: "100%" }}>
                        <TextField
                          {...register("range", {
                            required:
                              watch().deviceType === deviceTypesEnum.IMPULSOR,
                          })}
                          type="number"
                          label="Alcance"
                          id="outlined-number"
                          autoComplete="off"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">km</InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    ) : (
                      <FormControl sx={{ marginTop: 2, width: "100%" }}>
                        <TextField
                          {...register("power")}
                          type="number"
                          label="Potencia"
                          autoComplete="off"
                          id="outlined-start-adornment"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">w</InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    )}
                  </span>
                  <span className="flex gap-2">
                    {watch().deviceType === deviceTypesEnum.INVERSOR && (
                      <FormControl sx={{ marginTop: 2, minWidth: 90 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                          Salida
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="Salida"
                          sx={{ width: "100%" }}
                          value={watch().output}
                          {...register("output")}
                        >
                          <MenuItem value="110">110 v</MenuItem>
                          <MenuItem value="220">220 v</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    <FormControl
                      variant="standard"
                      sx={{ marginTop: 2, width: "100%" }}
                    >
                      <Autocomplete
                        id="controllable-states-demo"
                        disableClearable
                        freeSolo
                        options={brandOptions}
                        onInputChange={(e, value) => setValue("brand", value)}
                        renderInput={(params) => (
                          <TextField
                            {...register("brand", { required: true })}
                            {...params}
                            label="Marca"
                          />
                        )}
                      />
                    </FormControl>
                  </span>
                  <FormControl sx={{ marginTop: 2, width: "100%" }}>
                    <span className="flex items-center gap-2 justify-center w-full">
                      <p>Aparato #</p>
                      <TextField
                        autoComplete="off"
                        {...register("numberCode")}
                        id="outlined-start-adornment"
                        sx={{ width: 60 }}
                        aria-readonly="true"
                      />
                    </span>
                  </FormControl>
                </span>
              </section>
              <section className="m-2 max-w-[320px] flex flex-col shadow-container bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none p-5 rounded-[20px]">
                <p>Información del cliente:</p>
                <span>
                  <FormControl sx={{ marginTop: 2, width: "100%" }}>
                    <TextField
                      {...register("customerName", { required: true })}
                      autoComplete="off"
                      label="Nombre"
                      id="outlined-start-adornment"
                    />
                  </FormControl>
                  <FormControl sx={{ marginTop: 2, width: "100%" }}>
                    <TextField
                      {...register("customerPhone", { required: true })}
                      autoComplete="off"
                      label="Telefono"
                      type="number"
                      id="outlined-start-adornment"
                    />
                  </FormControl>
                  <FormControl sx={{ marginTop: 2, width: "100%" }}>
                    <TextField
                      {...register("customerOptionalPhone")}
                      autoComplete="off"
                      type="number"
                      label="Telefono 2 (opcional)"
                      id="outlined-start-adornment"
                    />
                  </FormControl>
                </span>
              </section>
              <section className=" bg-red-200 mt-4 dark:bg-black"></section>
            </div>
            <button className="rounded-lg w-[200px] py-1.5 text-xl text-white bg-[#8B0000] dark:bg-[#204C7C] dark:hover:bg-[#001f3f] hover:bg-[#ff0000] font-semibold m-auto mt-2">
              Recibir
            </button>
          </form>
          <LoadingComponent fetchLoading={fetchLoading}/>
        </ThemeProviderComponent>
    </div>
  );
}
