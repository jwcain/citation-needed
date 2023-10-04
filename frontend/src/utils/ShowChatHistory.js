import React from "react";
import "../css/ContributorResponding.css";

export function ShowPrompt({ text, speaker }) {
  return (
    <span className="textBlock editor">
      <div className="name judge">{speaker.toUpperCase()}</div>
      <div className="dialogue">{text.toUpperCase()}</div>
    </span>
  );
}
function ShowResponse({ text, speaker }) {
  return (
    <span className="textBlock contributor">
      <div className="dialogue">{text.toUpperCase()}</div>
      <div className="name contributor">{speaker.toUpperCase()}</div>
    </span>
  );
}
function ResponseSet({ room, i }) {
  return (
    <>
      <div>
        <ShowPrompt text={room.questions[i]} speaker={room.judgeUsername} />
      </div>
      <div>
        {room.users.map((user, index) => {
          if (
            room.judgeUsername === user.username ||
            !room.responses[user.username]
          ) {
            return <></>;
          } else {
            return (
              <div>
                <ShowResponse
                  text={room.responses[user.username][i]}
                  speaker={user.username}
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
export function ShowChatHistory({ room, showFirstXMessages }) {
  var responseList = [];

  for (let i = 0; i < showFirstXMessages; i++) {
    responseList.push(<ResponseSet room={room} i={i} key={`${i}hisotry`} />);
  }
  return <div>{responseList}</div>;
}
