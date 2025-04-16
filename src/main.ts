import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { server } from "./infrastructure/express";
import { rabbitmq } from './infrastructure/rabbitmq';

async function bootstrap () {
    await rabbitmq.init();

    server.listen(3000, () => {
        console.log("server is listening on *3000 port")
    })
}

bootstrap();