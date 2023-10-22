import searchIcon from "../assets/svg/Search_icon.svg";
import { useContext } from "react";
import { RepairsContext } from "../Contexts/RepairsContext";

function SearchBar() {
  const { setSearch } = useContext(RepairsContext);

  const textChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="SearchBar">
        <input type="text" onChange={textChange} />
        <img src={searchIcon} alt="" width="36px" />
      </div>
    </>
  );
}

export default SearchBar;
