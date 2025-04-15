import amqp from "amqplib";

export class Redis {
    URL = `amqp://${process.env.RABBIT_USERNAME}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}/`;
    connection = null;

    async connect () {
        this.connection = await amqp.connect(this.URL);
    }

    async close () {
        this.connection.close();
    }
}

export default new Redis();