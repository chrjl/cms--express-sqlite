import db from '../configs/db';

const allMetadataQuery = `
SELECT posts.id, title, description, created, modified, GROUP_CONCAT(keyword) AS keywords FROM posts
  JOIN keywords ON keywords.post_id = posts.id
  GROUP By posts.id 
  `;

export function getAllPostMetadata() {
  const query = allMetadataQuery;

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

function getPostMetadata(ids) {
  const query = `
SELECT * FROM (${allMetadataQuery})
  WHERE id in ('${ids.join("','")}')
  `;

  const result = db.prepare(query).all();
  return result.map((row) => ({ ...row, keywords: row.keywords.split(',') }));
}

export function getPostsByKeyword(keywords) {
  const idQuery = `
SELECT post_id FROM keywords
  WHERE keyword IN ('${keywords.join("','")}')
  `;

  const postIds = db
    .prepare(idQuery)
    .all()
    .map((res) => res.post_id);

  return getPostMetadata(postIds);
}

export function getAllKeywords() {
  const query = 'SELECT DISTINCT keyword FROM keywords';

  const result = db.prepare(query).all();
  return result.map((row) => row.keyword);
}
