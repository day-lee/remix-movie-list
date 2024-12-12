import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useNavigation } from "@remix-run/react";
import fetch from "node-fetch";
import sharp from "sharp";

import { getMovies } from "~/api/movies";
import fallbackImg from "../fallbackImg.png";

import { Movie } from "../types";

const basePosterUrl = "https://image.tmdb.org/t/p/";
const fallbackSize = "w185";

export const loader: LoaderFunction = async () => {
  const movies = await getMovies();

  const processedMovies = await Promise.all(
    movies.results.map(async (movie: Movie) => {
      const imageUrl = `${basePosterUrl}${fallbackSize}${movie.poster_path}`;

      const response = await fetch(imageUrl);
      const imageBuffer = await response.arrayBuffer();

      const processedImage = await sharp(imageBuffer)
        .resize(200)
        .webp()
        .toBuffer();

      const processedImageUrl = `data:image/webp;base64,${processedImage.toString(
        "base64"
      )}`;

      return {
        ...movie,
        poster_image_url: processedImageUrl,
      };
    })
  );

  return new Response(JSON.stringify(processedMovies), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};

export const meta: MetaFunction = () => [
  { title: "Remix | Movie List" },
  { name: "description", content: "Browse the collection of movies." },
];

export default function Index() {
  const data: Movie[] = useLoaderData();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {isLoading && (
        <div
          className="fixed inset-0 flex items-center justify-center px-20 py-2 text-gray-600 text-lg font-semibold h-10 text-center
         bg-gray-200 animate-pulse duration-300 z-20"
        >
          LOADING...
        </div>
      )}
      {data.map((item) => {
        const { id, title, poster_image_url } = item;
        return (
          <Link
            title={title}
            key={id}
            to={`/movies/${String(id)}`}
            prefetch="intent"
          >
            <div
              className="border-2 p-4 m-2 bg-white min-w-[200px] rounded-md hover:border-blue-400 hover:border-4 hover:scale-105"
              key={id}
            >
              <li>
                <div className="flex justify-center p-1">
                  <img
                    className="object-cover p-2 m-2"
                    src={poster_image_url || fallbackImg}
                    alt={`${title} poster`}
                    loading="lazy"
                  />
                </div>
                <div className="pt-2 h-10 overflow-hidden truncate font-semibold text-base text-center">
                  <span>{title}</span>
                </div>
              </li>
            </div>
          </Link>
        );
      })}
    </ul>
  );
}
