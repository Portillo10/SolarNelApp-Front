import { searchIcon } from "../hooks/Icons.jsx";
import { useRepair } from "../hooks/UseRepair";

function SearchBar() {
  const { setSearch } = useRepair();

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
