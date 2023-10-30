/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        login: "0px 0px 20px rgb(146, 144, 144);",
        card: "4px 4px 5px rgb(184, 184, 184);",
        container: "0px 4px 10px rgb(153, 151, 151);",
        "menu-button": "0px 2px 5px rgb(80, 80, 80);",
      },
      backgroundImage: {
        danger: "linear-gradient(to right, #ffd699, #fdeac0);",
        ready: "linear-gradient(to right, #aedff7, #e4f4fd);",
        repair: "linear-gradient(to right, #b4b4d8, #dbdbf5);",
        money: "linear-gradient(to right, #8fbc8b, #b0e2ac);",
        "dark-danger": "linear-gradient(to right, #b38f66, #e0b189);",
        "dark-ready": "linear-gradient(to right, #355580, #5389a9);",
        "dark-repair": "linear-gradient(to right, #4d4d66, #6f6f8c);",
        "dark-money": "linear-gradient(to right, #617952, #7ca077);",
      },
    },
  },
  plugins: [],
};
