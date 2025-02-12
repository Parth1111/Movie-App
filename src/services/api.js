const API_KEY = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzI1ZWIyOWFkOWM4YTgwYzg3NjEzNGNhZjU5MzQwNCIsIm5iZiI6MTczOTI5MjE0Ni4zNjUsInN1YiI6IjY3YWI3ZGYyZjcxYTM3ODNlMWJiMmNiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RiZgOljX8tzck0iJhc8YKe4RT1kriX18xmZeuSkHntA`;


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzI1ZWIyOWFkOWM4YTgwYzg3NjEzNGNhZjU5MzQwNCIsIm5iZiI6MTczOTI5MjE0Ni4zNjUsInN1YiI6IjY3YWI3ZGYyZjcxYTM3ODNlMWJiMmNiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RiZgOljX8tzck0iJhc8YKe4RT1kriX18xmZeuSkHntA",
  },
};

const BASE_URL = `https://api.themoviedb.org/3`;

export const getPopularMovies = async (pageNumber) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?&page=${pageNumber}`,
    options
  );
  let data = await response.json();
  //console.log("results:: ", data.results);
  return data.results;
};

export const getCategoricalMovies = async (category) => {
  console.log("cat:: ", category);
  const response = await fetch(
    `${BASE_URL}/movie/${category}`,
    options
  )
  let data = await response.json();
  //console.log("results:: ", data.results);
  return data.results;
};

export const searchMovie = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
