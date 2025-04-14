export const updateFavorite = (song) => {
    if (!song) return;
    // Retrieve favorites array from localStorage or initialize an empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Check if the song is already marked as favorite (using a unique id)
    if (!favorites.find((fav) => fav.id === song.id)) {
        favorites.push(song);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};