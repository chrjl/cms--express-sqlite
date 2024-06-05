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


  return query.map((row) => ({ ...row, keywords: row.keywords.split(',') }));
}

