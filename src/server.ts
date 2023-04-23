import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/User.route";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);

// const port = process.env.PORT || 5001;
const port = 5001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
