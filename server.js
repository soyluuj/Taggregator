const express = require("express");
const mongoose = require("mongoose");

const achievementRoutes = require("./backend/routes/achievementRoutes")
const articleRoutes = require("./backend/routes/articleRoutes")
const bookmarkRoutes = require("./backend/routes/bookmarkRoutes")
const userRoutes = require("./backend/routes/userRoutes")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongooseDatabase = 
"mongodb+srv://taggregator:DN0u5T1np1XQg99d@cluster0.ooabijw.mongodb.net/?appName=Cluster0";
mongoose.connect(mongooseDatabase)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error(err));

app.use("/api/achievements", achievementRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(
    PORT, 
    () => console.log(`http://localhost:${PORT}`));
