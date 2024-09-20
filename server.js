import e from "express";
import { startDatabaseConnection } from "./dbclient.js";
import router from "./server-routes.js";

const PORT = process.env.PORT || 3000;
const app = e();

startDatabaseConnection();

app.use('/', router);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export { app, server };
