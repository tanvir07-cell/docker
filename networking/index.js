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

// more-or-less the example code from the hapi-pino repo
const hapi = require("@hapi/hapi");
const { MongoClient } = require("mongodb");
const url = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017";
const dbName = "dockerApp";
const collectionName = "count";

async function start() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const server = hapi.server({
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  });

  server.route({
    method: "GET",
    path: "/",
    async handler() {
      const count = await collection.count();
      return {
        success: false,
        count,
        rifatIsCool: true,
        another: "false",
        oneMore: "true",
      };
    },
  });

  server.route({
    method: "GET",
    path: "/add",
    async handler() {
      const res = await collection.insertOne({});
      return { inserted: res.insertedCount };
    },
  });

  await server.register({
    plugin: require("hapi-pino"),
    // options: {
    //   prettyPrint: true,
    // },
  });

  await server.start();

  return server;
}

start().catch((err) => {
  console.log(err);
  process.exit(1);
});
