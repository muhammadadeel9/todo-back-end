import express, { Request, Response } from "express";
import DbConnection from "./config/dbconfig";
import router from "./routes/index";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import cors from 'cors';
export  const app = express();
const PORT = process.env.PORT || 3200;


async function bootstrap() {
    await DbConnection();
}

bootstrap();
const allowedOrigins = [
  process.env.LOCAL_URL as string || "",
  process.env.FRONT_END_URI as string || "",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json());
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
