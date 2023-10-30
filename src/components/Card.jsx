function Card({ backColor, title, info, icon }) {
  return (
    <>
      <div
        className={`Card ${backColor} shadow-card dark:shadow-none dark:text-white`}
      >
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
