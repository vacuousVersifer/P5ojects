const get_items = require("./get_items.js");

const p5js_cdn = "https://cdn.jsdelivr.net/npm/p5@1.2.0/lib/p5.min.js";

module.exports = class Sketch {
  constructor(name) {
    this.name = name;
    this.full_name = this.get_full_name(this.name);
    this.files = this.get_files(this.name);
    this.page = this.make_sketch_page(this);
  }

  get_full_name(name) {
    let full_name = name.split("");

    for (let i = 0; i < full_name.length; i++) {
      if (i === 0) {
        full_name[i] = full_name[i].toUpperCase();
      }

      if (full_name[i] === "_") {
        full_name[i] = " ";
        full_name[i + 1] = full_name[i + 1].toUpperCase();
      }
    }

    full_name = full_name.join("");

    return full_name;
  }

  get_files(name) {
    let files = {
      main: null,
      additional: new Array()
    };

    let sketch_files = get_items(`sketches/${name}`);

    for (let i = 0; i < sketch_files.length; i++) {
      let file_name = sketch_files[i];

      if (file_name[0] === file_name[0].toUpperCase()) {
        files.additional.push(file_name);
      } else {
        files.main = file_name;
      }
    }

    return files;
  }

  make_sketch_page(sketch) {
    let main_link = `"${sketch.name}/${sketch.files.main}"`;
    let sketch_page = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${sketch.full_name}</title>
        
    <meta name=description content="A simple site for p5js projects">
    <meta name="viewport" content="width=device-width, initial-scale=1">
        
		<link rel="stylesheet" type="text/css" href="sketch.css">
    
    <script src="${p5js_cdn}" defer></script>
		<script src=${main_link} defer></script>`;

    let additions = "";

    let length = sketch.files.additional.length;

    for (let i = 0; i < length; i++) {
      let end = i !== length ? "\n" : "";
      let addition_tag = `<script src=${sketch.name}/${sketch.files.additional[i]}></script>${end}`;

      sketch_page += addition_tag;
    }

    sketch_page += `  </head>
  <body>
    <div class="header" id="name_header">
        <span class="header">${sketch.full_name}</span>
        <a class="back" href="/">Back</a>
      </div>
      <div id="canvas_container"></div>
  </body>
</html>`;

    return sketch_page;
  }
};
