import express, { Request, Response } from "express";
import DbConnection from "./config/dbconfig";
import router from "./routes/index";

export const app = express();
const PORT = process.env.PORT || 3200;
// Middleware
DbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
