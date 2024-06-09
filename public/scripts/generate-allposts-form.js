import {
  renderOptionElements,
  renderKeywordsList,
  getPostData,
} from './handlers.js';

// define HTML elements
const allPostsFormElement = document.getElementById('allPostsFormElement');
const allPostsSelectElement = document.getElementById('allPostsSelectElement');
const postMetadataTextareaElement = document.getElementById(
  'postMetadataTextareaElement'
);
const postKeywordsTextareaElement = document.getElementById(
  'postKeywordsTextareaElement'
);
const keywordsContainerElement = document.getElementById('keywordsContainer');
const postBodyTextareaElement = document.getElementById(
  'postBodyTextareaElement'
);
const newPostButtonElement = document.getElementById('newPostButtonElement');
const refreshButtonElement = document.getElementById('refreshButtonElement');

// render <option> elements for all posts
await renderOptionElements(allPostsSelectElement);

// load a post - add submit listener to form, change listener to select element
export const loadPost = async (postId) => {
  const { metadata, keywords, body } = await getPostData(postId);

  postMetadataTextareaElement.value = JSON.stringify(metadata, null, 2);
  postBodyTextareaElement.value = body;
  renderKeywordsList(keywords, keywordsContainerElement);
};

allPostsFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const postId = allPostsSelectElement.value;
  await loadPost(postId);
});

allPostsSelectElement.addEventListener('change', async (e) => {
  const postId = e.target.value;
  await loadPost(postId);
});

// add event listener to new post button
const newPostTemplate = {
  title: '',
  description: '',
};

newPostButtonElement.addEventListener('click', () => {
  postMetadataTextareaElement.value = JSON.stringify(newPostTemplate, null, 2);
  postBodyTextareaElement.value = '';
  renderKeywordsList([], keywordsContainerElement)
});

// add event listener to refresh button
refreshButtonElement.addEventListener('click', async () => {
  await renderOptionElements(allPostsSelectElement);
});
