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
  const data = postMetadataTextareaElement.value;

  try {
    const response = await fetch('/api/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    const result = await response.text();
    alert(`Success: ${result}`);
    window.location.reload();
  } catch (error) {
    alert(`Error: ${error}`);
  }
});

// delete the selected post
deletePostButtonElement.addEventListener('click', async () => {
  const postId = allPostsSelectElement.value;

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'delete',
    });

    const result = await response.text();

    alert(`Success`);
    window.location.reload();
  } catch (error) {
    alert(`Error: ${error}`);
  }
});
