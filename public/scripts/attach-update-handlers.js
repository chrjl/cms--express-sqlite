import {
  renderOptionElements,
  createPost,
  deletePost,
  patchPostMetadata,
  updatePost,
} from './handlers.js';

const createPostButtonElement = document.getElementById(
  'createPostButtonElement'
);
const deletePostButtonElement = document.getElementById(
  'deletePostButtonElement'
);
const postMetadataTextareaElement = document.getElementById(
  'postMetadataTextareaElement'
);
const postBodyTextareaElement = document.getElementById(
  'postBodyTextareaElement'
);
const allPostsSelectElement = document.getElementById('allPostsSelectElement');
const updatePostMetadataButtonElement = document.getElementById(
  'updatePostMetadataButtonElement'
);
const updatePostBodyButtonElement = document.getElementById(
  'updatePostBodyButtonElement'
);

// create a new post
createPostButtonElement.addEventListener('click', async () => {
  const metadata = postMetadataTextareaElement.value;

  try {
    JSON.parse(metadata);

    const result = await createPost({ metadata });
    alert(`Success: ${result}`);

    await renderOptionElements(allPostsSelectElement);
    postMetadataTextareaElement.value = '';
  } catch (error) {
    alert(`Error: ${error}`);
  }
});

// delete the selected post
deletePostButtonElement.addEventListener('click', async () => {
  const postId = allPostsSelectElement.value;

  try {
    const result = await deletePost(postId);
    alert(`Success`);

    await renderOptionElements(allPostsSelectElement);
  } catch (error) {
    alert(`Error: ${error}`);
  }
});

// update post metadata
updatePostMetadataButtonElement.addEventListener('click', async () => {
  try {
    const { id, ...metadata } = JSON.parse(postMetadataTextareaElement.value);

    const result = await patchPostMetadata(id, { metadata });
    alert(`Success`);

    await renderOptionElements(allPostsSelectElement);
  } catch (error) {
    alert(`Error: ${error}`);
  }
});

// update post body and metadata
updatePostBodyButtonElement.addEventListener('click', async () => {
  try {
    const { id, ...metadata } = JSON.parse(postMetadataTextareaElement.value);
    const body = postBodyTextareaElement.value;

    const result = await updatePost(id, { metadata, body });
    alert(`Success`);

    await renderOptionElements(allPostsSelectElement);
  } catch (error) {
    alert(`Error: ${error}`);
  }
});
