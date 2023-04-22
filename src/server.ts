import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/User.route";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
