import axios from "axios";

function MenuButton({ addButton, icon }) {
  const get = async () => {
    console.log("funciona");
    const response = await axios.get("https://reqres.in/api/users?page=2");
    console.log(response);
  };

  return (
    <>
      <button
        onClick={get}
        className={addButton ? "MenuButton AddButton" : "MenuButton"}
      >
        <img src={icon} alt="" />
      </button>
    </>
  );
}

export default MenuButton;
