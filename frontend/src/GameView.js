import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameView.css";

export default function GameView({ socket, username, room }) {
  if (room == null) {
    return <div>Connecting to Room...</div>;
  }
  const lifespan = room.lifespanSeconds;

  var lobbyList = [];

  for (let i = 0; i < room.maxUsers; i++) {
    var user = room.users[i];
    if (user && user.username === username)
      lobbyList.push(<LobbySlot username={user.username} isLocal={true} />);
    else if (user) lobbyList.push(<LobbySlot username={user.username} />);
    else lobbyList.push(<LobbySlot username={""} />);
  }

  return (
    <div>
      <h1>{room.roomID}</h1>
      <div>{lobbyList}</div>
      <p>Room Time:{lifespan}</p>
    </div>
  );
}

function LobbySlot({ username, isLocal, ready, setReady }) {
  if (isLocal)
    return (
      <>
        <span className="inline-span">
          <div className="lobbySlot local">{username}</div>
          <ReadyButton ready={ready} setReady={setReady} />
        </span>
      </>
    );

  if (username) {
    return <div className="lobbySlot used">{username}</div>;
  } else {
    return <div className="lobbySlot open">Open Slot</div>;
  }
}

function ReadyButton({ ready, setReady }) {
  return ready ? (
    <button className="readyToggle ready" onClick={() => setReady(false)}>
      Ready
    </button>
  ) : (
    <button className="readyToggle notReady" onClick={() => setReady(true)}>
      Not Ready
    </button>
  );
}
