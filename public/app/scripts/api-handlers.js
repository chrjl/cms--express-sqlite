export async function getAllPostsMetadata() {
  const res = await fetch('/api/posts');
  const allPosts = await res.json();

  return allPosts;
}

export async function getPostData(postId) {
  const postsResponse = await fetch(`/api/posts/${postId}`);
  const { body, ...metadata } = await postsResponse.json();

  const keywordsResponse = await fetch(`/api/posts/${postId}/keywords`);
  const keywords = await keywordsResponse.json();

  return { metadata, keywords, body };
}

export async function deletePost(postId) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'delete',
  });

  const result = await response.text();
  return result;
}

// create a new post with metadata only
export async function createPost({ metadata }) {
  const response = await fetch('/api/posts', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: metadata,
  });

  const result = await response.text();
  return result;
}

// update post metadata
export async function patchPostMetadata(id, { metadata }) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (response.status >= 400) {
    throw new Error('error updating post');
  }

  const result = await response.text();
  return result;
}

// update post metadata
export async function updatePost(id, { metadata, body }) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...metadata, body }),
  });

  if (response.status >= 400) {
    throw new Error('error updating post');
  }

  const result = await response.text();
  return result;
}

// manage keywords
export async function deleteKeywordFromPost(postId, keyword) {
  const response = await fetch(`/api/posts/${postId}/keywords/${keyword}`, {
    method: 'delete',
  });
  
  if (response.status >= 400) {
    throw new Error('error updating post');
  }
}
