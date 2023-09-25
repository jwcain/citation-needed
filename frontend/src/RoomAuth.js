import React, { useState, useEffect } from "react";
import BoundedTextEntry from "./BoundedTextEntry";
import { Button } from "bootstrap";

function RoomAuth({ roomCode, setRoomCode }) {
  let [textValue, setTextValue] = useState("");
  const onNewRoomClick = () => {};

  return (
    <div>
      <button onClick={onNewRoomClick}>New Room</button>
      <br />
      <br />
      <BoundedTextEntry
        onSubmit={(text) => {
          setTextValue(text);
        }}
        defaultValue={textValue}
        lowerBound={6}
        upperBound={6}
        entryName={"Room Code"}
        submissionText={"Enter Room Code"}
      />
    </div>
  );
}

export default RoomAuth;
