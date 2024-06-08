import db from '../configs/db';

export function getAllKeywords() {
  const query = 'SELECT DISTINCT keyword FROM keywords';

  const result = db.prepare(query).all();
  return result.map((row) => row.keyword);
}

export function getKeywordsByPost(postId: number) {
  const query = `SELECT keyword FROM keywords \
WHERE post_id=$postId  
  `;

  const result = db.prepare(query).all({ postId });

  return result.map((r) => r.keyword);
}

export function addKeywordToPost(postId: number, keyword: string) {
  const query = `INSERT INTO keywords (keyword, post_id) \
VALUES ($keyword, $postId)`;

  const result = db.prepare(query).run({ keyword, postId });
  return result;
}
