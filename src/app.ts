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

const allowedOrigins = [
  process.env.FRONT_END_URI,
  process.env.LOCAL_HOST_URI,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean); 

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['set-cookie']
}));

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






// import express, { Request, Response } from "express";
// import DbConnection from "./config/dbconfig";
// import router from "./routes/index";
// import { swaggerSpec } from "./config/swagger";
// import swaggerUi from "swagger-ui-express";
// import cors from 'cors';
// export const app = express();
// const PORT = process.env.PORT || 3200;


// async function bootstrap() {
//   await DbConnection();
// }

// bootstrap();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//   next();
// });


// app.use(cors());
// app.use(cors({
//   origin: [process.env.FRONT_END_URI as string || "", process.env.LOCAL_URL as string || ""],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, {
//     explorer: true,
//     customCss: ".swagger-ui .topbar { display: none }",
//     customSiteTitle: "Todo API Documentation",
//   })
// );
// app.get("/api-docs.json", (req: Request, res: Response) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(swaggerSpec);
// });
// app.use("/api", router);
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
