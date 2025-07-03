import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("MONGODB URI String Missing! Please define the MONGODB_URI");
}

// Declare the cached variable on the global object for persistence across hot-reloads
// and ensure its type is correctly inferred or asserted.
// We'll use a more direct way to define its structure here.
type CachedMongoose = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// Use `globalThis` which is a standard way to access the global scope in Node.js and browsers.
const cached = (globalThis as unknown as { mongooseCache: CachedMongoose }).mongooseCache || { conn: null, promise: null };

export async function connectDB(): Promise<typeof mongoose> {
    // 1. If a connection is already established and ready, return it immediately.
    if (cached.conn && cached.conn.connection.readyState === 1) {
        console.log('Using cached MongoDB connection.');
        return cached.conn;
    }

    // 2. If a connection is currently in progress, await that existing promise.
    if (cached.promise) {
        console.log('Awaiting existing MongoDB connection promise.');
        cached.conn = await cached.promise; // Ensure conn gets assigned once promise resolves
        return cached.conn;
    }

    // 3. If no connection exists and no connection is in progress, start a new one.
    console.log('Establishing new MongoDB connection...');
    cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false, // Prevents operations from buffering if not connected
    })
    .then((m) => {
        console.log('MongoDB connection established successfully.');
        cached.conn = m; // Cache the successful connection instance
        cached.promise = null; // Clear the promise as it's now resolved
        return m;
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
        cached.promise = null; // Clear the promise on failure so retries can happen
        throw error; // Re-throw the error to propagate it
    });

    // 4. Await the newly created connection promise to get the connected Mongoose instance.
    // This is the critical missing step in your provided code.
    cached.conn = await cached.promise;

    // 5. Cache the `cached` object on `globalThis` if it's not already.
    // This ensures persistence across hot-reloads in development.
    (globalThis as unknown as { mongooseCache: CachedMongoose }).mongooseCache = cached;

    return cached.conn;
}