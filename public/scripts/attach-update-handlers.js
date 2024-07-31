import { updatePost } from './handlers.js';

const postMetadataFormElement = document.getElementById(
  'postMetadataFormElement'
);
const postBodyTextareaElement = document.getElementById(
  'postBodyTextareaElement'
);
const allPostsSelectElement = document.getElementById('allPostsSelectElement');
const updatePostBodyButtonElement = document.getElementById(
  'updatePostBodyButtonElement'
);

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
