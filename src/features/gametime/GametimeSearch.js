import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQueries, query } from "./gametimeSlice";
import styles from "./GametimeSearch.module.css";
import Results from "./Results"

export function GametimeSearch() {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const allQueryResults = useSelector(selectQueries);

  const searchTermChange = (e) => {
    const newVal = e.target.value;
    setTerm(e.target.value);
    if ( newVal !== '' && !allQueryResults[newVal.trim()]) {
      dispatch(query(newVal))
    }
  };

  return (
    <section className={styles.container}>
      <input type="text" value={term} onChange={searchTermChange} />
      <Results term={term} />
    </section>
  );
}
