import express from "express";
import routes from "./routes.js";
import swaggerSetup from './swagger.js'; 

const app = express();
app.use(express.json());

app.use("/api", routes);
swaggerSetup(app); 

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
