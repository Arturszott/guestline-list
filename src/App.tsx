import HotelsList from "./components/HotelsList";
import Filters from "./components/Filters";
import CoverImage from "./components/CoverImage";
import { DataProvider } from "./providers/DataContext";
import { FilterProvider } from "./providers/FiltersContext";

function App() {
  return (
    <>
      <FilterProvider>
        <DataProvider>
          <CoverImage />
          <Filters />
          <HotelsList />
        </DataProvider>
      </FilterProvider>
    </>
  );
}

export default App;
