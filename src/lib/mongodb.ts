
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

type CachedMongoose = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

const cached = (globalThis as unknown as { mongooseCache: CachedMongoose }).mongooseCache || {conn: null, promise: null};

export async function connectDB(): Promise<typeof mongoose> {
    if (cached.conn &&  cached.conn.connection.readyState === 1) {
        return cached.conn;
    }

    if(cached.promise) {
        cached.conn = await cached.promise;
        return cached.conn;
    }

    console.log('Establishing a new connection to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
    }).then((res) => {
        cached.conn = res;
        cached.promise = null;
        return res;
    }).catch((error) => {
        console.error("MongoDB connection error:", error);
        cached.promise = null;
        throw error;
    })

    cached.conn = await cached.promise;

   (globalThis as unknown as { mongooseCache: CachedMongoose }).mongooseCache = cached;

   return cached.conn;

}