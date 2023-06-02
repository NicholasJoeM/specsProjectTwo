import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import MovieScreen from './MovieScreen';
import Watchlist from './components/Watchlist';

function App() {
  const [movieList, setMovieList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [page, setPage] = useState(1);

  const getData = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
      .then((res) => {
        console.log(res.data.results);
        setMovieList(res.data.results);
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  const addMovie = (movie) => {
    setWatchlist([...watchlist, movie]);
  };

  const removeMovie = (movie) => {
    const updatedWatchlist = watchlist.filter((mov) => mov !== movie);
    setWatchlist(updatedWatchlist);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <MovieScreen
          addMovie={addMovie}
          removeMovie={removeMovie}
          movieList={movieList}
          page={page}
          setPage={setPage}
          watchlist={watchlist}
        />
        <Watchlist list={watchlist} removeMovie={removeMovie} />
      </main>
    </div>
  );
}

export default App;
