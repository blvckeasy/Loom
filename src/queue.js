import amqp from "amqplib";
import dotenv from 'dotenv';

dotenv.config({ path: ".env" });

export class Send {
    constructor() {
        this.QUEUE = "mediumQueue";
    }

    async execute(payload) {
        try {
            const channel = await connection.createChannel();

            await channel.assertQueue(this.QUEUE, { durable: false });

            const data = JSON.stringify(payload);
            channel.sendToQueue(this.QUEUE, Buffer.from(data));
            console.log("Xabar yuborildi:", data);

            // Optional: connection & channel'ni yopish
            setTimeout(() => {
                channel.close();
            }, 100);
        } catch (error) {
            console.error("Xatolik:", error);
        }
    }
}
