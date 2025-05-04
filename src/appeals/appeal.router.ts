import { Router } from 'express';
import { AppealService } from './appeal.service';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        await AppealService.create(title, description);
        res.status(201).json({ message: 'The appeal was successfully created' });
    } catch (error) {
        res.status(500).json({ error: 'Error when creating a request' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const appeals = await AppealService.getAppeals(
            startDate ? new Date(String(startDate)) : undefined,
            endDate ? new Date(String(endDate)) : undefined
        );
        res.json(appeals);
    } catch (error) {
        res.status(500).json({ error: 'Error when receiving appeal' });
    }
});

router.put('/:id/start', async (req, res) => {
    try {
        const { id } = req.params;
        await AppealService.start(id);
        res.json({ message: 'The appeal has been taken into work' });
    } catch (error) {
        res.status(500).json({ error: 'Error at the beginning of the appeal processing' });
    }
});

router.put('/:id/complete', async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;
        await AppealService.complete(id, answer);
        res.json({ message: 'The appeal was successfully completed' });
    } catch (error) {
        res.status(500).json({ error: 'Error at the end of the appeal' });
    }
});

router.put('/:id/cancel', async (req, res) => {
    try {
        const { id } = req.params;
        await AppealService.cancel(id);
        res.json({ message: 'The appeal was successfully canceled' });
    } catch (error) {
        res.status(500).json({ error: 'Error when canceling a appeal' });
    }
});

router.put('/cancel-all', async (req, res) => {
    try {
        await AppealService.cancelAllInProgress();
        res.json({ message: 'All appeals in progress have been successfully canceled' });
    } catch (error) {
        res.status(500).json({ error: 'Error when canceling appeals' });
    }
});

export default router; 