import React from "react";

export function Timer({ endTimeUTC }) {
  const time = `${Math.max(0, Math.ceil((endTimeUTC - Date.now()) / 1000))}`;
  return (
    <div>
      <p>Time Remaining:{time}</p>
    </div>
  );
}
