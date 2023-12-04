import { Link } from "react-router-dom";

function MenuButton({ addButton, icon, to }) {
  return (
    <>
    <Link to = {to}>
      <button
        className={`transition-colors MenuButton shadow-menu-button bg-[#3498db] hover:bg-[#1f688e] dark:shadow-none dark:bg-[#1f688e] dark:hover:bg-[#3498db] ${addButton}`}
      >
        <img src={icon} alt="" />
      </button>
    </Link>
    </>
  );
}

export default MenuButton;
