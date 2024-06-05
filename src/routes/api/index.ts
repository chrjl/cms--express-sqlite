import express from 'express';
import postsRouter from './posts';
import keywordsRouter from './keywords';

const router = express.Router();

router.use('/posts', postsRouter);
router.use('/keywords', keywordsRouter);
router.route('/').get((req, res) => res.send('hello from the api route'));

export default router;
