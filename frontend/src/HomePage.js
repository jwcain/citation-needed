import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import WikipediaPage from "./WikipediaPage.js";
import DataFetcher from "./DataFetcher.js";
import BoundedTextEntry from "./BoundedTextEntry.js";

const wikitesturl =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=random&formatversion=2&grnnamespace=0&grnlimit=1&origin=*";

export default function HomePage() {
  let [textValue, setTextValue] = useState("");

  return (
    <div>
      <BoundedTextEntry
        onSubmit={(text) => {
          setTextValue(text);
        }}
        defaultValue={textValue}
        lowerBound={4}
        upperBound={16}
      />
      <p>{textValue}</p>
    </div>
  );
}
