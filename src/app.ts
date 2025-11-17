import express, { Request, Response } from "express";
import DbConnection from "./config/dbconfig";
import router from "./routes/index";
import ServerlessHttp from "serverless-http";

const app = express();
// const PORT = process.env.PORT || 3200;
// Middleware
DbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

exports.handler = ServerlessHttp(app);
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
