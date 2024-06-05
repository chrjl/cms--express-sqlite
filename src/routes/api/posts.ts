import express from 'express';
import { getAllPostMetadata } from '../../controllers';

const router = express.Router();

router.route('/').get((req, res) => {
  res.json(getAllPostMetadata());
});

export default router;
