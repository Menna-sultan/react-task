const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`);
  return await res.json();
};
export const fetchPostById = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  return await res.json();
};

export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return await res.json();
};

export const createPost = async (data) => {

  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  // simulate error
  if (data.title === "error") {
    throw new Error("Internal Server Error");
  }

  return await res.json();
};

