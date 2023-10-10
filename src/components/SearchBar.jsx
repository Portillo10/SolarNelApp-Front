import searchIcon from "../assets/svg/Search_icon.svg";

function SearchBar({ setSearch }) {
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
