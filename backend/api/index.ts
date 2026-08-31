import mongoose from 'mongoose';
import app from '../src/app';

let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        throw new Error('MONGO_URI não está definida');
    }

    await mongoose.connect(MONGO_URI);
    isConnected = true;
}

export default async function handler(req: any, res: any) {
    await connectDB();
    app(req, res);
}
