import { Movie } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;
const APP_AUTH_TOKEN = import.meta.env.VITE_APP_AUTH_TOKEN;

export async function getMovies(title?: string | null) {
  const options = {
    method: "GET",
    headers: {
      accept: "applicatoin/json",
      Authorization: `Bearer ${APP_AUTH_TOKEN}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    options
  );

  if (!response.ok) {
    throw new Error("Error!");
  }
  const data = await response.json();
  const totalPages = data.total_pages;
  const totalResults = data.total_results;
  const resultsData: Movie[] = data.results.filter((movie: Movie) =>
    title ? movie.title.toLowerCase().includes(title.toLowerCase()) : true
  );
  const allData = { totalPages, totalResults, resultsData };
  return allData;
}

export async function getMovieById(movieId: string) {
  const options = {
    mehtod: "GET",
    headers: {
      accetp: "application/json",
      Authorization: `Bearer ${APP_AUTH_TOKEN}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );

  if (!response.ok) {
    throw new Error("No such movie");
  }

  const data = await response.json();
  return data;
}
