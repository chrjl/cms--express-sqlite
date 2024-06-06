import express from 'express';
import { getAllPostMetadata, getPost } from '../../controllers';

const router = express.Router();

router.route('/').get((req, res) => {
  res.json(getAllPostMetadata());
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;
  const result = getPost(id);

  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

export default router;
