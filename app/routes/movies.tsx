import { Link, Outlet } from "@remix-run/react";

export default function Movie() {
  return (
    <div>
      <header>
        <Link title="Movie List" to="/movies">
          <div className="flex justify-center pt-10 text-3xl font-semibold hover:text-blue-900">
            Remix Movie List
          </div>
        </Link>
      </header>
      <main className=" mt-10 mx-10 pb-4">
        <Outlet />
      </main>
    </div>
  );
}
