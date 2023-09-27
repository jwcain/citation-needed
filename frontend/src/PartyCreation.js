import React from "react";
import { LobbySlot } from "./LobbySlot";
import { eventContract } from "./ServerContracts.js";

export function PartyCreation({ socket, room, localUsername }) {
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
