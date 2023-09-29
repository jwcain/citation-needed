import React from "react";

export function LobbySlot({ username, isLocal, ready, setReady }) {
  if (isLocal)
    return (
      <span className="inline-span">
        <div className="lobbySlot local">{username}</div>
        <ReadyButton ready={ready} setReady={setReady} disabled={false} />
      </span>
    );

  if (username) {
    return (
      <span className="inline-span">
        <div className="lobbySlot used">{username}</div>
        <ReadyButton ready={ready} setReady={setReady} disabled={true} />
      </span>
    );
  } else {
    return (
      <span className="inline-span">
        <div className="lobbySlot open">Open Slot</div>
      </span>
    );
  }
}
function ReadyButton({ ready, setReady, disabled }) {
  if (disabled)
    return ready ? (
      <button
        disabled
        className="readyToggle ready"
        onClick={() => setReady(false)}
      >
        Ready
      </button>
    ) : (
      <button
        disabled
        className="readyToggle notReady"
        onClick={() => setReady(true)}
      >
        Not Ready
      </button>
    );

  return ready ? (
    <button className="readyToggle ready" onClick={() => setReady(false)}>
      Ready
    </button>
  ) : (
    <button className="readyToggle notReady" onClick={() => setReady(true)}>
      Not Ready
    </button>
  );
}
