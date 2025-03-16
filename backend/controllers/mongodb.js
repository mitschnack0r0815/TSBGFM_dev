import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI; // Your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

export async function connectDB() {
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME); // Your database name
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

export function getDB() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}