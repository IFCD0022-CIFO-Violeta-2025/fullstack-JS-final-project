import express from 'express'
import config from "./config/config.js";
//import notFound from "./middlewares/error.middleware.js";
import notFound from "./middlewares/error.middleware.js"

const api = express();
// middleware config  
api.use(express.json());

//ANTIGUA LLAMADA
//api.use("/api/v1", relationRoutes);

//NUEVA LLAMADA
import routes from "./routes/index.js";
api.use("/api/v1", routes);

api.use(notFound);



api.listen(config.api_port, () => {
    console.log(`===========================================`)
    console.log(`Servidor corriendo en puerto ${config.api_port}`)
    console.log(`URL http://localhost:${config.api_port}`)
    console.log(`===========================================`)
});