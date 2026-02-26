import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Secure Task Management API",
            version: "1.0.0",
            description:
                "REST API for the Secure Task Management application. Supports user authentication and full CRUD task management.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description:
                        'Enter your JWT access token. Example: **eyJhbGci...**',
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
                        name: { type: "string", example: "[USER_NAME]" },
                        email: { type: "string", example: "[EMAIL_ADDRESS]" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                Task: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
                        title: { type: "string", example: "Buy groceries" },
                        description: { type: "string", example: "Milk, eggs, bread" },
                        completed: { type: "boolean", example: false },
                        userId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                AuthTokens: {
                    type: "object",
                    properties: {
                        accessToken: { type: "string", example: "eyJhbGci..." },
                        refreshToken: { type: "string", example: "eyJhbGci..." },
                    },
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Error message" },
                    },
                },
                SuccessResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Operation successful" },
                        data: { type: "object" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
