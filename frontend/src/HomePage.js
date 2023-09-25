import "bootstrap/dist/css/bootstrap.min.css";
import { socket } from "./socket.js";
import React, { useState, useEffect } from "react";
import { serverErrorContract, eventContract } from "./ServerContracts.js";

const __ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://localhost:4000"
    : window.location.host;

export default function HomePage() {
  const [username, setUsername] = useState("Aydn");
  const [roomID, setRoomID] = useState("");
  const [game, setGame] = useState(null);

  const [serverConnected, setServerConnected] = useState(socket.connected);
  const [roomConnected, setRoomConnected] = useState(false);
  const [triedRoomConnection, setTriedRoomConnection] = useState(false);

  useEffect(() => {
    function onConnect() {
      setServerConnected(true);
    }

    function onDisconnect() {
      setServerConnected(false);
    }

    function onGameUpdate(data) {
      setGame(data);
    }
    function onConnectToRoom() {
      setRoomConnected(true);
    }
    function onNewRoomID(data) {
      setRoomID(data);
      if (!triedRoomConnection && username) {
        setTriedRoomConnection(true);
        //TODO, make it so this cant be spammed
        socket.emit(eventContract.ConnectToRoom, {
          username: username,
          roomID: data,
        });
      }
    }

    function onServerError(error) {
      if (error.code === serverErrorContract.UnableToCreateRoom) {
        //Unable to create new room
      } else if (error.code === serverErrorContract.RoomIsFull) {
      } else if (error.code === serverErrorContract.InvalidRoom) {
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(eventContract.GameUpdate, onGameUpdate);
    socket.on(eventContract.ConnectToRoom, onConnectToRoom);
    socket.on(eventContract.New_RoomID, onNewRoomID);
    socket.on(eventContract.ServerError, onServerError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(eventContract.GameUpdate, onGameUpdate);
      socket.off(eventContract.ConnectToRoom, onConnectToRoom);
      socket.off(eventContract.New_RoomID, onNewRoomID);
      socket.off(eventContract.ServerError, onServerError);
    };
  }, [game]);

  function HandleNewRoomClick() {
    socket.emit(eventContract.OpenNewRoom);
  }

  var gameData;
  if (game) {
    gameData = <div>Game Uptime = {game.lifespanSeconds}</div>;
  } else {
    gameData = <button onClick={HandleNewRoomClick}>New Room</button>;
  }

  return (
    <div>
      <p>Username: {username}</p>
      <p>RoomID: {!roomID ? "null" : roomID}</p>
      <p>TriedroomConnect: {triedRoomConnection ? "true" : "false"} </p>
      <p>RoomConnected: {roomConnected ? "true" : "false"} </p>
      <p>SocketID: {socket ? socket.id ?? "null" : "null"}</p>
      {gameData}
    </div>
  );
}
