import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/GameView.css";
import { eventContract, GameState, ClientState } from "./ServerContracts.js";
import { PartyCreation } from "./GameViews/PartyCreation";
import { ArticleSelection } from "./GameViews/ArticleSelection";
import { ArticleDisplay } from "./GameViews/ArticleDisplay";
import { ContributorResponding } from "./GameViews/ContributorResponding";
import { EditorPrompting } from "./GameViews/EditorPrompting";
import { EditorJudging } from "./GameViews/EditorJudging";

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
    setClientState(ClientState.Free);
    return (
      <ArticleDisplay
        socket={socket}
        room={room}
        localUsername={localUsername}
      />
    );
  } else if (room.state === GameState.Responding) {
    return (
      <ContributorResponding
        socket={socket}
        room={room}
        localUsername={localUsername}
      />
    );
  } else if (room.state === GameState.Prompting) {
    return (
      <EditorPrompting
        socket={socket}
        room={room}
        localUsername={localUsername}
      />
    );
  } else if (room.state === GameState.JudgeActions) {
    return (
      <EditorJudging
        socket={socket}
        room={room}
        localUsername={localUsername}
      />
    );
  }

  return <div>You have reached an unhandled GameState.</div>;
}
