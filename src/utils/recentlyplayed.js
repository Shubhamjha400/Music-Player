export const updateRecentlyPlayed = (song) => {
    // Get the current list from sessionStorage or start with an empty array.
    let recentlyPlayed = JSON.parse(sessionStorage.getItem('recentlyPlayed')) || [];

    // Remove any duplicate of the current song (based on unique id)
    recentlyPlayed = recentlyPlayed.filter(s => s.id !== song.id);

    // Add the new song at the beginning of the array
    recentlyPlayed.unshift(song);

    // Keep only the last 10 songs
    if (recentlyPlayed.length > 10) {
        recentlyPlayed = recentlyPlayed.slice(0, 10);
    }

    // Save the updated list back to sessionStorage
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
};
