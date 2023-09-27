export const eventContract = {
  ServerError: "_ServerError",
  New_RoomID: "recieveNewRoomID",
  GameUpdate: "gameUpdate",
  OpenNewRoom: "openNewRoom",
  ConnectToRoom: "connectToRoom",
  SetReady: "setReadyState",
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
