import { html, render } from 'https://esm.run/lit-html@1';
import { loadPost } from './generate-allposts-form.js';
import { deleteKeywordFromPost } from './api-handlers.js';

export async function renderKeywordsList(keywords, containerElement) {
  const keywordListItemTemplate = (keyword) =>
    html`<li>
      <form @submit=${deleteKeywordHandler}>
        <input type="text" name="keyword" value="${keyword}" disabled />
        <button type="submit">Delete</button>
      </form>
    </li>`;

  const newKeywordListItemTemplate = html`<li>
    <form @submit=${createKeywordHandler}>
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

    await deleteKeywordFromPost(postId, keyword);

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
    e.target.reset();
  }
}
