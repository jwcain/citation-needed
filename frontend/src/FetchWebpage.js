import React from "react";
import "./FetchWebpage.css";

export default function FetchWebpage({ url }) {
  return (
    <div className="wikipage">
      <iframe
        id="inlineFrameExample"
        title="Random Wikipedia Page"
        src={url}
        sandbox=""
      ></iframe>
    </div>
  );
}
