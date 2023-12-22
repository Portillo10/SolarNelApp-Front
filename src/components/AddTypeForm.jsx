import {
  AddCircle,
  CheckCircle,
  RemoveCircleRounded,
} from "@mui/icons-material";
import { FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addTypeRequest } from "../services/replacement.services";
import { statusEnum } from "../utils/request.utils";
import { toUpper } from "../utils/others.utils";
import ThemeProviderComponent from "./ThemeProviderComponent";
import LoadingComponent from "./LoadingComponent";

export default function AddTypeForm({
  setOpenModal,
  setReplacementTypes,
  setError,
}) {
  const { handleSubmit, register } = useForm();
  const [inputsQuantity, setInputsQuantity] = useState([]);
  const [replacementProps, setReplacementProps] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setFetchLoading(true);
    const finalData = {
      typeDesc: toUpper(data.typeDesc).trim(),
      replacementProps: replacementProps.map((props) => {
        return {
          prop: toUpper(props.prop).trim(),
          symbol: props.symb.toUpperCase().trim(),
        };
      }),
    };
    try {
      const response = await addTypeRequest(finalData);
      if (response.status === statusEnum.OK) {
        setFetchLoading(false);
        setOpenModal(false);
        setReplacementTypes(finalData);
      }
    } catch (error) {
      setFetchLoading(false);
      setError(error.message);
    }
  });

  const onChangeProp = ({ value }, i) => {
    replacementProps[i].prop = value;
  };

  const onChangeSymb = ({ value }, i) => {
    replacementProps[i].symb = value;
  };

  return (
    <>
      <div className="dark:text-white flex-col flex gap-4 items-center">
        <ThemeProviderComponent>
          <form
            onSubmit={onSubmit}
            className="dark:text-white flex-col flex gap-4 items-center relative"
          >
            <FormControl sx={{ marginTop: 2, width: "250px" }}>
              <TextField
                {...register("typeDesc", { required: true })}
                autoComplete="off"
                label="Descripción"
                id="outlined-start-adornment"
              />
            </FormControl>
            <p className="text-center text-lg">Características</p>
            {inputsQuantity.map((input, i) => (
              <span key={i} className="flex justify-between">
                <TextField
                  {...register("prop" + i, { required: true })}
                  onChange={({ target }) => onChangeProp(target, i)}
                  sx={{ width: "60%" }}
                  label="Característica"
                  autoComplete="off"
                />
                <TextField
                  {...register("symb" + i)}
                  onChange={({ target }) => onChangeSymb(target, i)}
                  sx={{ width: "35%" }}
                  label="Símbolo"
                  autoComplete="off"
                />
              </span>
            ))}
            <span className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setReplacementProps([
                    ...replacementProps,
                    { prop: "", symb: "" },
                  ]);
                  setInputsQuantity([...inputsQuantity, 0]);
                }}
                className="p-1.5 rounded-md hover:bg-green-900 bg-green-700 text-white"
              >
                <AddCircle fontSize="medium" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const newreplacementProps = [...replacementProps];
                  newreplacementProps.pop();
                  setReplacementProps(newreplacementProps);
                  const newInputsCuantity = inputsQuantity.filter(
                    (input, i) => {
                      if (i < inputsQuantity.length - 1) {
                        return true;
                      }
                    }
                  );
                  setInputsQuantity(newInputsCuantity);
                }}
                className="p-1.5 rounded-md hover:bg-red-900 bg-red-700 text-white"
              >
                <RemoveCircleRounded fontSize="medium" />
              </button>
            </span>
            <button
              type="submit"
              className="p-2 rounded-md justify-center absolute translate-x-1/2 right-1/2 -bottom-28 hover:bg-green-900 bg-green-700 flex gap-2 items-center text-white"
            >
              <CheckCircle fontSize="large" />
              <p className="font-bold text-xl">Agregar</p>
            </button>
          </form>
          <LoadingComponent fetchLoading={fetchLoading} />
        </ThemeProviderComponent>
      </div>
    </>
  );
}
