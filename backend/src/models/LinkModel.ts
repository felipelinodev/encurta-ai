import mongoose, { Schema, Document } from 'mongoose';

export interface Link extends Document {
    url: string;
    shortUrl: string;
    clickCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const LinkSchema = new Schema<Link>(
    {
        url: { type: String, required: true },
        shortUrl: { type: String, required: true, unique: true },
        clickCount: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default mongoose.model<Link>('Link', LinkSchema);