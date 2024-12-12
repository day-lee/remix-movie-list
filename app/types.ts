export interface Movie {
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  runtime: number;
  homepage: string;
  tagline: string;
  poster_image_url: string;
}

export type Data = {
  results: Array<Movie>;
};
