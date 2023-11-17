import net from "net";
import fs from "fs";
import config from "./config";
import { JabFRequest } from "./classes/Request";
const server = net.createServer();
server.listen();
const httpServer = net.createServer(function (socket) {
  socket.on("data", function (data) {
    // logging request to console
    console.log(data.toString());

    // creating request object out of this data
    const request: JabFRequest = new JabFRequest(data);
    console.log(request);
  });
});
httpServer.listen(config.PORT, "localhost");
console.log(`jab-f ready to listen at port ${config.PORT}`);
