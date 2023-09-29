function LateralMenuIcon({ activeMenu, icon, children, event }) {
  return (
    <>
      <button onClick={event} className="LateralMenuIcon">
        <img src={icon} alt="" /> {children}
      </button>
    </>
  );
}

export default LateralMenuIcon;
