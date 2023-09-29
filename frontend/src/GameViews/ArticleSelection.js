import React from "react";

export function ArticleSelection({ room, localUsername, ClickedArticle }) {
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
