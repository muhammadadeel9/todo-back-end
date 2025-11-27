import express, { Request, Response } from "express";
import DbConnection from "./config/dbconfig";
import router from "./routes/index";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import cors from 'cors';
export  const app = express();
const PORT = process.env.PORT || 3200;


DbConnection().catch((err) => {
    console.error("Database connection failed:", err);
  });
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Todo API",
    docs: "/api-docs",
    version: "1.0.0",
  });
});
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Todo API Documentation",
  })
);
app.get("/api-docs.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api" ,router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
