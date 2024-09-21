import e from "express";
import { startDatabaseConnection } from "./dbclient.js";
import router, { sendResponse } from "./server-routes.js";
import { statusCodes } from "./src/enums/status-codes.js";

const PORT = process.env.PORT || 3000;
const app = e();

startDatabaseConnection();

// Manually add CORS headers to all responses
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081"); // Allow specific origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
    res.header("Access-Control-Allow-Credentials", "true"); // If you need to allow cookies/auth

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // Send 204 status for preflight
    }

    next();
});

// Use the router
app.use('/', router);

// Middleware for handling undefined routes (404)
app.use((req, res) => {
    sendResponse(res, statusCodes.NOT_FOUND, { error: "Route not found" });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export { app, server };
