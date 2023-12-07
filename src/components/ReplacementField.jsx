import { AttachMoneyRounded } from "@mui/icons-material";
import { useState } from "react";

const vocals = ["a", "e", "i", "o", "u"];

export default function ReplacementField({ replacement, toggleSelection }) {
  const [selected, setSelected] = useState(false);

  const singleToPlural = (word) => {
    if (vocals.includes(word[word.length - 1])) {
      return `${word}s`;
    } else {
      return `${word}es`;
    }
  };

  const OnClick = () => {
    toggleSelection(replacement._id)
    setSelected(!selected)
  }

  return (
    <span
      onClick={OnClick}
      className={`flex transition-colors justify-between py-1 cursor-pointer border-b-[2px] border-[#747474] gap-1 dark:border-[#898788] max-h-[58px] overflow-hidden ${
        selected ? `bg-[#cca37a] dark:bg-[#001F3F]` : ""
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
              replacement.props[Object.keys(replacement?.props)[0]] +
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
  );
}
