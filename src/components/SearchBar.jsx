import { useRepair } from "../hooks/UseRepair";
import { SearchRounded} from '@mui/icons-material'

function SearchBar() {
  const { setSearch } = useRepair();

  const textChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="SearchBar dark:bg-[#484848] dark:text-white">
        <input className="bg-transparent " type="text" onChange={textChange} />
        <SearchRounded sx={{fontSize:36}}/>
      </div>
    </>
  );
}

export default SearchBar;
