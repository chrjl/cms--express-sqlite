import {
  createPost,
  patchPostMetadata,
  updatePost,
} from './handlers.js';

const createPostButtonElement = document.getElementById(
  'createPostButtonElement'
);
const postMetadataFormElement = document.getElementById(
  'postMetadataFormElement'
);
const postBodyTextareaElement = document.getElementById(
  'postBodyTextareaElement'
);
const allPostsFormElement = document.getElementById('allPostsFormElement');
const allPostsSelectElement = document.getElementById('allPostsSelectElement');
const updatePostMetadataButtonElement = document.getElementById(
  'updatePostMetadataButtonElement'
);
const updatePostBodyButtonElement = document.getElementById(
  'updatePostBodyButtonElement'
);

// create a new post
createPostButtonElement.addEventListener('click', async () => {
  const formData = new FormData(postMetadataFormElement);
  const metadata = Object.fromEntries(formData);

  try {
    const result = await createPost({ metadata: JSON.stringify(metadata) });
    alert(`Success: ${result}`);

    allPostsFormElement.reset();
    postMetadataFormElement.reset();
  } catch (error) {
    alert(`Error: ${error}`);
  }
});

// update post metadata
updatePostMetadataButtonElement.addEventListener('click', async () => {
  try {
    const postId = allPostsSelectElement.value;

    const formData = new FormData(postMetadataFormElement);
    const metadata = Object.fromEntries(formData);

    const result = await patchPostMetadata(postId, { metadata });
    alert(`Success`);

    await renderOptionElements(allPostsSelectElement);
  } catch (error) {
    alert(`Error: ${error}`);
  }
});

// update post body and metadata
updatePostBodyButtonElement.addEventListener('click', async () => {
  try {
    const postId = allPostsSelectElement.value;

    const formData = new FormData(postMetadataFormElement);
    const metadata = Object.fromEntries(formData);

    const body = postBodyTextareaElement.value;

    const result = await updatePost(postId, { metadata, body });
    alert(`Success`);

    await renderOptionElements(allPostsSelectElement);
  } catch (error) {
    alert(`Error: ${error}`);
  }
});
