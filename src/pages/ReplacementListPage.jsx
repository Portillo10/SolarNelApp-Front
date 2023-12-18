import { FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";
// import { Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ThemeProviderComponent from "../components/ThemeProviderComponent";
import { getReplacements, getTypes } from "../services/replacement.services";
import { statusEnum } from "../utils/request.utils";
import ReplacementCard from "../components/ReplacementCard";
import { AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import GoBackArrow from "../components/GoBackArrow";

export default function ReplacementListPage() {
  const [replacementType, setReplacementType] = useState("");
  const [replacementTypeList, setReplacementTypeList] = useState([]);
  const [replacementList, setReplacementList] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  const handleSelectChange = ({ target: { value } }) => {
    setReplacementType(value);
  };

  const filterReplacements = () => {
    if (replacementType === "") return [];
    return replacementList.filter(
      (replacement) =>
        replacement.replacementType === replacementType.toLowerCase()
    );
  };

  const getSymbols = () => {
    const symbols = replacementTypeList.find(
      (rep) => rep.typeDesc === replacementType
    ).replacementProps;
    if (!symbols) return [];
    return symbols;
  };

  useEffect(() => {
    (async () => {
      try {
        setFetchLoading(true);
        const response = await getTypes();
        const res = await getReplacements();
        if (response.status === statusEnum.OK && res.status === statusEnum.OK) {
          setReplacementTypeList(response.data);
          setReplacementList(res.data);
          setFetchLoading(false);
          setFetchCompleted(true);
        }
      } catch (error) {
        setFetchLoading(false);
      }
    })();
  }, []);

  return (
    <ThemeProviderComponent>
      <div className="dark:text-white w-full flex flex-col gap-4 py-3 items-center h-screen overflow-auto bg-[#f0f3f8] dark:bg-[#222222] pt-5 px-5 relative">
        <GoBackArrow />
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full max-w-[720px] flex flex-col items-center bg-[#F5F5F5] dark:bg-[#111111] p-2 pt-6 rounded-[20px] shadow-container dark:shadow-none dark:text-white">
            <FormControl sx={{ width: "90%" }}>
              <InputLabel>Tipo de repuesto</InputLabel>
              <Select
                value={replacementType}
                onChange={handleSelectChange}
                label="Tipo de repuesto"
              >
                {replacementTypeList.map((el, i) => (
                  <MenuItem key={i} value={el.typeDesc}>
                    {el.typeDesc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <section className="flex flex-wrap w-full my-3 pb-1.5 gap-3 justify-center max-h-[calc(100vh-270px)] overflow-auto">
              {filterReplacements().map((el, i) => (
                <ReplacementCard
                  key={i}
                  replacement={el}
                  symbols={getSymbols()}
                />
              ))}
            </section>
          </div>
          <Link to={"/addreplacements"}>
            <button className="text-white gap-2 hover:bg-green-900 bg-green-700 px-4 py-1.5 rounded-full transition-colors flex items-center">
              <AddCircle fontSize="large" />
              <p className="text-lg font-bold">Agregar repuestos</p>
            </button>
          </Link>
        </div>
      </div>
    </ThemeProviderComponent>
  );
}
