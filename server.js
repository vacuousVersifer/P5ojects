// Express
const express = require("express");
const app = express();

// Helmet
// const helmet = require('helmet');
// app.use(helmet());

// http
const http = require("http");
const server = http.createServer(app);

// Socket.io
const socketio = require("socket.io");
const io = socketio(server);

// Enviroment Variables
const dotenv = require("dotenv").config();

// Listener
const listener = server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${listener.address().port}`);
});

// Content Security Policy
// app.use((req, res, next) => {
// 	res.setHeader("content-security-policy", require('./csp.js'));
//      next();
// });

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
  res.send(main_page);
});

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
