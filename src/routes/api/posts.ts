import makeDebug from 'debug';

import express from 'express';
import {
  describeAllPosts,
  getPost,
  filterPostsByKeyword,
  getKeywordsByPost,
  createPost,
  deletePost,
  updatePostMetadata,
  updatePostBody,
  addKeywordToPost,
  deleteKeywordFromPost,
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

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const result = getPost(id);

    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  })
  .delete((req, res) => {
    const { id } = req.params;
    const info = deletePost(id);

    res.sendStatus(204);
  })
  .patch((req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const info = updatePostMetadata(id, { metadata: { title, description } });

    if (info.changes === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  })
  .put((req, res) => {
    const { id } = req.params;
    const { body, ...metadata } = req.body;

    const info = updatePostMetadata(id, { metadata });

    if (info.changes === 0) {
      res.sendStatus(404);
    } else {
      updatePostBody(id, { body });
      res.sendStatus(200);
    }
  });

router
  .route('/:id/keywords')
  .get((req, res) => {
    const { id } = req.params;
    const result = getKeywordsByPost(id);
    res.json(result);
  })
  .post((req, res) => {
    const { id } = req.params;
    const { keyword } = req.body;

    const isPost = getPost(id);

    if (!isPost) {
      res.sendStatus(404);
    } else {
      const existingKeywords = getKeywordsByPost(id);

      if (!existingKeywords.includes(keyword)) {
        addKeywordToPost(id, keyword);
        res.sendStatus(201);
      } else {
        res.sendStatus(200);
      }
    }
  });

router.route('/:id/keywords/:keyword').delete((req, res) => {
  const { id, keyword } = req.params;

  const result = deleteKeywordFromPost(id, keyword);
  res.sendStatus(204);
});

export default router;
