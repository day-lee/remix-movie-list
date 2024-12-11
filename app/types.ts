export interface Movie {
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  runtime: number;
  homepage: string;
  tagline: string;
}

export type Data = {
  results: Array<Movie>;
};
