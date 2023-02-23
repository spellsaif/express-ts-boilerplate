import { Response, Express} from "express";
import createServer  from "./utils/createServer";
import { SERVER_PORT } from "./constants";
import logger from "./utils/logger";

function gracefulShutdown(signal:string) {
    process.on(signal, async() => {
        logger.info(`Goodbye! Got signal ${signal}`);
        logger.info("server is exiting...");
        process.exit(0);
    })
}

async function main(){
    const app = createServer();
    
    try{

       app.get("/healthcheck", (_,res:Response) => {
            return res.status(200).send("Everything is working!");
       })

        app.listen(SERVER_PORT,()=> {
            logger.info(`server is running at http://localhost:${SERVER_PORT}`);    
        })

    } catch(e){

        logger.error(e);
        process.exit(1);

    }

    const signals = ["SIGTERM", "SIGINT"];

    for(let i = 0; i != signals.length; i++) {
        gracefulShutdown(signals[i]);
    }
}


main();