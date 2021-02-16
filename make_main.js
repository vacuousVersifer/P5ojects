module.exports = sketches => {
  let main_page = `<!DOCTYPE html>
	<html lang='en'>
	  <head>
	    <title>p5rojects</title>
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

	    <link rel='stylesheet' type='text/css' href='main.css'>
	  </head>
	  <body>
      <div class="header">
        <h1>p5ojects</h1>
      </div>
	
      <div class="col-3 menu">
	      <ul>`;

  for (let i = 0; i < sketches.length; i++) {
    let sketch_link = `<li><a href='${sketches[i].name}'>${sketches[i].full_name}</a></li>`;

    main_page += sketch_link;
  }

  main_page += `
	  </ul>
  </div>
	</body>
	</html>`;

  return main_page;
};
