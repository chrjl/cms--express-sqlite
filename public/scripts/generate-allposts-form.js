import {
  // renderOptionElements,
  renderKeywordsList,
  getPostData,
  getAllPostsMetadata,
} from './handlers.js';

// define HTML elements
const allPostsFormElement = document.getElementById('allPostsFormElement');
const allPostsSelectElement = document.getElementById('allPostsSelectElement');
const postMetadataFormElement = document.getElementById(
  'postMetadataFormElement'
);
const keywordsContainerElement = document.getElementById('keywordsContainer');
const postBodyTextareaElement = document.getElementById(
  'postBodyTextareaElement'
);
const newPostButtonElement = document.getElementById('newPostButtonElement');
const refreshButtonElement = document.getElementById('refreshButtonElement');

// render <option> elements for all posts
const allPosts = await getAllPostsMetadata();
await renderOptionElements(allPosts, allPostsSelectElement);

// load a post - add submit listener to form, change listener to select element
export const loadPost = async (postId) => {
  const { metadata, keywords, body } = await getPostData(postId);
  const { id, title, description, created, modified } = metadata;

  postMetadataFormElement.elements.postId.value = id;
  postMetadataFormElement.elements.title.value = title;
  postMetadataFormElement.elements.description.value = description;
  postMetadataFormElement.elements.created.value = created;
  postMetadataFormElement.elements.modified.value = modified;

  postBodyTextareaElement.value = body;

  renderKeywordsList(keywords, keywordsContainerElement);

  return metadata;
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
  allPostsSelectElement.value = null;
  postMetadataFormElement.reset();
  postBodyTextareaElement.value = '';
  renderKeywordsList([], keywordsContainerElement);
});

// add event listener to refresh button
refreshButtonElement.addEventListener('click', async () => {
  allPostsSelectElement.options.length = 0;
  await renderOptionElements(allPostsSelectElement);
});

async function renderOptionElements(data, containerElement) {
  containerElement.options.length = 0;

  allPosts.forEach(({ id, title }) => {
    const optionElement = new Option(title, id);
    containerElement.append(optionElement);
  });
}
