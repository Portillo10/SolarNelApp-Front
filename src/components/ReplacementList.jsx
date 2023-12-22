import { useEffect } from "react";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  createTheme,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMenu } from "../hooks/UseMenu";
import QuantityInput from "./QuantityInput";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function list({
  setError,
  setReplacements,
  setOpenModal,
  types,
  list,
}) {
  const { register, watch, handleSubmit, setValue, unregister, resetField } =
    useForm({
      defaultValues: {
        replacementType: "",
        quantity: "1",
      },
    });

  const { darkMode } = useMenu();

  const [features, setFeatures] = useState([]);

  const handleChange = (newAlignment, i) => {
    setValue("props." + features[i].prop, newAlignment);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const replacement = list
        .filter(
          (rep) =>
            rep.replacementType.toLowerCase() ===
            data.replacementType.toLowerCase()
        )
        .find((rep) => compareObjects(rep.props, data.props));

      const symbol = types.find(
        (type) =>
          type.typeDesc.toLowerCase() === data.replacementType.toLowerCase()
      ).replacementProps[0].symbol;
      if (replacement) {
        setReplacements({ ...replacement, quantity: data.quantity, symbol });
        setOpenModal(false);
      } else {
        throw new Error("No existe repuesto con esas características");
      }
    } catch (error) {
      setError(error.message);
    }
  });

  const compareObjects = (obj1, obj2) => {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for (let i in obj1) {
      if (obj1[i] !== obj2[i]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    features?.forEach((feat) => {
      resetField("props." + feat.prop);
      unregister("props." + feat.prop);
    });
    const feat = types.find((rep) => rep.typeDesc === watch().replacementType);
    setFeatures(feat?.replacementProps);
  }, [watch().replacementType]);

  const filterReplacements = (prop) => {
    let propList = list.map((replacement) => {
      if (
        replacement.replacementType ===
        watch().replacementType.toLocaleLowerCase()
      ) {
        return replacement.props[prop];
      }
    });
    propList = [...new Set(propList)];
    return propList.filter((prop) => prop !== undefined).sort((a, b) => a - b);
  };

  return (
    <div>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
          <FormControl
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
              {types.map((replacement, i) => (
                <MenuItem
                  key={i}
                  selected={i == 0}
                  value={replacement.typeDesc}
                >
                  {replacement.typeDesc}
                </MenuItem>
              ))}

              <MenuItem value="" disabled>
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
          {features?.map((feat, i) => (
            <div key={i}>
              <p className="dark:text-white text-center mb-2">{feat.prop}</p>
              <div className="border rounded-md border-gray-600">
                <StyledToggleButtonGroup
                  {...register("props." + feat.prop, { required: true })}
                  color="primary"
                  value={watch().props[feat.prop]}
                  exclusive
                  onChange={(event, value) => handleChange(value, i)}
                  aria-label="Platform"
                  sx={{
                    flexWrap: "wrap",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {filterReplacements(feat.prop).map(
                    (prop, i) =>
                      prop && (
                        <ToggleButton
                          size="medium"
                          key={i}
                          value={prop}
                          color="primary"
                          sx={{
                            color: darkMode ? "white" : "black",
                            fontWeight: 600,
                          }}
                        >
                          {prop + " " + feat.symbol}
                        </ToggleButton>
                      )
                  )}
                </StyledToggleButtonGroup>
              </div>
            </div>
          ))}
          <div>
            <QuantityInput quantity={watch().quantity} setValue={setValue} />
          </div>
          <button
            type="submit"
            className="rounded-lg w-[200px] py-1.5 text-xl text-white bg-[#8B0000] dark:bg-[#204C7C] dark:hover:bg-[#001f3f] hover:bg-[#ff0000] font-semibold mt-2"
          >
            Agregar
          </button>
        </form>
      </ThemeProvider>
    </div>
  );
}
