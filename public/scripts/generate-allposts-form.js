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

// add event listener to form
allPostsFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const postId = allPostsSelectElement.value;
  const { metadata, keywords, body } = await getPostData(postId);

  postMetadataTextareaElement.value = JSON.stringify(metadata, null, 2);
  postBodyTextareaElement.value = body;
  await renderKeywordsList(keywords, keywordsContainerElement);
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

// add event listener to refresh button
refreshButtonElement.addEventListener('click', async () => {
  await renderOptionElements(allPostsSelectElement);
});
