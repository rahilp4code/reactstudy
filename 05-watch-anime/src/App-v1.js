import { useEffect, useState } from "react";
import StarRating from "./StarRating";
// i=tt3896198&

const KEY = "20b9e588";

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseId() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleWatchedRemove(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
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
      handleCloseId();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  //useEffects makes the code run after the component instance is rendered
  //dependency array can be used to tell the effect to also run after a component re-renders

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={(e) => setQuery(e.target.value)} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {error && <Error message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} setId={handleSelectedId} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              closeId={handleCloseId}
              addWatch={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                removeWatched={handleWatchedRemove}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
function Error({ message }) {
  return (
    <p className="error">
      <span>💥</span>
      {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>AniLabz</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={setQuery}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/

function MovieList({ movies, setId }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} setId={setId} />
      ))}
    </ul>
  );
}

function Movie({ movie, setId }) {
  return (
    <li onClick={() => setId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, closeId, addWatch, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [rating, setRating] = useState("");
  const isWatchedID = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: Number(rating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    addWatch(newMovie);
    closeId();
  }
  useEffect(
    function () {
      async function watchList() {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        if (!res.ok) throw new Error("Network error while fetching Movies");

        const data = await res.json();
        console.log(data);
        setMovie(data);
        setLoading(false);
      }
      watchList();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "AniLabz";
      };
    },
    [title]
  );
  useEffect(
    function () {
      function callBack(e) {
        if (e.code === "Escape") {
          closeId();
          console.log("Escaped");
        }
      }
      document.addEventListener("keydown", callBack);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [closeId]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={closeId}>
              &larr;
            </button>
            <img
              style={{ borderRadius: "5px" }}
              src={poster}
              alt={`Poster of ${title}`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}&bull;{runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatchedID ? (
                <>
                  <StarRating onSetRating={setRating} size="40" />
                  {rating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You have rated this movie {watchedRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Actors: {actors}</p>
            <p>Director by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  // const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  // const avgUserRating = average(watched.map((movie) => movie.userRating));
  // const avgRuntime = average(watched.map((movie) => movie.runtime));

  //     <div>
  //       <p>
  //         <span>#️⃣</span>
  //         <span>{watched.length} movies</span>
  //       </p>
  //       <p>
  //         <span>⭐️</span>
  //         <span>{avgImdbRating}</span>
  //       </p>
  //       <p>
  //         <span>🌟</span>
  //         <span>{avgUserRating}</span>
  //       </p>
  //       <p>
  //         <span>⏳</span>
  //         <span>{avgRuntime} min</span>
  //       </p>
  //     </div>
  return (
    <div className="summary">
      <h2>watched List</h2>
    </div>
  );
}

function WatchedMoviesList({ watched, removeWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          removeWatched={removeWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, removeWatched }) {
  console.log(movie.imdbID);
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        {movie.runtime ? (
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        ) : (
          ""
        )}
        <button
          className="btn-delete"
          onClick={() => removeWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

//prop drilling: passing prop from parent to child  where there are more levels
//component composition
//using composition, making reusable component using composition
//passing elements as props
//started building star-rating
