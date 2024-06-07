import db from '../configs/db';
import makeDebug from 'debug';

const debug = makeDebug('app:controllers/posts');

const metadataQuery = `SELECT id, title, description, created, modified FROM posts`;

export function describeAllPosts() {
  const query = metadataQuery;
  return db.prepare(query).all();
}

export function getPost(id: number) {
  const query = `SELECT * FROM posts \ 
WHERE id=${id}
  `;

  return db.prepare(query).get();
}

export function filterPostsByKeyword(keywords: string[]) {
  const query = `SELECT post_id FROM keywords \
WHERE keyword IN ('${keywords.join("','")}')
  `;

  const result = db.prepare(query).all();

  return result.map((res) => res.post_id);
}
