import http from "http";

import path from "path";
import { Server } from "socket.io";
import express from "express";
import { Console } from "console";
import { FindArticles } from "./ArticlePopulator.js";

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

const httpServer = http.Server(app);

const io = new Server(httpServer, { cors: { origin: "*" } });
const rooms = {};
var serverUpTimeSeconds = 0;

const eventContract = {
  ServerError: "_ServerError",
  New_RoomID: "recieveNewRoomID",
  GameUpdate: "gameUpdate",
  OpenNewRoom: "openNewRoom",
  ConnectToRoom: "connectToRoom",
  SetReady: "setReadyState",
};

const serverErrorContract = {
  UnableToCreateRoom: 100,
  RoomIsFull: 101,
  InvalidRoom: 102,
  NameExists: 103,
  GameStarted: 104,
};

export const GameState = {
  PartyAssembly: 0,
  JudgeSelection: 1,
  ArticleSelection: 2,
  ArticleReadingAndLying: 3,
  InitialPrompt: 4,
  QuestionOne: 5,
  ResponseOne: 6,
  QuestionTwo: 7,
  ResponseTwo: 8,
  QuestionThree: 9,
  ResponseThree: 10,
};

function NewRoom(roomID) {
  return {
    roomID: roomID,
    spectatorsAllowed: true,
    maxUsers: 5,
    lifespanSeconds: 0,
    users: [],
    state: 0,
    responses: {},
    judgeUsername: "",
    articleOptions: [],
    articleViewerUsername: "",
    article: null,
    wikiUID: 0,
  };
}

function RandomRoomID() {
  //TODO, calculate room ID
  if (rooms["DEVDEV"]) return "_error";

  return "DEVDEV";
}

function SendClientNeededRoomData(socketID, roomID) {
  io.to(socketID).emit(eventContract.GameUpdate, rooms[roomID]);
}

function CommunucateServerError(socket, code, message) {
  socket.emit(eventContract.ServerError, {
    code: code,
    message: message,
  });
}

io.on("connection", (socket) => {
  console.log("User Connection");
  socket.on(eventContract.OpenNewRoom, () => {
    console.log("open room attempt");

    var roomID = RandomRoomID();

    if (roomID === "_error") {
      console.log("Room open error");

      CommunucateServerError(
        socket,
        serverErrorContract.UnableToCreateRoom,
        "All rooms in use, unable to make new room."
      );
      return;
    }

    console.log("Creating Room");
    rooms[roomID] = NewRoom(roomID);
    socket.emit(eventContract.New_RoomID, roomID);
    SendClientNeededRoomData(socket.id, roomID);
  });

  //When a user connects to the server
  socket.on(eventContract.ConnectToRoom, (connectionInfo) => {
    console.log("connect to room attempt");
    const room = rooms[connectionInfo.roomID];
    if (!room) {
      console.log("Invalid room code");

      CommunucateServerError(
        socket,
        serverErrorContract.RoomIsFull,
        "Invalid Room Code"
      );
      return;
    }
    var user = room.users.find((x) => x.username === connectionInfo.username);
    if (user) {
      if (user.online) {
        console.log("User already exists and is online.");
        CommunucateServerError(
          socket,
          serverErrorContract.NameExists,
          "Name already exists"
        );
        return;
      } else {
        user.socketID = socket.id;
        user.online = true;
      }
    } else if (room.state !== GameState.PartyAssembly) {
      console.log("Game in progress");
      CommunucateServerError(
        socket,
        serverErrorContract.GameStarted,
        "Game already in progress"
      );
      return;
    } else {
      //Check if this user would have to be added as a spectator
      const wouldBeSpectator =
        room.maxUsers <=
        room.users.filter((x) => x.isSpectator === false).length;

      if (!room.spectatorsAllowed && wouldBeSpectator) {
        CommunucateServerError(
          socket,
          serverErrorContract.RoomIsFull,
          "Room is full."
        );
        return;
      }

      user = {
        username: connectionInfo.username,
        roomID: room.roomID,
        online: true,
        ready: false,
        socketID: socket.id,
        isSpectator: wouldBeSpectator,
      };
      console.log("pushing user");
      room.users.push(user);
    }
    socket.emit(eventContract.ConnectToRoom);
  });
  socket.on(eventContract.SetReady, (setState) => {
    for (const roomID of Object.keys(rooms)) {
      const user = rooms[roomID].users.find((x) => x.socketID === socket.id);
      if (user) {
        user.ready = setState;
        TryToStartGame(rooms[roomID]);
        break;
      }
    }
  });
  socket.on("disconnect", (socket) => {
    //Having to loop all games to find a user is probably bad.
    for (const roomID of Object.keys(rooms)) {
      const user = rooms[roomID].users.find((x) => x.socketID === socket.id);
      if (user) {
        user.online = false;
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

async function TryToStartGame(room) {
  var playerCount = room.users.filter((x) => x.online).length;
  var readyCount = room.users.filter((x) => x.ready).length;
  if (playerCount < 3 || readyCount < playerCount) return;

  room.state = GameState.JudgeSelection;
  room.judgeUsername =
    room.users[Math.floor(Math.random() * room.users.length)].username;
  do {
    room.articleViewerUsername =
      room.users[Math.floor(Math.random() * room.users.length)].username;
  } while (room.judgeUsername === room.articleViewerUsername);

  room.articleOptions = [];
  FindArticles(
    5,
    (value) => room.articleOptions.push(value),
    () => {
      room.state = GameState.ArticleSelection;
    }
  );
}

async function ServerUpdateLoop() {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    serverUpTimeSeconds++;
    if (serverUpTimeSeconds % 10 === 0)
      console.log(`Server Time: ${serverUpTimeSeconds}s`);
    if (rooms) {
      for (const roomID of Object.keys(rooms)) {
        rooms[roomID].lifespanSeconds += 1;
        rooms[roomID].users.forEach((user) =>
          SendClientNeededRoomData(user.socketID, roomID)
        );
        //TODO: Prune old rooms
      }
    }
  }
}

ServerUpdateLoop();
