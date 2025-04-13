import express from 'express';
import { saveTags, getStation } from '../db';

const router = express.Router();

router
    .get('/station', async (req, res) => {
        try {
            const stations = await getStation();

            res.send(JSON.stringify(stations));
        } catch (error: any) {
            throw error;
        }
    })
    .post('/tag', async (req, res) => {
        const { stationId, tags } = req.body;
        if (!stationId || !tags) {
            res.status(400).send('station id or tags not present');
            return;
        }

        try {
            await saveTags(stationId, tags);

            res.sendStatus(200);
        } catch (error: any) {
            throw error;
        }
    })
    .get('/version', (req, res) => {
        res.send('1.0.1');
    });

export default router;
