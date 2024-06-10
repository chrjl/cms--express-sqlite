import db from '../configs/db';
import { deleteAllKeywordsFromPost } from './keywords';
import makeDebug from 'debug';

const debug = makeDebug('app:controllers/posts');

export async function describeAllPosts() {
  const query = `SELECT id, title, description, created, modified FROM posts`;

  return new Promise((resolve) => {
    db.all(query, {}, (err, rows) => resolve(rows));
  });
}

export async function getPost(id: number) {
  const query = `SELECT * FROM posts \ 
WHERE id=$id
  `;

  return new Promise((resolve) => {
    db.get(query, { $id: id }, (err, row) => resolve(row));
  });
}

export async function filterPostsByKeyword(keywords: string[]) {
  const placeholders = keywords.map((k) => '?').join(',');
  const query = `SELECT post_id FROM keywords \
WHERE keyword IN (${placeholders})`;

  return new Promise((resolve) => {
    db.all(query, keywords, (err, rows) => {
      resolve(rows.map((r) => r.post_id));
    });
  });
}

export async function createPost({ title, description }) {
  const now = new Date().toISOString();

  const query = `INSERT INTO posts (title, description, created, modified) \
VALUES ($title, $description, $created, $modified)`;

  return new Promise((resolve) => {
    db.run(
      query,
      {
        $title: title,
        $description: description,
        $created: now,
        $modified: now,
      },
      function () {
        resolve(this);
      }
    );
  });
}

export async function deletePost(id) {
  const query = `DELETE FROM posts \
WHERE id=$id`;

  return new Promise((resolve) => {
    db.run(query, { $id: id }, async function () {
      await deleteAllKeywordsFromPost(id);
      resolve(this);
    });
  });
}

export async function updatePostMetadata(id, { metadata }) {
  const { title, description } = metadata;
  const now = new Date().toISOString();

  const query = `UPDATE posts \
SET title=$title, description=$description, modified=$modified \
WHERE id=$id`;

  return new Promise((resolve) => {
    db.run(
      query,
      { $id: id, $title: title, $description: description, $modified: now },
      function () {
        resolve(this);
      }
    );
  });
}

export function updatePostBody(id, { body }) {
  const now = new Date().toISOString();

  const query = `UPDATE posts \
SET body=$body, modified=$modified \
WHERE id=$id`;

  return new Promise((resolve) => {
    db.run(query, { $id: id, $body: body, $modified: now }, function () {
      resolve(this);
    });
  });
}
