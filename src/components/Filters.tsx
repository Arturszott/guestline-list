import { useFilters } from "../providers/FiltersContext";
import StarRating from "./StarRating";

import "./filters.css";

function Filters() {
  const {
    adultCount,
    childrenCount,
    rating,
    setAdults,
    setRating,
    setChildren,
  } = useFilters();

  return (
    <div className="filters-bar">
      <div className="filter">
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <div className="filter">
        <label htmlFor="adults-filter">Adults:</label>
        <input
          type="number"
          min={0}
          id="adults-filter"
          defaultValue={adultCount}
          onChange={(event) => {
            if (isNaN(event.target.valueAsNumber)) return;

            setAdults(event.target.valueAsNumber);
          }}
        />
      </div>
      <div className="filter">
        <label htmlFor="children-filter">Children:</label>
        <input
          type="number"
          min={0}
          id="children-filter"
          defaultValue={childrenCount}
          onChange={(event) => {
            if (isNaN(event.target.valueAsNumber)) return;

            setChildren(event.target.valueAsNumber);
          }}
        />
      </div>
    </div>
  );
}

export default Filters;
