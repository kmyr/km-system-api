const http = require("http");
const WebSocketServer = require("websocket").server;
const server = http.createServer();
server.listen(9898, () => {
  console.log("Server Is Running");
});
const wsServer = new WebSocketServer({
  httpServer: server,
});
wsServer.on("request", function (request) {
  const connection = request.accept(null, request.origin);
  connection.on("message", function (message) {
    const recivedMessage = JSON.parse(message.utf8Data)
   if (recivedMessage.name === "new order") {
      console.log("Received Message:", message.utf8Data);
    connection.sendUTF(message.utf8Data);
   }

    if (message.utf8Data === "kamyar") {
      console.log("Received Message:", message.utf8Data);
      connection.sendUTF("Hi this is WebSocket server!");
      connection.sendUTF("s");
    }
    // console.log("Received Message:", message.utf8Data);
    // connection.sendUTF("Hi this is WebSocket server!");
    // connection.sendUTF("s");
  });
  connection.on("close", function (reasonCode, description) {
    console.log("Client has disconnected.");
  });
});
