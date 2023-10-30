import Logo from "/svg/Logos/normal_logo.svg";
import DarkLogo from "/svg/Logos/dark_normal_logo.svg";

import "./styles.css";

export default function LoginPage() {
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-start relative bg-[#F0F3F8] dark:bg-[#0f0f0f]">
        <img className="-mt-6" width="320px" src={Logo} alt="" />
        <div
          id="LoginFormContainer"
          className="max-w-[80%] w-auto pb-8 pt-12 px-12 flex flex-col items-center gap-8 rounded-lg absolute top-1/2 -translate-y-1/2 bg-[#f5f5f5] shadow-login dark:bg-[#222222] dark:shadow-none dark:text-white"
        >
          <span className="relative">
            <input
              placeholder=" "
              className="bg-transparent pb-1 pt-3 px-2 border-b-2 border-black dark:border-white"
              type="text"
              name=""
              id=""
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
              id=""
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
        </div>
      </div>
    </>
  );
}
