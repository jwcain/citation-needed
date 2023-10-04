import React from "react";
import { ShowChatHistory, ShowPrompt } from "../utils/ShowChatHistory.js";
import "../css/Columns.css";

export function EditorJudging({ socket, room, localUsername }) {
  return (
    <div className="column center">
      <h1>
        Article: <i>{room.article.title}</i>
      </h1>
      <hr />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <hr />
      <div>
        <h1>Eliminate Suspected Liars:</h1>
        <p>
          Clicking a username will accuse them of lying. You get points per
          liar, but if the person you eliminate is not lying you lose all points
          this round!
        </p>
      </div>
      <div>This is where the username grid has to go!</div>
      <button>End Elimination Round</button>
      <p>
        Ending the elimination round allows you to ask a question to the
        contributors!
      </p>
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
      <ShowChatHistory room={room} showFirstXMessages={room.questions.length} />
    </div>
  );
}
