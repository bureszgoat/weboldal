// server.js
require('dotenv').config(); // Még mindig itt van, hátha később kellenek környezeti változók
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
// Statikus fájlok kiszolgálása a 'public' mappából
app.use(express.static(path.join(__dirname, 'public')));

// --- Útvonalak ---

// Kezdőlap - a public mappában lévő HTML fájlt szolgálja ki
app.get('/', (req, res) => {
  // Az express.static middleware automatikusan kezeli az index.html-t,
  // de ha a fájl neve 'oldal.html', akkor explicit kell küldeni.
  res.sendFile(path.join(__dirname, 'public', 'oldal.html'));
});

// --- Szerver indítása ---
app.listen(PORT, () => console.log(`Szerver fut a http://localhost:${PORT} címen`));
