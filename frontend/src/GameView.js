import React, { useState, useEffect } from "react";

export default function GameView({ socket, username, roomID, game }) {
  if (game == null) {
    return <div>Connecting to Room...</div>;
  }
  const lifespan = game.lifespanSeconds;

  return (
    <div>
      <p>Youre connected to {roomID}!</p>
      <p>Username:{username}</p>
      <p>Room Time:{lifespan}</p>
    </div>
  );
}
