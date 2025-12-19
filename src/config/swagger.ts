import swaggerJsDoc from "swagger-jsdoc";
const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API Documentation",
      version: "1.0.0",
      description: "A comprehensive Todo API with authentication and task management",
      contact: {
        name: "M adeel",
        email: "",
        url: "https://todo-back-end-five.vercel.app",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server",
      },
      {
        url: "https://todo-back-end-five.vercel.app/api",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        // Define reusable schemas here
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "User ID",
              example: "507f1f77bcf86cd799439011",
            },
            name: {
              type: "string",
              description: "User's full name",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
              example: "john@example.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Account creation date",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update date",
            },
          },
        },
        Task: {
          type: "object",
          required: ["title", "description"],
          properties: {
            _id: {
              type: "string",
              description: "Task ID",
              example: "507f1f77bcf86cd799439011",
            },
            title: {
              type: "string",
              description: "Task title",
              example: "Complete project documentation",
            },
            description: {
              type: "string",
              description: "Task description",
              example: "Write comprehensive API documentation",
            },
            completed: {
              type: "boolean",
              description: "Task completion status",
              example: false,
            },
            userId: {
              type: "string",
              description: "ID of the user who created the task",
              example: "507f1f77bcf86cd799439011",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            statusCode: {
              type: "integer",
              example: 400,
            },
            message: {
              type: "string",
              example: "Error message",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            statusCode: {
              type: "integer",
              example: 200,
            },
            data: {
              type: "object",
            },
            message: {
              type: "string",
              example: "Operation successful",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "Authentication endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Tasks",
        description: "Task management endpoints",
      },
    ],
  },
  apis: ["./src/modules/**/*.routes.ts", "./src/modules/**/*.controller.ts"],
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);