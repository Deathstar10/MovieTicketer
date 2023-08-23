import { prisma } from "../../../../lib/server";
import MovieCard from "@/components/Moviecard";
import Link from "next/link";
import { Suspense } from "react";
async function getData(id: number) {
  const movie = await prisma.movies.findUnique({
    where: {
      id: Number(id),
    },
  });

  return movie;
}

export default async function Page({
  params,
}: {
  params: { id: number; location: string };
}) {
  const data = await getData(params.id);

  if (!data) {
    return <p>Error retrieving the movie</p>;
  }

  return (
    <>
      <div
        className="h-screen w-full"
        // TODO - Adjust the height of the background image
        style={{
          backgroundImage: `linear-gradient(90deg, #1A1A1A 24.97%, #1A1A1A 38.3%, rgba(26, 26, 26, 0.0409746) 97.47%, #1A1A1A 100%), url(${data.movie_background_poster})`,
          // backgroundRepeat: "no-repeat",
          objectFit: "cover",
        }}
      >
        <Suspense>
          <div className="flex relative left-4 top-4 gap-6">
            <MovieCard name={data.name} movie_poster={data.movie_poster} />
            <div>
              <h1 className="text-white text-4xl font-bold mb-2">
                {data.name}
              </h1>
              <p className="flex mb-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#f84464"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </p>
              <div className="bg-[#333333] flex justify-between px-2 py-2 mb-2">
                <div>
                  <p className="text-white text-sm">
                    Add your ratings & review
                  </p>
                  <p className="text-white ">Your Ratings matter</p>
                </div>

                <button className="rounded-md bg-white text-black px-2 py-1">
                  Rate Now
                </button>
              </div>
              <div className="flex bg-white text-black gap-1 mb-2">
                <Link href="/">2D</Link>
                <Link href="/">3D</Link>
                <Link href="/">4D</Link>
                <Link href="/">MX4D</Link>
                <Link href="/">Screen X</Link>
                <Link href="/">MX4D 3D</Link>
                <Link href="/">ICE 3D</Link>
                <Link href="/">4DX</Link>
                <Link href="/">4DX 3D</Link>
                <Link href="/">IMAX 2D</Link>
                <Link href="/">IMAX 3D</Link>
              </div>
              <div className="mb-2">
                <p className="text-white">
                  {data.movie_length + " minutes "} Action, Adventure,
                  Crime,Thriller . UA . 18 th May, 2023
                </p>
              </div>
              <Link
                href={`/${params.location}/movies/${params.id}/booking`}
                className="mb-2"
              >
                <button className="bg-[#f84464] text-white rounded-md px-10 py-2">
                  Book Tickets
                </button>
              </Link>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
}
