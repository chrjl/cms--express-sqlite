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
  .get(async (req, res) => {
    const allPosts = await describeAllPosts();

    if (req.query?.keyword) {
      const keywords = [req.query.keyword].flat();
      const postIds = await filterPostsByKeyword(keywords);

      res.json(allPosts.filter((p) => postIds.includes(p.id)));
    } else {
      res.json(allPosts);
    }
  })
  .post(async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
      res.sendStatus(400);
    }

    const info = await createPost({ title, description });
    debug(info);
    res.sendStatus(201);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await getPost(id);

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
  .patch(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const info = await updatePostMetadata(id, {
      metadata: { title, description },
    });

    if (info.changes === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { body, ...metadata } = req.body;

    const info = await updatePostMetadata(id, { metadata });

    if (info.changes === 0) {
      res.sendStatus(404);
    } else {
      await updatePostBody(id, { body });
      res.sendStatus(200);
    }
  });

router
  .route('/:id/keywords')
  .get(async (req, res) => {
    const { id } = req.params;
    const result = await getKeywordsByPost(id);
    res.json(result);
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const { keyword } = req.body;

    const isPost = await getPost(id);

    if (!isPost) {
      res.sendStatus(404);
    } else {
      const existingKeywords = await getKeywordsByPost(id);

      if (!existingKeywords?.includes(keyword)) {
        addKeywordToPost(id, keyword);
        res.sendStatus(201);
      } else {
        res.sendStatus(200);
      }
    }
  });

router.route('/:id/keywords/:keyword').delete(async (req, res) => {
  const { id, keyword } = req.params;

  const result = await deleteKeywordFromPost(id, keyword);
  res.sendStatus(204);
});

export default router;
