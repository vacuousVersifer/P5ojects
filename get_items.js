const fs = require("fs");

const config = { withFileTypes: true };
module.exports = folder_name => {
  let items = new Array();

  items = fs
    .readdirSync(folder_name, config)
    .filter(dirent => items.push(dirent));

  for (let i = 0; i < items.length; i++) {
    items[i] = items[i].name;
  }

  return items;
};
