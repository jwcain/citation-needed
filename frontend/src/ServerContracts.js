export const eventContract = {
  ServerError: "_ServerError",
  New_RoomID: "recieveNewRoomID",
  GameUpdate: "gameUpdate",
  OpenNewRoom: "openNewRoom",
  ConnectToRoom: "connectToRoom",
  SetReady: "setReadyState",
  PickedArticle: "pickedArticle",
};

export const serverErrorContract = {
  UnableToCreateRoom: 100,
  RoomIsFull: 101,
  InvalidRoom: 102,
  NameExists: 103,
  GameStarted: 104,
};

export const GameState = {
  PartyAssembly: 0,
  RoundSetup: 1,
  ArticleSelection: 2,
  ArticleDisplay: 3,
  Prompting: 4,
  Responding: 5,
  JudgeActions: 6,
};
export const ClientState = {
  Free: "free",
  AwaitingResponse: "awaitingResponse",
};
