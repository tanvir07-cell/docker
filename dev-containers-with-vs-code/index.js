// for stop the server using ctrl+c:

if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
  });

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

process.on("SIGINT", function () {
  //graceful shutdown
  process.exit();
});

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Success GET /" });
});

app.listen(3000, () => {
  console.log(`Server is on http://localhost:3000`);
});
