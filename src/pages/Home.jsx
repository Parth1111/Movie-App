import MovieCard from "../components/MovieCard";
import CategoriesBar from "../components/CategoriesBar";
import { useState, useEffect } from "react";
import { searchMovie, getPopularMovies, getCategoricalMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [category, setCategory] = useState("now_playing");
  const categories = [
    { id: 'now_playing', text: 'Now Playing' },
    { id: 'popular', text: 'Popular' },
    { id: 'top_rated', text: 'Top Rated' },
    { id: 'upcoming', text: 'Upcoming' }
  ]


  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies(pageNumber);
        setMovies(popularMovies);
      } catch (error) {
        console.log("error:: ", error);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, [pageNumber]);


  useEffect(() => {
    const loadCategoricalMovies = async () => {
      try {
        const categoricalMovies = await getCategoricalMovies(category);
        setMovies(categoricalMovies);
      } catch (error) {
        console.log("error:: ", error);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadCategoricalMovies();
  }, [category]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);

    try {
      const searchResults = await searchMovie(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    console.log("Clicked!");
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div style={{ display: 'flex' }}>
        {categories.map((category) =>
          <CategoriesBar key={category.id} category={category.text} onCategoryClick={() => { setCategory(category.id) }} />
        )}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().includes(searchQuery) && (
                <MovieCard movie={movie} key={movie.id}></MovieCard>
              )
          )}
        </div>
      )}

      <button onClick={() => { setPageNumber(1) }}>1</button>
      <button onClick={() => { setPageNumber(2) }}>2</button>
    </div>
  );
}

export default Home;
