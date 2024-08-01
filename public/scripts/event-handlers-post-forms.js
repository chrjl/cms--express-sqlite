import { createPost, patchPostMetadata, updatePost } from './api-handlers.js';

const postMetadataFormElement = document.getElementById(
  'postMetadataFormElement'
);
const postBodyFormElement = document.getElementById('postBodyFormElement');
const postBodyTextareaElement = document.getElementById(
  'postBodyTextareaElement'
);

const allPostsFormElement = document.getElementById('allPostsFormElement');
const allPostsSelectElement = document.getElementById('allPostsSelectElement');

postMetadataFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const postId = allPostsSelectElement.value;

  const formData = new FormData(postMetadataFormElement);
  const metadata = Object.fromEntries(formData);

  try {
    if (!postId) {
      // create new post
      await createPost({ metadata: JSON.stringify(metadata) });
    } else {
      // update post metadata
      await patchPostMetadata(postId, { metadata });
    }

    alert(`Success`);

    allPostsFormElement.reset();
  } catch (error) {
    alert(`Error: ${error}`);
  }
});

postBodyFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const postId = allPostsSelectElement.value;

  const formData = new FormData(postMetadataFormElement);
  const metadata = Object.fromEntries(formData);

  const body = postBodyTextareaElement.value;

  try {
    await updatePost(postId, { metadata, body });
    alert(`Success`);

    allPostsFormElement.reset();
  } catch (error) {
    alert(`Error: ${error}`);
  }
});
