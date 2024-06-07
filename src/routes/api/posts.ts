import makeDebug from 'debug';

import express from 'express';
import {
  describeAllPosts,
  getPost,
  filterPostsByKeyword,
  getKeywordsByPost,
  createPost,
} from '../../controllers';

const debug = makeDebug('app:api/posts');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    if (req.query?.keyword) {
      const keywords = [req.query.keyword].flat();
      const postIds = filterPostsByKeyword(keywords);

      res.json(describeAllPosts().filter((p) => postIds.includes(p.id)));
    } else {
      res.json(describeAllPosts());
    }
  })
  .post((req, res) => {
    const { title, description } = req.body;

    if (!title) {
      res.sendStatus(400);
    }

    const info = createPost({ title, description });
    debug(info);
    res.sendStatus(201);
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

router.route('/:id/keywords').get((req, res) => {
  const { id } = req.params;
  const result = getKeywordsByPost(id);
  res.json(result);
});

export default router;
