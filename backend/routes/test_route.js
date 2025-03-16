import express from 'express';
import { test } from '../lib/test.js';
import { createDocument, getFirstDocument, connectDB } from '../controllers/mongodb.js';

const router = express.Router();

router.get('/test', async (req, res) => {
    const message = test();

    const documentData = {
        key: 'some_test',
        Date: new Date() 
    };

    try {
        await connectDB(); // Ensure the database is connected
        const newDocument = await createDocument(documentData);
        const firstDocument = await getFirstDocument();
        res.json({ message, newDocument, firstDocument });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
