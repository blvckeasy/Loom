import mongoose from 'mongoose';

class MongoDB {
    private _connection!: mongoose.Mongoose;
    private URL: string = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE_NAME}`;

    async init () {
        this._connection = await mongoose.connect(this.URL);
        return this;
    }

    get connection (): mongoose.Mongoose {
        return this._connection;
    }
}

export default new MongoDB()