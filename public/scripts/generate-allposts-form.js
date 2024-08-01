import {
  getPostData,
  getAllPostsMetadata,
  deletePost,
} from './handlers.js';

import { renderKeywordsList } from './generate-keywords-list.js';

// define HTML elements
const allPostsFormElement = document.getElementById('allPostsFormElement');
const allPostsSelectElement = document.getElementById('allPostsSelectElement');
const postMetadataFormElement = document.getElementById(
  'postMetadataFormElement'
);
const keywordsContainerElement = document.getElementById('keywordsContainer');
const postBodyFormElement = document.getElementById('postBodyFormElement');
const postBodyTextareaElement = document.getElementById(
  'postBodyTextareaElement'
);

const createPostButtonElement = document.getElementById(
  'createPostButtonElement'
);
const updatePostMetadataButtonElement = document.getElementById(
  'updatePostMetadataButtonElement'
);
const updatePostBodyButtonElement = document.getElementById(
  'updatePostBodyButtonElement'
);

// render <option> elements for all posts
const allPosts = await getAllPostsMetadata();
await renderOptionElements(allPosts, allPostsSelectElement);

// reload posts and reset page - on form reset
allPostsFormElement.addEventListener('reset', async () => {
  const allPosts = await getAllPostsMetadata();
  await renderOptionElements(allPosts, allPostsSelectElement);

  postMetadataFormElement.reset();
  postBodyFormElement.reset();
  renderKeywordsList([], keywordsContainerElement);
});

// load a post - on form submit or select element change
allPostsFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const postId = allPostsSelectElement.value;
  await loadPost(postId);
});

allPostsSelectElement.addEventListener('change', async (e) => {
  const postId = e.target.value;
  await loadPost(postId);

  updatePostMetadataButtonElement.disabled = false;
  createPostButtonElement.disabled = true;
  updatePostBodyButtonElement.disabled = false;
});

// attach remaining button handlers to form - new post, delete post
allPostsFormElement.addEventListener('click', async (e) => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  switch (e.target.dataset.action) {
    case 'new-post': {
      allPostsFormElement.reset();

      updatePostMetadataButtonElement.disabled = true;
      createPostButtonElement.disabled = false;
      updatePostBodyButtonElement.disabled = true;
      return;
    }

    case 'delete-post': {
      const postId = allPostsSelectElement.value;

      try {
        const result = await deletePost(postId);
        alert(`Success`);

        allPostsFormElement.reset();
      } catch (error) {
        alert(`Error: ${error}`);
      }

      return;
    }
  }
});

async function renderOptionElements(data, containerElement) {
  containerElement.options.length = 0;

  data.forEach(({ id, title }) => {
    const optionElement = new Option(title, id);
    containerElement.append(optionElement);
  });
}

export async function loadPost(postId) {
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
}
