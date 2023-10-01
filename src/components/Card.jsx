import { useEffect } from "react";

function Card({ type, title, info, icon }) {
  return (
    <>
      <div className={`Card ${type}`}>
        <section>
          <p>{title}</p>
          <h4>{info}</h4>
        </section>
        <img src={icon} alt="" />
      </div>
    </>
  );
}

export default Card;
