import React from "react";
import WikipediaPage from "../utils/WikipediaPage.js";
import { Timer } from "../utils/Timer.js";

export function ArticleDisplay({ room, localUsername }) {
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
