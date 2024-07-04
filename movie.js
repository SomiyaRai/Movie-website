const apiKey = "58ec4382";
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;

async function fetchMovieData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

const searchBox = document.querySelector(".searchbox input");
const searchButton = document.querySelector(".search");

async function insertData(searchInput) {
  const apiUrlWithSearch = `https://www.omdbapi.com/?t=${searchInput}&apikey=${apiKey}`;
  const movieData = await fetchMovieData(apiUrlWithSearch);
  updateMovieDetails(movieData);
}

// Inserting the default movie data
insertData("I want to eat your pancreas");

// Updating the search button and input so that the inserted data can be seen 
searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const searchInput = searchBox.value;
  console.log("Search button clicked");
  insertData(searchInput);
});

function updateMovieDetails(movieData) {
  if (movieData) {
    const movieBox = document.querySelector('.movie-box');
    const movieDetails = movieBox.querySelector('.movie-details');

    movieDetails.querySelector('.name').textContent =  movieData.Title;
    movieDetails.querySelector('.rating').textContent = "Ratings:  " + movieData.imdbRating;
    movieDetails.querySelector('.release').textContent = "Year:  " + movieData.Year;
    movieDetails.querySelector('.genre').textContent = "Genre:  " + movieData.Genre;
    movieDetails.querySelector('.duration').textContent = "Duration:  " + movieData.Runtime;
    movieDetails.querySelector('.descrip').textContent = "Plot:  " + movieData.Plot;
    movieDetails.querySelector('.director').textContent = "Director:  " + movieData.Director;
    movieDetails.querySelector('.stars').textContent = "Stars:  " + movieData.Actors;
    movieDetails.querySelector('.country').textContent = "Country:  " + movieData.Country;

    // Updating the poster image
    const posterContainer = document.querySelector('.img-box');
    posterContainer.innerHTML = ''; // Clears the previous poster
    const posterImage = document.createElement('img');
    posterImage.src = movieData.Poster;
    posterContainer.appendChild(posterImage);
  } else {
    console.error("Movie data is null.");
  }
}
