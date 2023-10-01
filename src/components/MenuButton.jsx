function MenuButton({ addButton, icon }) {
  return (
    <>
      <button className={addButton ? "MenuButton AddButton" : "MenuButton"}>
        <img src={icon} alt="" />
      </button>
    </>
  );
}

export default MenuButton;
