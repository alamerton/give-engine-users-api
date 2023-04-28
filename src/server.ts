import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/User.route";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", userRoutes);

const port = 5001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
