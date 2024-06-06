import db from '../configs/db';

const allMetadataQuery = `
SELECT posts.id, title, description, created, modified, GROUP_CONCAT(keyword) AS keywords FROM posts
  JOIN keywords ON keywords.post_id = posts.id
  GROUP By posts.id 
  `;

export function describeAllPosts() {
  const query = allMetadataQuery;

  const result = db.prepare(query).all();
  return result.map((row) => ({ ...row, keywords: row.keywords.split(',') }));
}

export function getPost(id: number) {
  const postQuery = `
SELECT * FROM posts
  WHERE id=${id}
  LIMIT 1;
  `;

  const post = db.prepare(postQuery).get();
  const keywords = getKeywordsByPost(id);

  return { ...post, keywords };
}

export function getKeywordsByPost(postId: number) {
  const query = `
SELECT keyword FROM keywords
  WHERE post_id=${postId}  
  `;

  const result = db.prepare(query).all();

  return result.map((r) => r.keyword);
}

function describePosts(ids: number[]) {
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

  return describePosts(postIds);
}

export function getAllKeywords() {
  const query = 'SELECT DISTINCT keyword FROM keywords';

  const result = db.prepare(query).all();
  return result.map((row) => row.keyword);
}
