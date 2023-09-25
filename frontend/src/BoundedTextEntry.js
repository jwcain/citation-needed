import React, { useState } from "react";

/*<WikipediaPage id="18630637" /> */
export default function BoundedTextEntry({
  onSubmit,
  defaultValue,
  lowerBound,
  upperBound,
  entryName,
  submissionText,
}) {
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
        value={submissionText}
        onClick={() => {
          if (bounded === false) return;
          onSubmit(lastUsedValue);
        }}
      />
      {bounded ? (
        <></>
      ) : lowerBound === upperBound ? (
        <p>
          {entryName} must be {lowerBound} characters.
        </p>
      ) : (
        <p>
          {entryName} must be between {lowerBound} and {upperBound} characters.
        </p>
      )}
    </div>
  );
}
