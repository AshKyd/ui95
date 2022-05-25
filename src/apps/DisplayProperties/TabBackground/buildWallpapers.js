const fs = require("fs");
const icons = {};
const extension = /\.gif$/;

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return (
    "data:image/" +
    file.substr(file.length - 3) +
    ";base64," +
    new Buffer.from(bitmap).toString("base64")
  );
}

const files = fs
  .readdirSync("./wallpapers")
  .filter(file => file.match(extension))
  .forEach(file => {
    icons[file.replace(extension, "")] = base64_encode("./wallpapers/" + file);
  });

console.log("export default " + JSON.stringify(icons));
