import express from 'express'
import config from "./config/config";
import relationRoutes from "./routes/relations.routes";
import notFound from "./middlewares/error.middleware";

const api = express();
// middleware config  
api.use(express.json());
api.use("/api/v1", relationRoutes);
api.use(notFound);

api.listen(config.api_port, () => {
    console.log(`===========================================`)
    console.log(`Servidor corriendo en puerto ${config.api_port}`)
    console.log(`URL http://localhost:${config.api_port}`)
    console.log(`===========================================`)
});