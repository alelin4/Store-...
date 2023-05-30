import { MenuItem, Select } from "@mui/material";
import ErrorBoundry from "../../Errorboundry";
import "./FilterDropdown.css";

function FilterDropdown({ filter, setFilter }) {
  return (
    <ErrorBoundry>
      <div className="filter">
        {"Filtrera produkter:"}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Age"
          onChange={(e) => setFilter({ filter: e.target.value })}
        >
          <MenuItem value={"popular"}>Populära produkter</MenuItem>
          <MenuItem value={"rea"}>Rea produkter</MenuItem>
        </Select>
      </div>
    </ErrorBoundry>
  );
}

export default FilterDropdown;
