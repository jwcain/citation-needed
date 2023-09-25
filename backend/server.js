import http from "http";
import path from "path";
import { Server } from "socket.io";
import express from "express";

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

const httpServer = http.Server(app);

const io = new Server(httpServer, { cors: { origin: "*" } });
const rooms = {};

const eventContract = {
  ServerError: "_ServerError",
  New_RoomID: "recieveNewRoomID",
  GameUpdate: "gameUpdate",
  OpenNewRoom: "openNewRoom",
  ConnectToRoom: "connectToRoom",
};

const serverErrorContract = {
  UnableToCreateRoom: 100,
  RoomIsFull: 101,
  InvalidRoom: 102,
};

function NewRoom(roomID) {
  return {
    roomID: roomID,
    spectatorsAllowed: true,
    maxUsers: 5,
    lifespanSeconds: 0,
    users: {},
    game: {},
  };
}

function RandomRoomID() {
  //TODO, calculate room ID
  if (rooms["DEVDEV"]) return "_error";

  return "DEVDEV";
}

function SendClientNeededRoomData(socket) {
  socket.emit(eventContract.GameUpdate, rooms[roomID].game);
}

function CommunucateServerError(socket, code, message) {
  socket.emit(eventContract.ServerError, {
    code: code,
    message: message,
  });
}

io.on("connection", (socket) => {
  socket.on(eventContract.OpenNewRoom, () => {
    var roomID;
    do {
      roomID = RandomRoomID();
    } while (roomID != "_error" && rooms[roomID] !== null);

    if (roomID === "_error") {
      CommunucateServerError(
        socket,
        serverErrorContract.UnableToCreateRoom,
        "All rooms in use, unable to make new room."
      );
      return;
    }
    rooms[roomID] = NewRoom(roomID);
    rooms[roomID] = socket.emit(eventContract.New_RoomID, roomID);
    SendClientNeededRoomData(socket);
  });

  //When a user connects to the server
  socket.on(eventContract.ConnectToRoom, (connectionInfo) => {
    const room = rooms.find((x) => x.roomID == connectionInfo.roomID);
    if (!room) {
      CommunucateServerError(
        socket,
        serverErrorContract.RoomIsFull,
        "Invalid Room Code"
      );
      return;
    }
    const user = room.users.find((x) => x.username === connectionInfo.username);
    if (user) {
      user.socketID = socket.id;
      user.online = true;
      updatedUser = user;
      return;
    }
    //Check if this user would have to be added as a spectator
    const wouldBeSpectator =
      room.maxUsers <= room.users.filter((x) => x.isSpectator === false).length;

    if (!room.spectatorsAllowed && wouldBeSpectator) {
      CommunucateServerError(
        socket,
        serverErrorContract.RoomIsFull,
        "Room is full."
      );
      return;
    }

    user = {
      username: username,
      roomID: room.roomID,
      online: true,
      socketID: socket.id,
      isSpectator: wouldBeSpectator,
    };
    room.users.push(user);
  });
  socket.on("disconnect", (socket) => {
    //Having to loop all games to find a user is probably bad.
    for (const roomID of Object.keys(rooms.users)) {
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

async function ServerUpdateLoop() {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (rooms) {
      for (const roomID of Object.keys(rooms)) {
        rooms[roomID].lifespanSeconds += 1;
        for (const username of Object.keys(rooms[roomID].users)) {
          SendClientNeededRoomData(io.to(rooms[roomID][username].socketID));
        }
        //TODO: Prune old rooms
      }
    }
  }
}

ServerUpdateLoop();
