import amqp from 'amqplib';


async function consumer() {
    try {
        const URL = `amqp://${process.env.RABBIT_USERNAME}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}/`;
        const QUEUE = "mediumQueue";

        const connection = await amqp.connect(URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE, { durable: false });

        console.log("Consumer ishlayapti...");

        channel.consume(QUEUE, (msg) => {
            if (msg !== null) {
                console.log("Xabar qabul qilindi:", msg.content.toString());
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error("Consumer xatosi:", error);
    }
}

consumer()