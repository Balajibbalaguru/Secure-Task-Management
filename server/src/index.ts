import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/auth.routes.js";
import { taskRouter } from "./routes/task.routes.js";
import { sendError } from "./lib/response.js";
import { HTTP_STATUS } from "./constants/http.js";
import { swaggerSpec } from "./config/swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Secure Task API Docs",
    swaggerOptions: {
        persistAuthorization: true,
    },
}));

// Raw OpenAPI JSON spec
app.get("/api-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.use((_req, res) => {
    sendError(res, "Route not found", HTTP_STATUS.NOT_FOUND);
});

const start = async (): Promise<void> => {
    await connectDB();
    const port = process.env["PORT"] ?? 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}...`);
        console.log(`Swagger UI → http://localhost:${port}/api-docs`);
    });
};

start();
