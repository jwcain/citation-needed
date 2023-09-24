import React, { useState, useEffect } from "react";
import WikipediaPage from "./WikipediaPage";
const MIN_WORD_COUNT = 10000;

function DataFetcher({ url }) {
  const [queryOBJ, setQueryOBJ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading) return;
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = () => {
      if (!loading) return;
      if (request.status !== 200) {
        setLoading(false);
        setError("HTTP ERROR CODE: " + request.status);
      } else {
        const tempOBJ = JSON.parse(request.response);
        if (tempOBJ.query.pages[0].length >= MIN_WORD_COUNT) {
          setQueryOBJ(tempOBJ);
          setLoading(false);
        } else {
          request.open("GET", url);
          request.send(null);
        }
      }
    };
    request.onerror = (e) => {
      setLoading(false);
      setError("XHR error:" + e.type);
    };
    request.send(null);
  }, [url, queryOBJ, loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {queryOBJ.query.pages[0].title}
      <br />
      {queryOBJ.query.pages[0].pageid}
      <br />
      {queryOBJ.query.pages[0].length}
      <WikipediaPage id={queryOBJ.query.pages[0].pageid} />
    </div>
  );
}

export default DataFetcher;
