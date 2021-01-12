var express = require("express");
var app = express();

let fs = require("fs");

let sketches = [];
let htmlSketches = [];
let sketch_folders = [];
sketch_folders = fs
  .readdirSync("sketches", { withFileTypes: true })
  .filter(dirent => sketch_folders.push(dirent));

app.use(express.static("node_modules/p5/lib"));

app.get("/", (req, res) => {
	getSketches();
	getHTMLSketches();

  let title = "p5.js Projects";
  let favicon =
    "https://cdn.glitch.com/a804a569-76e3-4174-a157-32c41926638a%2Fhilbert-curve.ico?v=1605799309728";
  let indexPage = `<!DOCTYPE>
                   <html lang="en">
                     <head>
                       <title>${title}</title>
                       <link rel="icon" type="image/x-icon" href=${favicon}>
                       <style>
                         html,
                         body {
                           padding: 0;
                           margin: 0;
                         }
                       </style
                     </head>
                     <body>
                       ${htmlSketches}
                     </body>
                   </html>`;

  res.send(indexPage);
});

app.get("/:sketch", (req, res) => {
  reqName = req.params.sketch;

  if (reqName.endsWith(".js")) {
    for (let i = 0; i < sketch_folders.length; i++) {
    	let sketchesInFolder = [];
			sketchesInFolder = fs
		 .readdirSync(`${__dirname}/sketches/${sketch_folders[i].name}/`)
		 .filter(dirent => sketchesInFolder.push(dirent));
    	
    	let index = sketchesInFolder.indexOf(reqName);
    	if(index !== -1) {
    		res.sendFile(`${__dirname}/sketches/${sketch_folders[i].name}/${reqName}`);
    	}
    }
  } else {
    getSketches();
    
    let sketch;
    for(let i = 0; i < sketches.length; i++) {
    	if(sketches[i].sketch_name === reqName) {
    		sketch = sketches[i]
    	}
    }
    
    res.send(makeSketchPage(sketch));
  }
});

function getSketches() {
	 sketches = [];
	 
	 for (let i = 0; i < sketch_folders.length; i++) {
    let sketch_name = sketch_folders[i].name;
    let name = sketch_name.split("");

    for (let j = 0; j < name.length; j++) {
      if (j === 0) {
        name[j] = name[j].toUpperCase();
      }

      if (name[j] === "_") {
        name[j] = " ";
        name[j + 1] = name[j + 1].toUpperCase();
      }
    }

    name = name.join("");

    let sketch = {
      name: name,
      sketch_name: sketch_name
    };
    
  sketches.push(sketch);
	}
}

function getHTMLSketches() {
	htmlSketches = [];
	
	for(let i = 0; i < sketches.length; i++) {
		let sketch_name = sketches[i].sketch_name;
		let name = sketches[i].name;
		
		let htmlSketch = `<a href="${sketch_name}">${name}</a><br>`;
		htmlSketches.push(htmlSketch);
	}
  
  htmlSketches = htmlSketches.join("");
}

function makeSketchPage(sketch) {
	let name = sketch.name;
	let sketch_name = sketch.sketch_name;
	
	let pageHTMLSketches = [];
	let pageSketches = [];
	pageSketches = fs.readdirSync(`${__dirname}/sketches/${sketch_name}`).filter(dirent => pageSketches.push(dirent));
	
	for(let i = 0; i < pageSketches.length; i++) {
		let pageHTMLSketch = `<script src="${pageSketches[i]}"></script>`;
		
		pageHTMLSketches.push(pageHTMLSketch);
	}
	
	pageHTMLSketches = pageHTMLSketches.join("");
	
	
	let title = name;
  let favicon =
    "https://cdn.glitch.com/a804a569-76e3-4174-a157-32c41926638a%2Fhilbert-curve.ico?v=1605799309728";
  let sketchPage = `<!DOCTYPE>
                   <html lang="en">
                     <head>
                       <title>${title}</title>
                       <link rel="icon" type="image/x-icon" href=${favicon}>
                       <script src="p5.min.js"></script>
                       ${pageHTMLSketches}
                       <style>
                         html,
                         body {
                           padding: 0;
                           margin: 0;
                         }
                       </style
                     </head>
                     <body>
                     </body>
                   </html>`;
                   
  return sketchPage;
}

// listen for requests :)
var listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
