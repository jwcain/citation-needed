import React from "react";
import "./WikipediaPage.css";

const wikitesturl =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=random&formatversion=2&grnnamespace=0&grnlimit=1&origin=*";

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
