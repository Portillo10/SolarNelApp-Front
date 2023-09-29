function Card(props) {
  return (
    <>
      <div className="Card" style={{ backgroundColor: props.color }}>
        <section>
          <p>{props.title}</p>
          <h4>{props.info}</h4>
        </section>
        <img src={props.icon} alt="" />
      </div>
    </>
  );
}

export default Card;
