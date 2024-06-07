import db from '../configs/db';

export function getAllKeywords() {
  const query = 'SELECT DISTINCT keyword FROM keywords';

  const result = db.prepare(query).all();
  return result.map((row) => row.keyword);
}

export function getKeywordsByPost(postId: number) {
  const query = `SELECT keyword FROM keywords \
WHERE post_id=${postId}  
  `;

  const result = db.prepare(query).all();

  return result.map((r) => r.keyword);
}
