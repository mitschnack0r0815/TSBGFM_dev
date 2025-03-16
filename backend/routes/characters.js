import express from 'express';
import Char from '../models/char.js';

const router = express.Router();

// Endpoint to fetch all characters
router.get('/', async (req, res) => {
    try {
        const characters = await Char.find();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;