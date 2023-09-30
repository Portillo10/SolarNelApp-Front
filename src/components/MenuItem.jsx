function MenuItem({ icon, children, event }) {
  return (
    <>
      <a onClick={event} className="LateralMenuIcon">
        <img src={icon} alt="" /> <div>{children}</div>
      </a>
    </>
  );
}

export default MenuItem;
