import { Link } from "react-router-dom";
import { ArrowBackRounded } from "@mui/icons-material";


export default function GoBackArrow({to, text}) {
  return (
    <span className="w-full flex items-center gap-3 px-3">
      <Link to={to?to:"/"}>
        <figure className="rounded-full w-[50px] h-[50px] bg-[#204c7c] flex items-center justify-center text-white">
          <ArrowBackRounded sx={{ fontSize: 38 }} />
        </figure>
      </Link>
      <p className="text-xl">{text?text:"Volver al inicio"}</p>
    </span>
  );
}
