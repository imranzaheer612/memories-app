async function getStories() {
    const response = await fetch('/api/story');

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const stories = await response.json();
    return stories;
}

export default getStories;

