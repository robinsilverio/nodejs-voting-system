import e from "express";
import { startDatabaseConnection } from "./dbclient.js";
import router, { sendResponse } from "./server-routes.js";
import { statusCodes } from "./src/enums/status-codes.js";

const PORT = process.env.PORT || 3000;
const app = e();

startDatabaseConnection();

app.use('/', router);

app.use((req, res) => {
    sendResponse(res, statusCodes.NOT_FOUND, { error: "Route not found" });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export { app, server };
