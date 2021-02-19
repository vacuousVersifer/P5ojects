// let sketches = new Array();
// let main_page = "";

// for (let i = 0; i < sketches.length; i++) {
//   let sketch_link = `<li><a href='${sketches[i].name}'>${sketches[i].full_name}</a></li>`;

//   main_page += sketch_link;
// }

// console.log(main_page);

$(document).ready(() => {
    const socket = io();

    console.log("Hello, world!")

    socket.emit("get sketches");
    socket.on("got sketches", sketches => {
        console.log(sketches);
    })
})