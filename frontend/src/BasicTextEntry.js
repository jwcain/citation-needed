import React from "react";

export default function BasicTextEntry({ onSubmit, defaultValue }) {
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
    </div>
  );
}
