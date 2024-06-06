import db from '../configs/db';

export function getAllPostMetadata() {
  const query = `
SELECT posts.id, title, description, created, modified, GROUP_CONCAT(keyword) AS keywords FROM posts
  JOIN keywords ON keywords.post_id = posts.id
  GROUP By posts.id 
  `;

  const result = db.prepare(query).all();
  return result.map((row) => ({ ...row, keywords: row.keywords.split(',') }));
}

export function getPost(id) {
  const query = `
SELECT * FROM posts
  WHERE id=${id}
  LIMIT 1;
  `;

  return db.prepare(query).get();
}

export function getAllKeywords() {
  const query = 'SELECT DISTINCT keyword FROM keywords';

  const result = db.prepare(query).all();
  return result.map((row) => row.keyword);
}
