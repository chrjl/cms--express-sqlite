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
WHERE id=$id
  `;

  return db.prepare(query).get({ id });
}

export function filterPostsByKeyword(keywords: string[]) {
  const query = `SELECT post_id FROM keywords \
WHERE keyword IN ('${keywords.join("','")}')
  `;

  const result = db.prepare(query).all();

  return result.map((res) => res.post_id);
}

export function createPost({ title, description }) {
  const now = new Date().toISOString();

  const query = `INSERT INTO posts (title, description, created, modified) \
VALUES ($title, $description, $created, $modified)`;

  const info = db
    .prepare(query)
    .run({ title, description, created: now, modified: now });
  return info;
}

export function deletePost(id) {
  const query = `DELETE FROM posts \
WHERE id=$id`;

  const info = db.prepare(query).run({ id });
  return info;
}

export function updatePostMetadata(id, { metadata }) {
  const { title, description } = metadata;
  const now = new Date().toISOString();

  const query = `UPDATE posts \
SET title=$title, description=$description, modified=$modified \
WHERE id=$id`;

  const info = db.prepare(query).run({ id, title, description, modified: now });
  return info;
}

export function updatePostBody(id, { body }) {
  const now = new Date().toISOString();
  debug(body);

  const query = `UPDATE posts \
SET body=$body, modified=$now \
WHERE id=$id`;

  const info = db.prepare(query).run({ id, body, now });
  return info
}
