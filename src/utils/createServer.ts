import cors from "cors";
import express from "express";
import helmet from "helmet";
import { CORS_ORIGIN } from "../constants";


const createServer = () => {
    const app = express();

    /* Middlewares */
    
    //CORS
    app.use(cors({
        origin:CORS_ORIGIN,
        credentials:true
    }))

    //HELMET
    app.use(helmet());

    return app;
}

export default createServer;