import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = mongoose.connection;

export async function connectDB() {
    if (db.readyState === 1) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        console.log(`${process.env.MONGODB_URI}${process.env.DB_NAME}`);
        await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

export function getDB() {
    if (db.readyState !== 1) {
        throw new Error('Database not connected');
    }
    return db;
}

export async function createDocument(document) {
    try {
        const collection = getDB().collection('data_collection');
        const result = await collection.insertOne(document);
        if (result.insertedCount === 0) {
            throw new Error('Document insertion failed');
        }
        console.log('Document inserted:', result);
        return result;
    } catch (error) {
        console.error('Error inserting document:', error);
        throw error;
    }
}

export async function getFirstDocument() {
    try {
        const collection = getDB().collection('data_collection');
        const document = await collection.findOne({});
        if (!document) {
            console.log('No document found in data_collection');
            return null;
        }
        console.log('Document:', document);
        console.log('Type of document:', typeof document);
        return document;
    } catch (error) {
        console.error('Error fetching document:', error);
        throw error;
    }
}

export const checkDBConnection = async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) { // 1 means connected
        console.log('Database not connected. Reconnecting...');
        try {
            await connectDB();
            console.log('Database reconnected successfully.');
        } catch (error) {
            console.error('Failed to reconnect to the database:', error);
            return res.status(500).json({ error: 'Failed to reconnect to the database' });
        }
    }
    next();
};