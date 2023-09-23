import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import WikipediaPage from "./WikipediaPage.js";

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
      <WikipediaPage id="18630637" />
    </div>
  );
}

/*https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=random&formatversion=2&grnnamespace=0&grnlimit=3&origin=* */
function BoundedTextEntry({ onSubmit, defaultValue, lowerBound, upperBound }) {
  let [lastUsedValue, setLastUsedValue] = useState(defaultValue);
  let bounded =
    lastUsedValue.length >= lowerBound && lastUsedValue.length <= upperBound;
  function onInputChange(event) {
    setLastUsedValue(event.target.value);
    bounded =
      lastUsedValue.length >= lowerBound && lastUsedValue.length <= upperBound;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        defaultValue={defaultValue}
        onChange={onInputChange}
      />
      <input
        type="submit"
        value="Enter"
        onClick={() => {
          if (bounded === false) return;
          onSubmit(lastUsedValue);
        }}
      />
      {bounded ? (
        <></>
      ) : (
        <p>
          Entry must be between {lowerBound} and {upperBound} characters.
        </p>
      )}
    </div>
  );
}

function BasicTextEntry({ onSubmit, defaultValue }) {
  let lastUsedValue = defaultValue;
  function onInputChange(event) {
    lastUsedValue = event.target.value;
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        defaultValue={defaultValue}
        onChange={onInputChange}
      />
      <input
        type="submit"
        value="Enter"
        onClick={() => {
          onSubmit(lastUsedValue);
        }}
      />
      {}
    </div>
  );
}
