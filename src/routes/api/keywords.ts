import express from 'express';
import { getAllKeywords } from '../../controllers';

const router = express.Router();

router.get('/', (req, res) => res.json(getAllKeywords()));

export default router;
