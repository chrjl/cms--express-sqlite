import { createPost, patchPostMetadata } from './handlers.js';

const postMetadataFormElement = document.getElementById(
  'postMetadataFormElement'
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
