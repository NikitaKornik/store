import React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SearchContext } from "../../../context/ContextProvider";
import s from "./Search.module.scss";
import { ReactComponent as SearchSvg } from "../../../assets/icons/search.svg";

function Search({ onSearch }) {
  const { query, setQuery } = useContext(SearchContext);
  const { t } = useTranslation();

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className={s.root}>
      <input
        type="text"
        placeholder={t("search")}
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
