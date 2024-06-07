import { html, render } from 'https://esm.run/lit-html@1';

// define HTML elements
const allPostsFormElement = document.getElementById('allPostsFormElement');
const allPostsSelectElement = document.getElementById('allPostsSelectElement');
const postMetadataTextareaElement = document.getElementById(
  'postMetadataTextareaElement'
);
const postKeywordsTextareaElement = document.getElementById(
  'postKeywordsTextareaElement'
);
const postBodyTextareaElement = document.getElementById(
  'postBodyTextareaElement'
);
const newPostButtonElement = document.getElementById('newPostButtonElement');

// render <option> elements for all posts
const res = await fetch('/api/posts');
const allPosts = await res.json();

const postOptionElementTemplates = allPosts.map(
  ({ id, title }) => html`<option value=${id}>${title}</option>`
);

const allPostsTemplate = html`${postOptionElementTemplates}`;
render(allPostsTemplate, document.getElementById('allPostsSelectElement'));

// add event listener to form
allPostsFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const postId = allPostsSelectElement.value;

  const res = await fetch(`/api/posts/${postId}`);
  const { body, ...metadata } = await res.json();

  const res2 = await fetch(`/api/posts/${postId}/keywords`);
  const keywords = await res2.json();

  postMetadataTextareaElement.value = JSON.stringify(metadata, null, 2);
  postKeywordsTextareaElement.value = JSON.stringify(keywords, null, 2);
  postBodyTextareaElement.value = body;
});

// add event listener to new post button
const newPostTemplate = {
  title: '',
  description: '',
};

newPostButtonElement.addEventListener('click', () => {
  postMetadataTextareaElement.value = JSON.stringify(newPostTemplate, null, 2);
  postKeywordsTextareaElement.value = JSON.stringify([]);
  postBodyTextareaElement.value = '';
});
