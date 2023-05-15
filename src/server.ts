import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/User.route";

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use("/", userRoutes);

const port = 5001;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default server;
