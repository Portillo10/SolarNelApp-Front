import { ModeRounded, CheckCircleRounded } from "@mui/icons-material";
import { useState } from "react";

export default function NormalContainer({ title, children, editable, tooggleEditable }) {

  return (
    <section className="dark:bg-dark-container dark:border dark:border-gray-600 bg-[#F5F5F5] rounded-[20px] shadow-neutral-600 shadow-md px-2 pt-3 pb-1 border-[#C1B7B7] border-2 dark:shadow-none">
      <span className="flex items-center justify-between h-[26px]">
        <h3 className="mb-3 text-[16px] font-bold">{title}</h3>
        <span onClick={tooggleEditable} className="pb-[1px] px-[1px] border-[#8D8989] border-[1px] rounded-lg -mt-2 cursor-pointer">
          {editable ? (
            <CheckCircleRounded fontSize="small" color="success" />
          ) : (
            <ModeRounded fontSize="small" />
          )}
        </span>
      </span>
      {children}
    </section>
  );
}
