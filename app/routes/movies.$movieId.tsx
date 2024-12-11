import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getMovieById } from "~/api/movies";
import { basePosterUrl } from "./movies._index";

import { Movie } from "../types";

const fallbackSize = "w154";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.movieId, "expected params.movieId");
  const movie = await getMovieById(params.movieId);
  return new Response(JSON.stringify(movie), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};

export const meta: MetaFunction = () => [
  { title: "Remix | Movie detail" },
  { name: "description", content: "Show movie details" },
];

export default function MovieId() {
  const movie = useLoaderData<Movie>();
  const {
    id,
    title,
    overview,
    poster_path,
    release_date,
    runtime,
    homepage,
    tagline,
  } = movie;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center px-20 py-2 text-gray-600 text-lg font-semibold h-10 text-center bg-gray-200 animate-pulse duration-300 z-20">
          LOADING...
        </div>
      )}
      <div className="border-b-2 border-gray-200">
        <h1 className="text-xl font-normal pb-3" id="dialog-title">
          Movie Details
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div
          className="flex flex-col justify-center items-center py-4 px-20 border-2 border-gray-200 max-w-[880px] m-10 sm:m-20"
          key={id}
        >
          <div className="flex justify-center p-1">
            <img
              className="object-cover p-2 m-2"
              srcSet={`${basePosterUrl}w185${poster_path} 185w, ${basePosterUrl}w342${poster_path} 342w, ${basePosterUrl}w500${poster_path} 500w`}
              sizes="(max-width: 768px) 200px, (max-width: 1200px) 400px, 800px"
              src={`${basePosterUrl}${fallbackSize}${poster_path}`}
              alt={`${title} poster`}
              loading="lazy"
            />
          </div>
          <div className="text-center h-10 font-semibold sm:text-2xl w-full mb-6">
            <span>{title}</span>
          </div>
          <div className="text-left p-1 text-sm text-gray-500">
            <span>Released: {release_date}</span>
          </div>
          <div className="text-left p-1 text-sm text-gray-500">
            <span> Runtime: {runtime} mins</span>
          </div>
          {homepage && (
            <div className="text-left p-1 text-sm text-gray-500">
              <span>
                <a
                  className="hover:underline text-blue-800 font-medium"
                  href={homepage}
                  target="_blank"
                >
                  Official website
                </a>
              </span>
            </div>
          )}
          <div className="flex flex-col text-left justify-start py-10 sm:px-10 mb-2 text-base font-medium">
            {tagline && (
              <div className="text-center pb-6">
                <span className="font-bold text-2xl text-gray-400 italic pr-2">
                  "
                </span>
                <span className="py-6 text-center text-gray-600 italic text-lg pb-4">
                  {tagline}
                </span>
                <span className="font-bold text-2xl text-gray-400 italic pl-2">
                  "
                </span>
              </div>
            )}
            <span>{overview}</span>
          </div>
        </div>
      </div>
    </>
  );
}