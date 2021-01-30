module.exports = sketches => {
	let main_page = '';

	for(let i = 0; i < sketches.length; i++) {
		let sketch_link = `<a href='${sketches[i].name}'>${sketches[i].full_name}</a><br>`;

		main_page += sketch_link;
	}

	return main_page;
}
