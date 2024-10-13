import express from "express";
import dotenv from "dotenv";
import decisionRoute from "./routes/decisionTreeRoute";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Decision tree processing backend server is running');
});

app.use("/api/decisiontree", decisionRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});