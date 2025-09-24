// installer express en plus : npm install express ws
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();
app.use(express.static(".")); // sert index.html depuis le dossier courant

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connecté !");
  ws.send("Bienvenue 👋");

  ws.on("message", (msg) => {
    console.log("Reçu:", msg.toString());
    // broadcast
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});

server.listen(8080, () => {
  console.log("Serveur HTTP+WS sur http://localhost:8080");
}); 