import Logo from "/svg/Logos/normal_logo.svg";
import DarkLogo from "/svg/Logos/dark_normal_logo.svg";

import { useMenu } from "../hooks/UseMenu";
import { useAuth } from "../hooks/useAuth";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Backdrop, CircularProgress } from "@mui/material";

import "./styles.css";

export default function LoginPage() {
  const { darkMode } = useMenu();

  const { signin } = useAuth();

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
  } = useForm();

  const [fetchLoading, setFetchLoading] = useState(false)

  const onSumbmit = handleSubmit(async (data) => {
    try {
      setFetchLoading(true)
      await signin(data)
      setFetchLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      setFetchLoading(false)
    }
  })

  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-start relative bg-[#F0F3F8] dark:bg-[#0f0f0f]">
        <img
          className="-mt-6"
          width="320px"
          src={darkMode ? DarkLogo : Logo}
          alt=""
        />
        <form
        onSubmit={onSumbmit}
          action=""
          className="max-w-[80%] w-auto pb-8 pt-12 px-12 flex flex-col items-center gap-8 rounded-lg absolute top-1/2 -translate-y-1/2 bg-[#f5f5f5] shadow-login dark:bg-[#222222] dark:shadow-none dark:text-white"
        >
          <span className="relative">
            <input
              placeholder=" "
              className="bg-transparent pb-1 pt-3 px-2 border-b-2 border-black dark:border-white"
              type="text"
              name=""
              {...register("username")}
            />
            <label
              className="absolute top-1/2 -translate-y-1/2 font-bold"
              htmlFor=""
            >
              Usuario
            </label>
          </span>
          <span className="relative">
            <input
              className="bg-transparent pb-1 pt-3 px-2 border-b-2 border-black dark:border-white"
              placeholder=" "
              type="password"
              name=""
              {...register("password")}
            />
            <label
              className="absolute top-1/2 -translate-y-1/2 font-bold"
              htmlFor=""
            >
              Contraseña
            </label>
          </span>
          <button className="py-3 w-full rounded-lg text-white font-bold bg-[#3498DB] hover:bg-[#1e5c9d] dark:bg-[#1e5c9d] dark:hover:bg-[#3498DB]">
            Ingresar
          </button>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={fetchLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}
