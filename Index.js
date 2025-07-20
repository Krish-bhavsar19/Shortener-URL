require("dotenv").config();

const express = require("express");
const { connectmongo } = require("./connection");
const URL = require("./Models/url");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlRoute = require("./Routes/routes");
const staticRouter = require("./Routes/staticRouter");
const userRoute = require("./Routes/user");
const { restrictToLoggedinUserOnly } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./View"));

const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", staticRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) return res.status(404).send("Short URL not found");

  return res.redirect(entry.redirectURL);
});

connectmongo(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
