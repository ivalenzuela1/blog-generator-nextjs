export async function generatePost(postPrompt: PostPrompt) {
  console.log("hola");
  return await fetch("/api/posts/generatePost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postPrompt),
  });
}
