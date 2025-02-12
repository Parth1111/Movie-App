const API_KEY = `secret`;


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer secret",
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
