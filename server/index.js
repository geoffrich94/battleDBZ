const express = require("express"); // Web framework
const http = require("http"); // Node HTTP server
const { Server } = require("socket.io"); // WebSocket library
const cors = require("cors"); // Allows cross-origin requests

// Create an Express app
const app = express();

// Enable CORS (so your React frontend on port 3000 can talk to this server)
app.use(cors());

// Create a raw HTTP server from Express
const server = http.createServer(app);

// Create a new Socket.IO server attached to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
  },
});

// =======================================
// In-memory storage (temporary storage)
// =======================================

// Object to store active games
const games = {};

// Array to store players waiting for a match, Example: ["socketIdA", "socketIdB"]
let queue = [];

// NEW: Object to store player information (like username)
const players = {};

// HELPER: FIND GAME BY SOCKET ID
function findGameBySocket(socketId) {
  for (const gameId in games) {
    if (games[gameId].players.includes(socketId)) {
      return gameId;
    }
  }
  return null;
}


// When a new client connects
io.on("connection", (socket) => {
  // Each connected user gets a unique socket.id
  console.log("User connected with socket ID:", socket.id);

  // =======================================
  // MATCHMAKING SYSTEM
  // =======================================
  socket.on("find_match", ({ username }) => {
    console.log(username, "is looking for a match");

    // NEW: Store username with socket ID
    players[socket.id] = {
      username,
    };

    // Prevent duplicate entries in queue
    if (!queue.includes(socket.id)) {
      queue.push(socket.id);
    }

    // NEW: Log queue using usernames instead of socket IDs
    console.log(
      "Current queue (usernames):",
      queue.map((id) => players[id]?.username),
    );

    // If we have at least 2 players waiting
    while (queue.length >= 2) {
      // Remove first 2 players from queue
      const player1 = queue.shift();
      const player2 = queue.shift();

      // Create a unique game ID
      const gameId = `game_${player1}_${player2}`;

      // Store the game in memory
      games[gameId] = {
        players: [player1, player2],
        turn: player1,
        selections: {},
        ready: {},
      };

      // NEW: Log matched usernames
      console.log(
        "Creating game:",
        gameId,
        "between",
        players[player1]?.username,
        "and",
        players[player2]?.username,
      );

      // Get actual socket objects from their IDs
      const socket1 = io.sockets.sockets.get(player1);
      const socket2 = io.sockets.sockets.get(player2);

      // Join both players to a "room"
      // Rooms allow us to send messages only to players in that game
      if (socket1) socket1.join(gameId);
      if (socket2) socket2.join(gameId);

      // Send match_found event to BOTH players in that room
      // NEW: Include usernames in the payload
      io.to(player1).emit("match_found", {
        gameId,
        role: "player1",
        opponent: players[player2]?.username,
      });

      io.to(player2).emit("match_found", {
        gameId,
        role: "player2",
        opponent: players[player1]?.username,
      });

      console.log("Match emitted to room:", gameId);
    }
  });

  // ===============================
  // CHARACTER SELECTION
  // ===============================
  socket.on("character_selected", ({ character }) => {
    const gameId = findGameBySocket(socket.id);

    if (!gameId) return;

    const game = games[gameId];

    console.log("Character selected by:", socket.id);

    // ✅ STORE selection
    game.selections[socket.id] = character;

    // ✅ SEND to opponent
    socket.to(gameId).emit("opponent_selected", character);

    // ✅ CHECK if both players selected
    if (Object.keys(game.selections).length === 2) {
      console.log("Both players selected characters");

      io.to(gameId).emit("both_players_selected", {
        selections: game.selections,
      });
    }
  });

  socket.on("player_ready", () => {
    const gameId = findGameBySocket(socket.id);
    if (!gameId) return;

    const game = games[gameId];

    console.log("Player ready:", socket.id);

    // ✅ Mark this player as ready
    game.ready[socket.id] = true;

    // OPTIONAL: notify opponent
    socket.to(gameId).emit("opponent_ready");

    // ✅ Check if BOTH players are ready
    if (Object.keys(game.ready).length === 2) {
      console.log("Both players ready → starting game");

      io.to(gameId).emit("start_battle");
    }
  });

  // =======================================
  // DISCONNECT HANDLING
  // =======================================

  socket.on("disconnect", () => {
    const disconnectedUsername = players[socket.id]?.username;

    console.log("User disconnected:", disconnectedUsername || socket.id);

    // 1️⃣ Remove player from matchmaking queue if they were waiting
    queue = queue.filter((id) => id !== socket.id);

    // 2️⃣ Check if this player was part of any active game
    for (const gameId in games) {
      const game = games[gameId];

      // If this socket was one of the players
      if (game.players.includes(socket.id)) {
        console.log("Player", disconnectedUsername, "was in game:", gameId);

        // Notify the OTHER player that opponent disconnected
        socket.to(gameId).emit("player_disconnected", {
          message: "Opponent disconnected. Game ended.",
        });

        // Delete the game from memory
        delete games[gameId];

        console.log("Deleted game:", gameId);
      }
    }

    // NEW: Remove player from stored player list
    delete players[socket.id];
  });
});

// =======================================
// Start the server
// =======================================

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
