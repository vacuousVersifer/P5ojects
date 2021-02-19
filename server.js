// Express
const express = require("express");
const app = express();

// HTTP
const http = require("http");
const server = http.createServer(app);

// Helmet 
const helmet = require("helmet");
app.use(helmet());

// CSP
const csp = "default-src 'self' 'https://code.jquery.com/jquery-3.5.1.min.js';"
app.use((req, res, next) => {
  res.setHeader("content-security-policy", csp)
  next()
});

// Socket.io
const socketio = require("socket.io");
const io = socketio(server);

// Enviroment Variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

// Listener
const listener = server.listen(PORT, () => {
  console.log(`Listening on port ${listener.address().port}`);
});

/* Sketch Setup */

// Sketches
const make_sketches = require("./make_sketches.js");
const sketches = make_sketches();

// Main Page
const make_main = require("./make_main.js");
const main_page = make_main(sketches);

/* Routing */

// Stylesheets
app.use(express.static("public"));

// Main Page
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/main.html`);
});

// Main Script
app.get("/main.js", (req, res) => {
  res.sendFile(`${__dirname}/public/main.js`)
})

// Sketch Pages
app.get("/:sketch", (req, res) => {
  let sketch_name = req.params.sketch;

  let sent = false;
  for (let i = 0; i < sketches.length; i++) {
    if (sketch_name === sketches[i].name) {
      sent = true;
      res.send(sketches[i].page);
    }
  }

  if (!sent) {
    res.send("Error, sketch not found ;P");
  }
});

// Scripts
app.get("/sketch/:script", (req, res) => {
  let sketch_name = req.params.sketch;
  let script_name = req.params.script;

  let file_path = `${__dirname}/sketches/${sketch_name}/${script_name}`;
  res.sendFile(file_path);
});

// Scripts
app.get("/:sketch/:script", (req, res) => {
  let sketchName = req.params.sketch;
  let scriptName = req.params.script;

  res.sendFile(`${__dirname}/sketches/${sketchName}/${scriptName}`);
});

// Socket.io
io.on("connection", socket => {
  console.log(`User ${socket.id} has connected`);

  socket.on("get sketches", () => {
    socket.emit("got sketches", sketches);
  })

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} has disconnected`)
  })
})