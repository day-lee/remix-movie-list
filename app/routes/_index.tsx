import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigation } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Movie List App" },
    { name: "description", content: "Welcome to Remix Movie App!" },
  ];
};

export default function Index() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <Link to="/movies">
            <div className="leading text-2xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-900">
              Click here to browse Remix Movie List!
              <span className="sr-only">Browse Remix movie list</span>
            </div>
          </Link>
          {isLoading && (
            <div
              className="w-full px-20 py-2 text-gray-600 text-lg font-semibold h-10 text-center
             bg-gray-200 animate-pulse duration-300"
            >
              LOADING...
            </div>
          )}
        </header>
      </div>
    </div>
  );
}
