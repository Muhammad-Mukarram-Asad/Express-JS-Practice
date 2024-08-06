import express, { response } from "express";
const app = express();
const port = process.env.PORT || 3000; // For cloud Development, we user env variable PORT
import path from "path";
import { fileURLToPath } from "url";
import UsersList from "./views/users";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Dave Grey Tutorial:
// Serving Files:

app.get("/", (request, response) => {
  // 1st way to serve file:
  response.sendFile("./views/index.html", { root: __dirname });
  // 2nd way to serve file:
  // response.sendFile(path.join(__dirname, "views", "index.html"));
});

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, "views")));

// For serving normal express file which includes http methods, we have to use following Middleware:
app.use(express.json());

// Route to serve the newPage.html file
app.get("/newPage(.html)?", (req, res) => {
  const filePath = path.join(__dirname, "views", "newPage.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log("File not found:", filePath);
      res.status(404).send("File not found");
    }
  });
});

// Route to redirect to newPage.html
app.get("/oldPage(.html)?", (req, res) => {
  res.redirect("/newPage");
});

app.get("/redirect", (req, res) => {
  // Redirect the user to the /new-route path
  console.log("Redirecting to /new-route");
  res.redirect("/new-route");
});

app.get("/new-route", (req, res) => {
  res.send("You have been redirected to the new route!");
});

app.get(
  "/hello(.html)?",
  (request, response, next) => {
    console.log("Attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("After Hello World From console log!");
  }
);

// Chaining Route Handlers:
const one = (req, res, next) => {
  console.log("One --> 1");
  next();
};

const two = (req, res, next) => {
  console.log("Two --> 2");
  next();
};
const three = (req, res, next) => {
  console.log("Three --> 3");
  res.send("Finished the chaining routes");
};

app.get("/chain", [one, two, three]);

app.get("/*", (request, response) => {
  response.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});


// CCRUD Operations in NOde & Express.js

app.get("/getAllUsers", (req, res) => {
  res.send(UsersList);
})
