import "bootstrap/dist/css/bootstrap.min.css";
import socketUIClient from "socket.io-client";
import React, { useState, useEffect } from "react";
import UserAuth from "./UserAuth.js";
import RoomAuth from "./RoomAuth.js";

const __ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:4000"
    : window.location.host;

export default function HomePage() {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");

  const [socket, setStocket] = useState(null);
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.emit("connectToRoom", { username: username, roomID: roomID });
      socket.on("ServerError", (error) => {
        if (error.code === 100) {
          //Unable to create new room
        }
      });
      socket.on("gameUpdate", (data) => {
        //Do we need to sanitize the data?
        setGame(data);
      });
    } else if (username && roomID) {
      setStocket(socketUIClient(__ENDPOINT));
    }
  }, [username, roomID, game, socket]);

  if (!roomCode)
    return <RoomAuth roomCode={roomCode} setRoomCode={setRoomCode} />;
  if (!username) return <UserAuth username={username} setUser={setUsername} />;

  return <div>Final View!</div>;
}
