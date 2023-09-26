export const eventContract = {
  ServerError: "_ServerError",
  New_RoomID: "recieveNewRoomID",
  GameUpdate: "gameUpdate",
  OpenNewRoom: "openNewRoom",
  ConnectToRoom: "connectToRoom",
};

export const serverErrorContract = {
  UnableToCreateRoom: 100,
  RoomIsFull: 101,
  InvalidRoom: 102,
  NameExists: 103,
};

export const GameState = {
  PartyAssembly: 0,
  JudgeSelection: 1,
  ArticleSelection: 2,
  Prompt: 3,
};
