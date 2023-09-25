import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import UserAuth from "./UserAuth.js";
import RoomAuth from "./RoomAuth.js";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");

  if (!roomCode)
    return <RoomAuth roomCode={roomCode} setRoomCode={setRoomCode} />;
  if (!username) return <UserAuth username={username} setUser={setUsername} />;

  return <div>Final View!</div>;
}
