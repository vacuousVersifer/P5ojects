// Set up basic server with https
const express = require("express");
const app = express();
const helmet = require("helmet");
app.use(helmet());
app.listen(process.env.PORT || 4130, () => {
  console.log(`Listening on port ${process.env.PORT || 4130}`);
});

// Content Security Policy
app.use((req, res, next) => {
  res.setHeader(
    "content-security-policy",
    "default-src 'self'; script-src 'report-sample' 'self' https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/p5.min.js https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.2.0/addons/p5.sound.min.js; style-src 'report-sample' 'self'; object-src 'none'; base-uri 'self'; connect-src 'self'; font-src 'self'; frame-src 'self'; img-src 'self' https://cdn.glitch.com; manifest-src 'self'; media-src 'self'; report-uri https://6001d285937fe147894b8848.endpoint.csper.io/; worker-src blob:;"
  );
  next();
});

// https://app.creately.com/diagram/wQLrajbJ5zH/edit
let fs = require("fs");

// Get sketch folders
let sketchFolders = getItems("sketches");

// Array of sketches, and their dynamic page
let sketches = [];
let sketchPages = [];

// Find sketch file and additionals
for (let i = 0; i < sketchFolders.length; i++) {
  let sketch = {
    fullName: getFullName(sketchFolders[i]),
    name: sketchFolders[i],
    main: null,
    additional: []
  };

  let sketchFiles = getItems(`sketches/${sketch.name}`);

  for (let i = 0; i < sketchFiles.length; i++) {
    let fileName = sketchFiles[i];
    if (fileName[0] === fileName[0].toUpperCase()) {
      sketch.additional.push(fileName);
    } else {
      sketch.main = fileName;
    }
  }

  // Create dynamic page from sketch
  let sketchPage = createSketchPage(sketch);

  sketches.push(sketch);
  sketchPages.push(sketchPage);
}

// Make main page with sketches
let mainPage = makeMainPage(sketches);

// Main page
app.get("/", (req, res) => {
  res.send(mainPage);
});

// Send sketch or style.css
app.get("/:sketch", (req, res) => {
  let sketchName = req.params.sketch;

  if (sketchName === "style.css") {
    res.sendFile(`${__dirname}/public/style.css`);
  } else if (sketchName === "p5.min.js") {
    res.sendFile(`${__dirname}/public/p5.min.js`)
  } else {
    for (let i = 0; i < sketches.length; i++) {
      if (sketches[i].name === sketchName) {
        res.send(sketchPages[i]);
      }
    }
  }
});

// Scripts
app.get("/:sketch/:script", (req, res) => {
  let sketchName = req.params.sketch;
  let scriptName = req.params.script;

  res.sendFile(`${__dirname}/sketches/${sketchName}/${scriptName}`);
});

// Get item names from a directory
function getItems(folderName) {
  let config = { withFileTypes: true };
  let items = [];
  items = fs
    .readdirSync(folderName, config)
    .filter(dirent => items.push(dirent || dirent.name));

  return items;
}

// Take sketch name and change it into a proper title
function getFullName(sketchName) {
  let fullName = sketchName.split("");

  for (let i = 0; i < fullName.length; i++) {
    if (i === 0) {
      fullName[i] = fullName[i].toUpperCase();
    }

    if (fullName[i] === "_") {
      fullName[i] = " ";
      fullName[i + 1] = fullName[i + 1].toUpperCase();
    }
  }

  fullName = fullName.join("");

  return fullName;
}

// Using info about a sketch, create a sketch page
function createSketchPage(sketch) {
  let sketchPage = "";
  let faviconLink =
    "https://cdn.glitch.com/a804a569-76e3-4174-a157-32c41926638a%2Fhilbert-curve.ico?v=1605799309728";

  let mainLink = `"${sketch.name}/${sketch.main}"`;

  let partOne = `<!DOCTYPE HTML>
  <html lang="en">
    <head>
      <title>${sketch.fullName}</title>
      
      <link rel="icon" type="image/x-icon" href=${faviconLink}>
      <link rel="stylesheet" type="text/css" href="style.css">
        
      <script src="/p5.min.js"}></script>\n
      <script src=${mainLink}></script>\n`;

  sketchPage += partOne;

  let additions = "";
  for (let i = 0; i < sketch.additional.length; i++) {
    let end = i !== sketch.additional.length ? "\n" : "";
    let additionScriptTag = `      <script src="${sketch.name}/${sketch.additional[i]}"></script>${end}`;

    additions += additionScriptTag;
  }
  sketchPage += additions;

  let partTwo = `
  </head>
    <body></body>
  </html>`;

  sketchPage += partTwo;

  return sketchPage;
}

function makeMainPage(sketches) {
  let mainPage = "";

  for (let i = 0; i < sketches.length; i++) {
    let sketchLink = `<a href="${sketches[i].name}">${sketches[i].fullName}</a><br>`;

    mainPage += sketchLink;
  }

  return mainPage;
}
