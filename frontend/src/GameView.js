import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameView.css";
import {
  serverErrorContract,
  eventContract,
  GameState,
  ClientState,
} from "./ServerContracts.js";
import { PartyCreation } from "./PartyCreation";
import WikipediaPage from "./WikipediaPage.js";

export default function GameView({
  socket,
  localUsername,
  room,
  clientState,
  setClientState,
}) {
  if (room == null) {
    return <div>Connecting to Room...</div>;
  }

  function ClickedArticle(article) {
    if (clientState !== ClientState.Free) return;
    socket.emit(eventContract.PickedArticle, {
      roomID: room.roomID,
      article: article,
    });
    setClientState(ClientState.AwaitingResponse);
  }

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
  else if (room.state === GameState.RoundSetup)
    return (
      <div>
        <p>The Round is being setup...</p>
      </div>
    );
  else if (room.state === GameState.ArticleSelection) {
    return (
      <ArticleSelection
        room={room}
        localUsername={localUsername}
        ClickedArticle={ClickedArticle}
      />
    );
  } else if (room.state === GameState.ArticleDisplay) {
    //TODO: this is bad, we are just assuming that article reading has no time
    setClientState(ClientState.Free);
    return <ArticleDisplay room={room} localUsername={localUsername} />;
  } else if (room.state === GameState.Responding) {
    return <div>Responding...</div>;
  }

  return <div>You have reached an unhandled GameState.</div>;
}
function ArticleDisplay({ room, localUsername }) {
  if (room.judgeUsername === localUsername)
    return (
      <div>
        <h1>You are the Editor (Judge)!</h1>
        <p>The article is being read now, and the liars are preparing...</p>
        <Timer endTimeUTC={room.readingTimeEndUTC} />
      </div>
    );
  else if (room.articleViewerUsername === localUsername)
    return (
      <div>
        <h1>Read and remember as much from this article as you can!</h1>
        <p>{room.judgeUsername} is the Editor (Judge)!</p>
        <Timer endTimeUTC={room.readingTimeEndUTC} />
        <WikipediaPage id={room.article.id} />
      </div>
    );
  else
    return (
      <div>
        <h2>You are a liar!</h2>
        <p>{room.judgeUsername} is the Editor (Judge)!</p>
        <p>The article is:</p>
        <h1>{room.article.title}</h1>
        <p>Brainstorm how you are going to lie!</p>
        <Timer endTimeUTC={room.readingTimeEndUTC} />
      </div>
    );
}

function Timer({ endTimeUTC }) {
  const time = `${Math.max(0, Math.ceil((endTimeUTC - Date.now()) / 1000.0))}`;
  return (
    <div>
      <p>Time Remaining:{time}</p>
    </div>
  );
}

function ArticleSelection({ room, localUsername, ClickedArticle }) {
  if (room.judgeUsername === localUsername)
    return (
      <div>
        <h1>You are the Editor (Judge)!</h1>
        <p>The article is being selected.</p>
      </div>
    );
  else if (room.articleViewerUsername === localUsername)
    return (
      <div>
        <h1>You are the Article Viewer, pick an Article!</h1>
        <p>{room.judgeUsername} is the Editor (Judge)!</p>
        <div>
          {room.articleOptions.map((item, index) => (
            <div>
              <button
                className="articleButton"
                onClick={() => ClickedArticle(item)}
              >
                {item.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  else
    return (
      <div>
        <h2>You are a liar!</h2>
        <p>The article viewer is selecting their article.</p>
        <p>{room.judgeUsername} is the Editor (Judge)!</p>
      </div>
    );
}
