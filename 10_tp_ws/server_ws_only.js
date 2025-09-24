// installer d'abord : npm install ws
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Nouveau client connecté !");

  ws.on("message", (message) => {
    console.log(`Reçu : ${message}`);

    // renvoyer le message à tous les clients connectés
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(`Echo: ${message}`);
      }
    });
  });

  ws.send("Bienvenue sur le serveur WebSocket !");
});

console.log("Serveur WebSocket lancé sur ws://localhost:8080");