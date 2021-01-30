const fs = require('fs');

const get_items = require('./get_items.js');
const Sketch = require('./Sketch.js');

module.exports = () => {
	// Sketches
	let sketches = [];

	// Get sketch folders
	let sketch_folders = get_items('sketches');
	
	for(let i = 0; i < sketch_folders.length; i++) {
		let sketch = new Sketch(sketch_folders[i]);
		sketches.push(sketch);
	}

	return sketches;
}
