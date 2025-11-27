const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

const mongooseDatabase = "";
mongoose.connect(mongooseDatabase)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error(err));

app.use("/backend", achievementRoute.js);
app.use("/backend", articleRoutes.js);
app.use("/backend", bookMarkRoutes.js);
app.use("/backend", userRoute.js);

const PORT = 3000;
app.listen(
    PORT, 
    () => console.log(`Server running on http://localhost:${PORT}`));
