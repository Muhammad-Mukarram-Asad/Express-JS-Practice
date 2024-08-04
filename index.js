import express from "express";
const app = express();
const port = process.env.PORT || 3000; // For cloud Development, we user env variable PORT
import path from "path";
import { fileURLToPath } from "url";
import UsersList from "./views/users.js";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (request, response) => {
  response.send("Welcome to CRUD Operations in Node.js By Simpli-Learn");
});

app.get("/getAllUsers", (req, res) => {
  console.log("Is it working?");
  res.send(UsersList);
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  const user = UsersList.find((user) => user.id == id);
  res.send(user);
});

app.get("/*", (request, response) => {
  response.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// CCRUD Operations in NOde & Express.js
