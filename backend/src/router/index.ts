import express from 'express';

const router = express.Router();

router.get('/version', (req, res) => {
    res.send('1.0.0');
});

export default router;
