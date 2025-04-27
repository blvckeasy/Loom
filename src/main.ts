import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { server } from "./infrastructure/express";
import { rabbitmq } from "./infrastructure/rabbitmq";
import { mongodb } from './infrastructure'


async function bootstrap () {
    const protocol  = process.env.SERVER_PROTOCOL       || "http";
    const host      = process.env.SERVER_HOST           || "0.0.0.0";
    const port      = Number(process.env.SERVER_PORT)   || 3000;
    const url       = `${protocol}://${host}:${port}/`
    
    await mongodb.init();
    await rabbitmq.init();

    server.listen(port, host, () => {
        console.log(`server is running. URL: ${url}`);
    })
}

bootstrap();