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

// Apaga automaticamente os documentos 7 dias após a criação
LinkSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

export default mongoose.model<Link>('Link', LinkSchema);
