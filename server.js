require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");  // ← ADDED
const cors = require('cors');   // ← moved

const achievementRoutes = require("./backend/routes/achievementRoutes")
const articleRoutes = require("./backend/routes/articleRoutes")
const bookmarkRoutes = require("./backend/routes/bookmarkRoutes")
const userRoutes = require("./backend/routes/userRoutes")

const app = express();

app.use(cors());

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Duplicate middleware (kept as-is)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend")));

// Routes (order preserved)
app.use("/api/achievements", achievementRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
const mongooseDatabase = process.env.MONGODB_URI || process.env.mongooseDatabase;

mongoose.connect(mongooseDatabase)
  .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
  .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });