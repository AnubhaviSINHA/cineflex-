const API_KEY = "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

const moodGenreMap = {
    happy: 35,
    sad: 18,
    angry: 28,
    relaxed: 10749
};

function scrollToRecommend() {
    document.getElementById("recommend").scrollIntoView({
        behavior: "smooth"
    });
}

async function fetchMovies() {
    const mood = document.getElementById("mood").value;
    if (!mood) {
        alert("Please select mood");
        return;
    }

    const genreId = moodGenreMap[mood];

    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );

    const data = await response.json();
    displayMovies(data.results.slice(0, 12));
}

function displayMovies(movies) {
    const container = document.getElementById("movies");
    container.innerHTML = "";

    movies.forEach(movie => {
        if (!movie.poster_path) return;

        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
            <button onclick="addToWatchlist('${movie.title}')">Add</button>
        `;

        container.appendChild(card);
    });
}

function addToWatchlist(title) {
    let list = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!list.includes(title)) {
        list.push(title);
        localStorage.setItem("watchlist", JSON.stringify(list));
    }
    renderWatchlist();
}

function renderWatchlist() {
    const container = document.getElementById("watchlistContainer");
    const list = JSON.parse(localStorage.getItem("watchlist")) || [];
    container.innerHTML = list.map(movie => `<p>${movie}</p>`).join("");
}

renderWatchlist();
