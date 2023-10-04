import React, { useState } from "react";
import "../css/ContributorResponding.css";
import { eventContract } from "../ServerContracts.js";
import { ShowChatHistory, ShowPrompt } from "../utils/ShowChatHistory";

export function ContributorResponding({ socket, room, localUsername }) {
  const [responseText, setText] = useState("");
  const [sentResponse, setSentResponse] = useState(false);

  function HandleSubmitClick() {
    if (!responseText || responseText.length === 0) return;
    setSentResponse(true);
    socket.emit(eventContract.QuestionResponse, {
      username: localUsername,
      roomID: room.roomID,
      response: responseText,
    });
  }

  return (
    <>
      <div>
        <ShowChatHistory showFirstXMessage={room.questions.length - 1} />
      </div>
      <div>
        <ShowPrompt
          text={room.questions[room.questions.length - 1]}
          speaker={room.judgeUsername}
        />
      </div>
      {room.judgeUsername === localUsername ? (
        <div>
          <p>Waiting on contributor responses...</p>
        </div>
      ) : sentResponse ? (
        <div>
          <p>You said:</p>
          <p>{responseText}</p>
        </div>
      ) : (
        <div>
          <div>
            <input
              type="text"
              className="dialogeInput"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="dialogeInputButton"
              onClick={() => HandleSubmitClick()}
            >
              Submit
            </button>
          </div>
          <p>{responseText}</p>
        </div>
      )}
    </>
  );
}
