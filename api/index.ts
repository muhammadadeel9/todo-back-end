// import app from "../src/app";
// import DbConnection from "../src/config/database";
import {app} from '../src/app';
import DbConnection from '../src/config/dbconfig'
// Initialize database connection
DbConnection().catch((err) => {
  console.error("Database connection failed:", err);
});

// Export the Express app as serverless function
export default app;