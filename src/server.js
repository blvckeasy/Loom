import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { Send } from "./queue.js";
import { Redis } from "./redis/redis.js";

async function main () {
    dotenv.config({ path: ".env" })
    
    await Redis.connect()

    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));

    app.post('/send', function (req, res) {
        const rabbit = new Send().execute(req.body);

        res.json({
            status: "OKE",
            statusCode: 201,
            message: 'Message success send to rabbitmq server.'
        });
    })

    app.listen(3000, () => {
        console.log(`ExpressJS started on port`, 3000);
    })
}

main();