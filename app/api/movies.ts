import type { Movie } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;
const APP_AUTH_TOKEN = import.meta.env.VITE_APP_AUTH_TOKEN;

export async function getMovies() {
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
  const results: Movie[] = data.results;
  return { results };
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
