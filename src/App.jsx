import React, { useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useEffect } from "react";
import { useDebounce } from "react-use";
import "./App.css";
import { updateSearchCount } from "./appwrite";
import { getTrendingMovies } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounced, setDebounced] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(
    () => {
      setDebounced(searchTerm);
    },
    500,
    [searchTerm]
  );

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovies([]);
        return;
      }
      setMovies(data.results || []);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }

  useEffect(() => {
    fetchMovies(debounced);
  }, [debounced]);

  useEffect(() => {
    loadTrendingMovies();
    
    setShow(true);
  }, []);

  return (
    <main>
      <div className="patter" />

      <div className="wrapper">
        <header>
          <img
            src="./hero.png"
            alt="Hero Banner"
            className={`w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md transform transition-all duration-7000 ease-out
            ${
              show
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-5 scale-90"
            }
          `}
          />
          <h1>
            Ache <span className="text-gradient">Filmes</span> sem dor de
            cabeça!
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
            {trendingMovies.length > 0 && (
              <section className="trending">
                <h2>Filmes em Alta</h2>
                <ul>
                  {trendingMovies.map((movie, index) => (
                    <li key={movie.$id}>
                      <p className="text-transparent">{index +1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
        <section className="all-movies">
          <h2>Todos os Fimes</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
