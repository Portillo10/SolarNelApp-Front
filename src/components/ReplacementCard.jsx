import { AttachMoneyRounded } from "@mui/icons-material";
import { cashFormat, toUpper } from "../utils/others.utils";

export default function ReplacementCard({
  replacement: { replacementType, props, price },
  symbols,
}) {
  const colors = ["#B0C9C9", "#D8BFD8", "#F9EBB2", "#FFDAB9"];

  return (
    <div className="bg-white dark:bg-[#222222] rounded-xl p-3 w-36 flex flex-col items-center gap-2 shadow-card border border-gray-300 dark:border-gray-800 dark:shadow-none">
      <p className="font-bold">{toUpper(replacementType)}</p>
      <span className="flex flex-col items-center gap-2">
        {symbols.map((el, i) => (
          <p
            key={i}
            className="PropTag text-black dark:shadow-none uppercase"
            style={{ backgroundColor: colors[i] }}
          >
            {(props[el.prop] + " " + el.symbol)}
          </p>
        ))}
      </span>
      <span className="flex items-center text-green-700 dark:text-green-500">
        <AttachMoneyRounded sx={{ fontSize: 18 }} />
        <p className="text-md font-extrabold">
          {cashFormat(price)}
        </p>
      </span>
    </div>
  );
}
