const express = require("express");
const mongoose = require("mongoose");

const achievementRoute = require("./backend/routes/achievementRoute")
const articleRoutes = require("./backend/routes/articleRoutes")
const bookmarkRoutes = require("./backend/routes/bookmarkRoutes")
const userRoute = require("./backend/routes/userRoute")

const app = express();
app.use(express.json());

const mongooseDatabase = 
"mongodb+srv://taggregator:DN0u5T1np1XQg99d@cluster0.ooabijw.mongodb.net/?appName=Cluster0";
mongoose.connect(mongooseDatabase)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error(err));

app.use("/backend", achievementRoute.js);
app.use("/backend", articleRoutes.js);
app.use("/backend", bookmarkRoutes.js);
app.use("/backend", userRoute.js);

const PORT = 3000;
app.listen(
    PORT, 
    () => console.log(`http://localhost:${PORT}`));
