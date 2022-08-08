import axios from "axios";

/**
 * Fetching all stories for the home page
 */
export async function getAllStories() {
  const response = await fetch("/api/story", { credentials: "include" });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const stories = await response.json();
  return stories;
}

/**
 * Fetching story for only a single post based on id
 */
export async function getStory(id) {
  const response = await fetch(`/api/story/${id}`);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const story = await response.json();
  return story;
}

/**
 * posting story and images to the server
 */
export const postStory = async (postData) => {
  const data = new FormData();

  data.append("title", postData.title);
  data.append("note", postData.note);
  data.append("date", postData.date);

  for (let image of postData.imageFiles) {
    data.append("images", image);
  }

  try {
    return await axios.post("/api/story", data, {});
  } catch (e) {
    throw new Error(e);
  }
};
