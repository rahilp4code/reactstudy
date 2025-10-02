import { useState, useEffect } from "react";

const KEY = "20b9e588";

export function useFetchMovies(query) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Network error while fetching Movies");

          const data = await res.json();
          console.log(data);
          // if (data.Response === "False") throw new Error("Movie not found");
          if (data.Response === "False") {
            setMovies([]);
            setError(data.Error || "Movie not found");
            return; // stop execution, don’t throw
          }
          setMovies(data.Search);
          setError("");
          console.log(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
            console.log(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return; // stop execution, don’t throw
      }
      //   handleCloseId();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
