const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
// const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

async function start() {
  try {
    // mongoose.connection.once("open", () => {
    //   initDatabase();
    // });
    await mongoose.connect(config.get("mongoUri"));
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    );
  } catch (error) {
    console.log(chalk.red(error.message));
  }
}

start();

if (process.env.NODE_ENV === "production") {
  console.log("Production");
} else {
  console.log("Development");
}
