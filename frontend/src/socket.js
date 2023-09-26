import { io } from "socket.io-client";

/*// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";*/

const __ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://192.168.1.200:4000"
    : window.location.host;

export const socket = io(__ENDPOINT);
