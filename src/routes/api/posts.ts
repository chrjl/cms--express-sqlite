import express from 'express';
import {
  getAllPostMetadata,
  getPost,
  getPostsByKeyword,
} from '../../controllers';

const router = express.Router();

router.route('/').get((req, res) => {
  if (req.query?.keyword) {
    const keywords = [req.query.keyword].flat();

    res.json(getPostsByKeyword(keywords));
  } else {
    res.json(getAllPostMetadata());
  }
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
