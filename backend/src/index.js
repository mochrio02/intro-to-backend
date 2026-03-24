import { setDefaultResultOrder, setServers } from "dns";
setDefaultResultOrder("ipv4first");
setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(` Server is running at port : 
      ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("MongoDB connection failed!!!", err);
  }
};

startServer();
