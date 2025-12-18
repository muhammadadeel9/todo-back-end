import express, { Request, Response } from "express";
import DbConnection from "./config/dbconfig";
import router from "./routes/index";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import cors from 'cors';
export const app = express();
const PORT = process.env.PORT || 3200;


async function bootstrap() {
  await DbConnection();
}

bootstrap();
// Source - https://stackoverflow.com/a
// Posted by Sohail Ahmad, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-18, License - CC BY-SA 4.0

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

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
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
