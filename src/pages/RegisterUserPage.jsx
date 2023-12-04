import {
  Alert,
  Backdrop,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { registerUser } from "../services/auth.services";
import { statusEnum } from "../utils/request.utils";

import GoBackArrow from "../components/GoBackArrow";
import ThemeProviderComponent from "../components/ThemeProviderComponent";


export default function RegisterForm() {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  const onSubmit = handleSubmit(async (data) => {
    setFetchLoading(true);
    try {
      const response = await registerUser(data);
      if (response.status === statusEnum.OK) {
        setFetchCompleted(true);
        setFetchLoading(false);
      }
    } catch (error) {
      console.log(error);
      setFetchLoading(false);
    }
  });

  const convert = (json) => {
    return JSON.stringify(json).split(",");
  };

  return (
    <div className="dark:text-white w-full flex flex-col py-5 items-center h-screen overflow-auto bg-[#f0f3f8] dark:bg-[#222222] px-3">
      <GoBackArrow />
      <form
        onSubmit={onSubmit}
        className="m-2 max-w-[620px] flex flex-col items-center shadow-container bg-[#F5F5F5] dark:bg-[#111111] dark:shadow-none px-5 py-8 rounded-[20px] gap-4"
      >
        <p className="text-xl">Información del usuario</p>
        <ThemeProviderComponent>
          <div className="flex flex-wrap justify-center gap-6">
            <FormControl variant="outlined" sx={{ maxWidth: 220 }}>
              <TextField
                {...register("username", {
                  maxLength: {
                    value: 20,
                    message: "máximo 20 caracteres",
                  },
                  required: true,
                })}
                autoComplete="off"
                type="text"
                label="Usuario"
              />
              {errors?.username ? (
                <span className="text-red-500 text-sm h-2">
                  {errors.username.message}
                </span>
              ) : (
                <div className="h-2"></div>
              )}
            </FormControl>
            <FormControl variant="outlined" sx={{ maxWidth: 220 }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                // sx={{ maxWidth: 280 }}
                {...register("password", { required: true })}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
              {errors?.password ? (
                <span className="text-red-500 text-sm h-2">
                  {errors.password.message}
                </span>
              ) : (
                <div className="h-2"></div>
              )}
            </FormControl>
            <FormControl variant="outlined" sx={{ maxWidth: 220 }}>
              <TextField
                {...register("firstname", {
                  minLength: {
                    value: 3,
                    message: "minimo 3 caracteres",
                  },
                  required: true,
                })}
                autoComplete="off"
                label="Nombre"
              />
              {errors?.firstname ? (
                <span className="text-red-500 text-sm h-2">
                  {errors.firstname.message}
                </span>
              ) : (
                <div className="h-2"></div>
              )}
            </FormControl>
            <FormControl variant="outlined" sx={{ maxWidth: 220 }}>
              <TextField
                {...register("lastname", {
                  minLength: {
                    value: 3,
                    message: "minimo 3 caracteres",
                  },
                  required: true,
                })}
                autoComplete="off"
                label="Apellido"
              />
              {errors?.lastname ? (
                <span className="text-red-500 text-sm h-2">
                  {errors.lastname.message}
                </span>
              ) : (
                <div className="h-2"></div>
              )}
            </FormControl>
            <>
              {/* <FormControl variant="outlined" sx={{ maxWidth: 280 }}>
              <TextField
                {...register("phone", {
                  minLength: { value: 10, message: "Telefono inválido" },
                  maxLength: { value: 10, message: "Telefono inválido" },
                })}
                autoComplete="off"
                type="number"
                label="Telefono"
              />
              {errors?.phone ? (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              ) : (
                <div className="h-2"></div>
              )}
            </FormControl>
            <FormControl variant="outlined" sx={{ maxWidth: 280 }}>
              <TextField
                {...register("documentNumber", {
                  minLength: { value: 10, message: "Documento inválido" },
                  maxLength: { value: 10, message: "Documento inválido" },
                })}
                autoComplete="off"
                type="number"
                label="Documento"
              />
              {errors?.documentNumber ? (
                <span className="text-red-500 text-sm">
                  {errors.documentNumber.message}
                </span>
              ) : (
                <div className="h-2"></div>
              )}
            </FormControl> */}
            </>
          </div>
          <button className="rounded-lg w-[200px] py-1.5 text-xl text-white bg-[#8B0000] dark:bg-[#204C7C] dark:hover:bg-[#001f3f] hover:bg-[rgb(255,0,0)] font-semibold m-auto">
            Registrar
          </button>
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
              Usuario registrado con éxito
            </Alert>
          </Snackbar>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={fetchLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </ThemeProviderComponent>
      </form>
    </div>
  );
}
