import { CircularProgress } from "@mui/material";

function Card({ backColor, title, info, icon }) {
  return (
    <>
      <div
        className={`Card ${backColor} shadow-card dark:shadow-none dark:text-white`}
      >
        <section>
          <p>{title}</p>
          {info !== undefined ? <h4>{info}</h4> : <CircularProgress/>}
        </section>
        <img src={icon} alt="" />
      </div>
    </>
  );
}

export default Card;
