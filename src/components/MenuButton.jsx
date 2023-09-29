function MenuButton(props) {
  const showWindowWidth = () => {
    alert(window.screen.width);
  };

  return (
    <>
      <button
        onClick={showWindowWidth}
        className={props.addButton ? "MenuButton AddButton" : "MenuButton"}
      >
        <img src={props.icon} alt="" />
      </button>
    </>
  );
}

export default MenuButton;
