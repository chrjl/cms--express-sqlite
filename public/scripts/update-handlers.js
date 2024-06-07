const createPostButtonElement = document.getElementById(
  'createPostButtonElement'
);
const postMetadataTextareaElement = document.getElementById(
  'postMetadataTextareaElement'
);

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
  } catch (error) {
    alert(`Error: ${error}`);
  }
});
