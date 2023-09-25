import http from "http";
import path from "path";
import { Server } from "spcket.io";
import express from "express";

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join("/frontend/build/index.html"));
});
