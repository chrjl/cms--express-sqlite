import { renderOptionElements, createPost, deletePost } from './handlers.js';

const createPostButtonElement = document.getElementById(
  'createPostButtonElement'
);
const deletePostButtonElement = document.getElementById(
  'deletePostButtonElement'
);
const postMetadataTextareaElement = document.getElementById(
  'postMetadataTextareaElement'
);
const allPostsSelectElement = document.getElementById('allPostsSelectElement');

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
