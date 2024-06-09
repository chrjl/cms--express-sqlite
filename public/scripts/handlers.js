import { html, render } from 'https://esm.run/lit-html@1';
import { loadPost } from './generate-allposts-form.js';

// render <option> elements for all posts
export async function renderOptionElements(containerElement) {
  const res = await fetch('/api/posts');
  const allPosts = await res.json();

  const postOptionElementTemplates = allPosts.map(
    ({ id, title }) => html`<option value=${id}>${title}</option>`
  );

  const allPostsTemplate = html`${postOptionElementTemplates}`;
  render(html`${postOptionElementTemplates}`, containerElement);
}

export async function renderKeywordsList(keywords, containerElement) {
  const keywordListItemTemplate = (keyword) =>
    html`<li>
      <form @submit=${deleteKeywordHandler}>
      <form>
        <input type="text" name="keyword" value="${keyword}" disabled />
        <button type="submit">Delete</button>
      </form>
    </li>`;

  const newKeywordListItemTemplate = html`<li>
    <form @submit=${createKeywordHandler}>
    <form>
      <input type="text" name="keyword" />
      <button type="submit">Add</button>
    </form>
  </li>`;

  render(
    html`<ul>
      ${keywords.map((k) => keywordListItemTemplate(k))}
      ${newKeywordListItemTemplate}
    </ul>`,
    containerElement
  );

  async function deleteKeywordHandler(e) {
    e.preventDefault();
    const allPostsSelectElement = document.getElementById(
      'allPostsSelectElement'
    );

    const postId = allPostsSelectElement.value;
    const keyword = e.target.keyword.value;

    await fetch(`/api/posts/${postId}/keywords/${keyword}`, {
      method: 'delete',
    });

    await loadPost(postId);
  }

  async function createKeywordHandler(e) {
    e.preventDefault();
    const allPostsSelectElement = document.getElementById(
      'allPostsSelectElement'
    );

    const postId = allPostsSelectElement.value;
    const keyword = e.target.keyword.value;

    await fetch(`/api/posts/${postId}/keywords`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword }),
    });

    await loadPost(postId);
    e.target.keyword.value = '';
  }
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
    throw new Error('error updating post')
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
    throw new Error('error updating post')
  }
  
  const result = await response.text();
  return result;
}
