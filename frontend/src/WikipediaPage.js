import React from "react";
import "./WikipediaPage.css";

export default function WikipediaPage({ id }) {
  return (
    <div className="wikipage">
      <iframe
        id="inlineFrameExample"
        title="Random Wikipedia Page"
        src={"http://en.wikipedia.org/?curid=" + id}
        sandbox=""
      ></iframe>
    </div>
  );
}
