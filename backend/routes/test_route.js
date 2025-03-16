import express from 'express';
import { test } from '../lib/test.js';

const router = express.Router();

router.get('/test', (req, res) => {
    const message = test();
    res.json({ message });
});

export default router;
