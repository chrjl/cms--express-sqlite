import express from 'express';
import { getAllKeywords } from '../../controllers';

const router = express.Router();

router.get('/', async (req, res) => {
  const allKeywords = await getAllKeywords();
  res.json(allKeywords);
});

export default router;
