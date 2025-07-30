import React, { useState } from "react";
import s from "./Search.module.scss";
import { ReactComponent as SearchSvg } from "../../../assets/icons/search.svg";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={s.root}>
      <input
        type="text"
        placeholder="Поиск..."
        value={query}
        onChange={handleChange}
        className={s.input}
      />
      <span className={s.svg}>
        <SearchSvg />
      </span>
    </div>
  );
}

export default Search;
