const express = require("express");
const path = require("path");
const { IndentStyle } = require("typescript");

const app = express();

const port = process.env.PORT || 5000;
const appPath = path.join(__dirname, "../", "dist", "istex-uppa");
const indexPath = path.join(appPath, "index.html");
console.log(indexPath);

app.use(express.static(appPath));

app.get("*", (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log("application running on port", port);
});
