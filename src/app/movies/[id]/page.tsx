import { prisma } from "../../../lib/server";
import { UUID, randomUUID } from "crypto";
import Header from "@/components/header";
import Image from "next/image";
import MovieCard from "@/components/Moviecard";
import Link from "next/link";

async function getData(id: number) {
  const movie = await prisma.movies.findUnique({
    where: {
      id: Number(id),
    },
  });

  return movie;
}

export default async function Page({ params }: { params: { id: number } }) {
  const data = await getData(params.id);

  if (!data) {
    return <p>Error retrieving the movie</p>;
  }
  return (
    <>
      <Header />
      <div className="h-3/5">
        <Image
          src={data.movie_background_poster}
          alt={data.name}
          width={600}
          height={600}
        />
        <div className="flex">
          <MovieCard name={data.name} movie_poster={data.movie_poster} />
          <div>
            <h1>{data.name}</h1>
            <p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#f84464"
                  className="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              {data.rating}/10
            </p>
            <div className="bg-[#333333] w-20">
              <p>Add your ratings & review</p>
              <p>Your Ratings matter</p>
              <button className="rounded bg-white text-black">Rate Now</button>
            </div>
            <div className="flex bg-white text-black">
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
          </div>
        </div>
      </div>
    </>
  );
}
