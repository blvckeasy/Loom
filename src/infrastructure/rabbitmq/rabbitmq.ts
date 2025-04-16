import amqp, { ChannelModel, Channel } from 'amqplib';

class RabbitMQ {
    private connection!: ChannelModel;
    private URL = `amqp://${process.env.RABBIT_USERNAME}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}/`;

    constructor() {}

    async init() {
        this.connection = await amqp.connect(this.URL);
    }

    async send(queueName: string, payload: any): Promise<object> {
        const channel: Channel = await this.connection.createChannel();

        await channel.assertQueue(queueName, { durable: false });

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));

        await channel.close();

        return {
            ok: true,
            queueName,
        };
    }

    async consume(queueName: string, onMessage: (data: any) => void) {
        const channel: Channel = await this.connection.createChannel();

        await channel.assertQueue(queueName, { durable: false });

        await channel.consume(queueName, (msg) => {
            if (msg) {
                const data = JSON.parse(msg.content.toString());
                onMessage(data); // handle the message
            }
        }, { noAck: true });

        // Channelni yoping demagan ma'qul, chunki `consume` davom etadi
    }
}

export default new RabbitMQ();