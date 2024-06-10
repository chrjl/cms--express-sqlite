import db from '../configs/db';

export async function getAllKeywords() {
  const query = 'SELECT DISTINCT keyword FROM keywords';

  return new Promise((resolve) => {
    db.all(query, {}, (err, rows) => resolve(rows.map((r) => r.keyword)));
  });
}

export async function getKeywordsByPost(postId: number) {
  const query = `SELECT keyword FROM keywords \
WHERE post_id=$postId  
  `;

  return new Promise((resolve) => {
    db.all(query, { $postId: postId }, (err, rows) =>
      resolve(rows.map((r) => r.keyword))
    );
  });
}

export function addKeywordToPost(postId: number, keyword: string) {
  const query = `INSERT INTO keywords (keyword, post_id) \
VALUES ($keyword, $postId)`;

  return new Promise((resolve) =>
    db.run(query, { $keyword: keyword, $postId: postId }, function () {
      resolve(this);
    })
  );
}

export async function deleteKeywordFromPost(postId: number, keyword: string) {
  const query = `DELETE FROM keywords \
WHERE keyword=$keyword \
AND post_id=$postId`;

  return new Promise((resolve) => {
    db.run(query, { $keyword: keyword, $postId: postId }, function () {
      resolve(this);
    });
  });
}

export async function deleteAllKeywordsFromPost(postId: number) {
  const query = `DELETE FROM keywords \
WHERE post_id=$postId`;

  return new Promise((resolve) => {
    db.run(query, { $postId: postId }, function () {
      resolve(this);
    });
  });
}
