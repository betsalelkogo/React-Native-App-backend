import server from "./server";
import io from "./socket_server";
io(server);

server.listen(process.env.PORT, async () => {
  console.log("Server started");
});

export = server;
