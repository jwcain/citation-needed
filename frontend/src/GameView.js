import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameView.css";
import { LobbySlot } from "./LobbySlot";
import { serverErrorContract, eventContract } from "./ServerContracts.js";

export default function GameView({ socket, localUsername, room }) {
  if (room == null) {
    return <div>Connecting to Room...</div>;
  }
  const lifespan = room.lifespanSeconds;

  return (
    <div>
      <h1>{room.roomID}</h1>
      <PartyCreation
        socket={socket}
        room={room}
        localUsername={localUsername}
      />
      <p>Room Time:{lifespan}</p>
    </div>
  );
}

function PartyCreation({ socket, room, localUsername }) {
  function SetReady(user, setValue) {
    socket.emit(eventContract.SetReady, setValue);
  }

  var lobbyList = [];

  for (let i = 0; i < room.maxUsers; i++) {
    var user = room.users[i];
    if (user && user.username === localUsername)
      lobbyList.push(
        <LobbySlot
          username={user.username}
          ready={user.ready}
          isLocal={true}
          setReady={(v) => SetReady(room.users[i], v)}
        />
      );
    else if (user)
      lobbyList.push(
        <LobbySlot
          username={user.username}
          ready={user.ready}
          isLocal={false}
          setReady={null}
        />
      );
    else
      lobbyList.push(
        <LobbySlot
          username={""}
          ready={false}
          isLocal={false}
          setReady={null}
        />
      );
  }

  return <div>{lobbyList}</div>;
}
