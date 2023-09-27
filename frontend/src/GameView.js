import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameView.css";
import { serverErrorContract, GameState } from "./ServerContracts.js";
import { PartyCreation } from "./PartyCreation";
import WikipediaPage from "./WikipediaPage.js";

export default function GameView({ socket, localUsername, room }) {
  if (room == null) {
    return <div>Connecting to Room...</div>;
  }
  const lifespan = room.lifespanSeconds;

  if (room.state === GameState.PartyAssembly)
    return (
      <div>
        <h1>{room.roomID}</h1>
        <PartyCreation
          socket={socket}
          room={room}
          localUsername={localUsername}
        />
      </div>
    );
  else if (room.state === GameState.JudgeSelection)
    return (
      <div>
        <p>An Editor (Judge) is being selected...</p>
      </div>
    );
  else if (room.state === GameState.ArticleSelection) {
    if (room.judgeUsername === localUsername)
      return <h1>You are the Editor (Judge)!</h1>;
    if (room.articleViewerUsername !== localUsername)
      return (
        <div>
          <h2>You are a liar!</h2>
          <p>The article viewer is selecting their article.</p>
          <p>{room.judgeUsername} is the Editor (Judge)!</p>
        </div>
      );

    return (
      <div>
        <h1>You are the Article Viewer, pick an Article!</h1>
        <p>{room.judgeUsername} is the Editor (Judge)!</p>
        {room.articleOptions.map((item, index) => (
          <ArticleDisplay title={item.title} />
        ))}
      </div>
    );
  }
}

function ArticleDisplay({ title }) {
  return <p>{title}</p>;
}
